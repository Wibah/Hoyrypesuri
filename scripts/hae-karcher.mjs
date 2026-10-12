// Hakee Kärcherin höyrypesureiden tuotetiedot ja hinnat karcher.com/fi:stä
// ja kirjoittaa ne tiedostoon src/data/tuotteet/karcher.json.
//
// Käyttö: npm run hae:karcher
//
// Kotikäyttöön tarkoitetut mallit (SC, SV ja SCV) ovat listauksessa /fi/home-garden/hoeyrypuhdistimet.html ja
// ammattilaitteet (SG ja SGV) listauksissa /fi/professional/hoeyrypuhdistimet-ja-hoeyryimurit/hoeyrypuhdistimet.html
// ja .../hoeyryimurit.html.
// Tekniset tiedot, toimituksen sisältö ja ominaisuudet luetaan tuotesivuilta, hinnat Kärcherin omasta
// hinta-API:sta (sama, jota heidän verkkokauppansa käyttää). Ajetaan uudelleen aina, kun hinnat tai
// valikoima halutaan päivittää.

import { writeFile, mkdir } from 'node:fs/promises';
import { parse } from 'node-html-parser';

const BASE = 'https://www.karcher.com';
const AMMATTI = '/fi/professional/hoeyrypuhdistimet-ja-hoeyryimurit/';
const LISTAUKSET = [
	{ url: `${BASE}/fi/home-garden/hoeyrypuhdistimet.html`, polku: '/fi/home-garden/hoeyrypuhdistimet/' },
	{ url: `${BASE}${AMMATTI}hoeyrypuhdistimet.html`, polku: `${AMMATTI}hoeyrypuhdistimet/` },
	{ url: `${BASE}${AMMATTI}hoeyryimurit.html`, polku: `${AMMATTI}hoeyryimurit/` },
];
const HINTA_API = `${BASE}/api/v3/products/salesdata/prices/`;
const ULOS = new URL('../src/data/tuotteet/karcher.json', import.meta.url);
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (hoyrypesuri.fi tuotetietohaku)' };

const OSTOPAIKKA = { nimi: 'Kärcher.com', napinTeksti: 'Katso tarjous' };

async function hae(url) {
	const res = await fetch(url, { headers: HEADERS });
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res;
}

const siivoa = (s) => s.replace(/\s+/g, ' ').trim();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

// "max. 420" → 420, "1,8" → 1.8, "220 - 240" → 220
function luku(arvo) {
	if (!arvo) return null;
	const max = arvo.match(/max\.\s*([\d,.]+)/);
	const l = max ? max[1] : arvo.match(/\d[\d,.]*/)?.[0];
	return l ? Number(l.replace(',', '.')) : null;
}

// "SC 3 EasyFix Plus" → "SC 3", "SC 2 Upright" → "SC 2", "SG 4/4" → "SG 4/4", "SGV 8/5 Classic" → "SGV 8/5".
// Sivuston mallisivut on jaettu tämän mukaan.
function sarja(nimi) {
	const m = nimi.match(/\b(SGV|SCV|SG|SC|SV)\s?(\d+(?:\/\d+)?)/i);
	return m ? `${m[1].toUpperCase()} ${m[2]}` : null;
}

// Laitetyyppi mallin nimestä (Kärcherin oma luokittelu, ks. hoyrypesuri-writerin tietopohja):
// Upright = höyrymoppi, Multi & Up = moppi, josta irtoaa käsiosa, SC 1 = käsimalli, SV/SCV/SGV = imevä.
function tyyppi(nimi, ammattilaite) {
	if (/\bSGV|\bSCV|\bSV\b/.test(nimi)) return 'imeva';
	if (ammattilaite) return 'ammatti';
	if (/Upright/i.test(nimi)) return 'moppi';
	if (/Multi\s*&\s*Up/i.test(nimi)) return '2-in-1';
	if (/\bSC\s?1\b/.test(nimi)) return 'kasi';
	return 'sailio';
}

// Tekniset tiedot -taulukon rivin arvo otsikon alun perusteella, koska yksiköt vaihtelevat mallista toiseen.
const arvo = (taulu, alku) => Object.entries(taulu).find(([k]) => k.startsWith(alku))?.[1] ?? null;

// Säiliö ilmoitetaan malleissa eri nimillä ja yksiköillä: "Säiliötilavuus (l)", "Säiliötilavuus (ml)",
// "Vesisäiliön kapasiteetti (l)" (SV 7) tai "Puhtaan veden säiliö (l)" (SGV 8/5).
function sailioLitroina(taulu) {
	const ml = arvo(taulu, 'Säiliötilavuus (ml)');
	if (ml) return luku(ml) / 1000;
	return luku(arvo(taulu, 'Säiliötilavuus (l)') ?? arvo(taulu, 'Vesisäiliön kapasiteetti') ?? arvo(taulu, 'Puhtaan veden säiliö'));
}

// Lämmitysaika minuutteina; SCV 4 ilmoittaa sen sekunteina.
function lammitysaikaMin(taulu) {
	const s = arvo(taulu, 'Lämmitysaika (s)');
	if (s) return luku(s) / 60;
	return luku(arvo(taulu, 'Lämmitysaika (min)'));
}

