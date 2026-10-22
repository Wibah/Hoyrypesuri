import { defineCollection } from 'astro:content';
import { readFile, readdir } from 'node:fs/promises';
import { z } from 'astro/zod';

// Jokaisen merkin data on omassa tiedostossaan, jonka oma hakuskripti tuottaa.
// karcher.json: npm run hae:karcher (karcher.com/fi, SC-, SV- ja SCV-mallit sekä SG- ja SGV-ammattilaitteet).
// vileda.json, polti.json, black-decker.json, bissell.json ja shark.json: npm run hae:merkit (scripts/muunna_merkit.py:
// valmistajien sivuilta selaimessa kerätty raakadata kansiossa data/, hinnat ja kuvat kumppanifeedeistä EAN-koodilla).
const MERKKITIEDOSTOT = ['karcher', 'vileda', 'polti', 'black-decker', 'bissell', 'shark', 'ev-international'];

// Affiliate-tiedot (hinta, ostolinkki ja kuva kumppanikaupasta) tulevat erillisestä tiedostosta, jonka
// tuottaa `npm run hae:affiliate` (scripts/hae_affiliate.py). Ne yhdistetään tässä tuotteisiin, jotta
// merkkiskriptien ajo ei pyyhi niitä. Tuote saa affiliate-ostopaikan vain, jos se on kaupassa varastossa.
// Hoyrypesuri.fi:llä ei vielä ole Adtraction-kanavaa (haetaan, kun sivusto on valmis), joten
// tiedostossa on toistaiseksi vain feedeistä ladatut kuvat.
async function affiliate(): Promise<{ tuotteet: Record<string, any>; haettu: string }> {
	try {
		return JSON.parse(await readFile('src/data/affiliate.json', 'utf8'));
	} catch {
		return { tuotteet: {}, haettu: '' };
	}
}
// Kärcherin tuotteet linkitetään vain Kärcherin omaan ohjelmaan (12 %, ks. CLAUDE.md). Ostopaikan valitsee
// hae_affiliate.py, joten tässä yhdistetään sellaisenaan.
const yhdista = (t: any, a: any, haettu: string) =>
	a?.ostopaikka
		? {
				...t,
				ostopaikka: a.ostopaikka,
				hinta: a.hinta,
				hintaEnnenAlennusta: a.hintaEnnenAlennusta,
				myynnissa: true,
				vainTuotetiedot: false,
				affiliate: true,
				kuva: a.kuva ?? null,
				haettu,
			}
		: { ...t, kuva: a?.kuva ?? null };

// Tuotteiden perustiedot valmistajien sivuilta. Älä muokkaa JSON-tiedostoja käsin, koska seuraava
// hakuskriptin ajo ylikirjoittaa ne.
const tuotteet = defineCollection({
	loader: async () => {
		const osat = await Promise.all(
			MERKKITIEDOSTOT.map(async (m) => JSON.parse(await readFile(`src/data/tuotteet/${m}.json`, 'utf8'))),
		);
		const a = await affiliate();
		// Käsin lisätyt tuotekuvat: tiedosto src/assets/tuotteet/<tuotteen id>.<pääte>.
		// Feedin kuva menee edelle, jos tuotteella on sellainen.
		const kuvat = await readdir('src/assets/tuotteet').catch(() => [] as string[]);
		const omaKuva = (id: string) => kuvat.find((k) => k.slice(0, k.lastIndexOf('.')) === id) ?? null;
		return osat
			.flat()
			.map((t) => yhdista(t, a.tuotteet[t.id], a.haettu))
			.map((t) => ({ ...t, kuva: t.kuva ?? omaKuva(t.id) }));
	},
	schema: z.object({
		merkki: z.string(),
		nimi: z.string(),
		// Mallisarja, jonka mukaan mallisivut on jaettu: "SC 3", "SV 7", "SG 4/4".
		sarja: z.string().nullable(),
		// Laitetyyppi: säiliömalli, käsimalli, höyrymoppi, 2-in-1 (moppi, josta irtoaa käsiosa), imevä tai ammattilaite.
		tyyppi: z.enum(['sailio', 'kasi', 'moppi', '2-in-1', 'imeva', 'ammatti']),
		ammattilaite: z.boolean().default(false),
		tuotenumero: z.string().nullable(),
		kuvaus: z.string().nullable(),
		tekniset: z.object({
			tehoW: z.number().nullable(), // lämmitysteho
			paineBar: z.number().nullable(), // maksimi höyrypaine
			lammitysaikaMin: z.number().nullable(),
			sailioL: z.number().nullable(), // vesisäiliö
			kattilaL: z.number().nullable(), // höyrykattila (SC 1, SC 4, SC 5 ja SG)
			pintaAlaM2: z.number().nullable(), // työsuoritus yhdellä säiliön täytöllä
			hoyryGmin: z.number().nullable(), // höyryn määrä
			lampotilaC: z.number().nullable(), // kattilan lämpötila (ammattilaitteet)
			virtajohtoM: z.number().nullable(),
			painoKg: z.number().nullable(),
			mitatMm: z.string().nullable(),
		}),
		teknisetValmistajalta: z.record(z.string(), z.string()),
		toimitusSisaltaa: z.array(z.string()),
		ominaisuudet: z.array(z.string()),
		hinta: z.number().nullable(),
		hintaEnnenAlennusta: z.number().nullable(),
		myynnissa: z.boolean(),
		// true = hintaa ei seurata (affiliate-kauppaa ei vielä tiedetä); nappi vie tuotetietoihin.
		vainTuotetiedot: z.boolean().default(false),
		ostopaikka: z.object({
			nimi: z.string(),
			url: z.string().url(),
			napinTeksti: z.string(),
		}),
		valmistajanKuva: z.string().url().nullable(),
		// Affiliate-kauppa (true) vai valmistajan sivu (false). Vaikuttaa linkin rel-attribuuttiin.
		affiliate: z.boolean().default(false),
		// Ostopaikka on kumppanikauppa ilman affiliate-linkkiä (ennen kuin sivustolla on Adtraction-kanava).
		// Kaupan nimeä ei näytetä, kuten affiliate-kaupoillakaan.
		kumppanikauppa: z.boolean().default(false),
		// Kuvatiedoston nimi kansiossa src/assets/tuotteet/ (Adtraction-feedistä), null = paikkamerkki.
		kuva: z.string().nullable().default(null),
		lahde: z.string().url(),
		haettu: z.string(),
	}),
});

export const collections = { tuotteet };