function listaOtsikonJalkeen(doc, otsikko) {
	const h = doc.querySelectorAll('h2, h3, h4').find((el) => siivoa(el.text) === otsikko);
	if (!h) return [];
	// Ensimmäinen <ul> otsikon jälkeen dokumentin järjestyksessä.
	let el = h;
	while (el) {
		let seuraava = el.nextElementSibling;
		while (seuraava) {
			const ul = seuraava.tagName === 'UL' ? seuraava : seuraava.querySelector('ul');
			if (ul) return ul.querySelectorAll('li').map((li) => siivoa(li.text)).filter(Boolean);
			seuraava = seuraava.nextElementSibling;
		}
		el = el.parentNode?.tagName ? el.parentNode : null;
	}
	return [];
}

async function tuote(id, slug, polku, hinnat) {
	const url = `${BASE}${polku}${slug}-${id}.html`;
	const doc = parse(await (await hae(url)).text());

	const ld =
		doc
			.querySelectorAll('script[type="application/ld+json"]')
			.map((s) => {
				try {
					return JSON.parse(s.text);
				} catch {
					return null;
				}
			})
			.find((x) => x?.['@type'] === 'Product') ?? {};

	const taulukko = doc.querySelector('table');
	const tekniset = Object.fromEntries(
		(taulukko?.querySelectorAll('tr') ?? [])
			.map((tr) => tr.childNodes.filter((c) => c.tagName).map((c) => siivoa(c.text)))
			.filter((r) => r.length === 2),
	);
	const hinta = hinnat[id] ?? {};
	const nimi = ld.name ?? slug;
	const ammattilaite = polku.includes('/professional/');

	return {
		id: slug,
		merkki: 'Kärcher',
		nimi,
		sarja: sarja(nimi),
		tyyppi: tyyppi(nimi, ammattilaite),
		ammattilaite,
		tuotenumero: ld.sku ?? null,
		kuvaus: ld.description ?? null,
		tekniset: {
			tehoW: luku(arvo(tekniset, 'Lämmitysteho')),
			paineBar: luku(arvo(tekniset, 'Maksimi höyrypaine') ?? arvo(tekniset, 'Höyrypaine')),
			lammitysaikaMin: lammitysaikaMin(tekniset),
			sailioL: sailioLitroina(tekniset),
			kattilaL: luku(arvo(tekniset, 'Höyrykattilan kapasiteetti')),
			pintaAlaM2: luku(arvo(tekniset, 'Työsuoritus per säiliön täyttökerta')),
			hoyryGmin: luku(arvo(tekniset, 'Höyryn ulostulomäärä')),
			lampotilaC: luku(arvo(tekniset, 'Lämmityskattilan lämpö')),
			virtajohtoM: luku(arvo(tekniset, 'Virtajohdon pituus')),
			painoKg: luku(arvo(tekniset, 'Paino (ilman')),
			mitatMm: arvo(tekniset, 'Mitat'),
		},
		teknisetValmistajalta: tekniset,
		toimitusSisaltaa: listaOtsikonJalkeen(doc, 'Toimitus sisältää'),
		ominaisuudet: listaOtsikonJalkeen(doc, 'Ominaisuuksia'),
		hinta: hinta.price ?? null,
		hintaEnnenAlennusta: hinta.recommendedPrice ?? hinta.oldPrice ?? null,
		myynnissa: hinta.price != null,
		ostopaikka: { ...OSTOPAIKKA, url },
		// Kuvan osoite talteen, mutta kuvaa ei käytetä sivustolla ilman lupaa (ks. CLAUDE.md).
		valmistajanKuva: Array.isArray(ld.image) ? ld.image[0] : (ld.image ?? null),
		lahde: url,
		haettu: new Date().toISOString().slice(0, 10),
	};
}

// Tuotelinkit ovat listaussivujen upotetussa JSONissa kenoviiva-escapattuina.
const tuotteet = new Map();
for (const { url, polku } of LISTAUKSET) {
	const html = (await (await hae(url)).text()).replace(/\\\//g, '/');
	for (const m of html.matchAll(new RegExp(`${escape(polku)}([a-z0-9-]+)-(\\d{8})\\.html`, 'g'))) {
		tuotteet.set(m[2], { slug: m[1], polku });
	}
}
if (tuotteet.size === 0) throw new Error('Listaussivuilta ei löytynyt tuotteita. Onko sivun rakenne muuttunut?');

const hinnat = await (await hae(`${HINTA_API}?partnumbers=${[...tuotteet.keys()].join(',')}&isocode=fi-FI`)).json();

const tulos = [];
for (const [id, { slug, polku }] of tuotteet) {
	try {
		tulos.push(await tuote(id, slug, polku, hinnat));
	} catch (e) {
		console.error(`Virhe: ${slug} (${id}): ${e.message}`);
	}
}
tulos.sort((a, b) => a.nimi.localeCompare(b.nimi, 'fi', { numeric: true }));

await mkdir(new URL('.', ULOS), { recursive: true });
await writeFile(ULOS, JSON.stringify(tulos, null, '\t') + '\n');

console.log(`${tulos.length}/${tuotteet.size} tuotetta → src/data/tuotteet/karcher.json`);
for (const t of tulos) {
	const puuttuu = Object.entries(t.tekniset)
		.filter(([, v]) => v == null)
		.map(([k]) => k);
	console.log(
		`${t.nimi.padEnd(44)} ${(t.sarja ?? '-').padEnd(9)} ${t.tyyppi.padEnd(8)} ${t.hinta != null ? `${t.hinta} €`.padStart(10) : 'ei myynnissä'.padStart(10)}` +
			(puuttuu.length ? `  puuttuu: ${puuttuu.join(', ')}` : ''),
	);
}
