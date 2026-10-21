import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Tuote = CollectionEntry<'tuotteet'>['data'] & { id: string };

// Kunkin mallisivun päätuote: versio, joka sopii parhaiten sivun "Kenelle sopii" -tekstiin. Muut saman sarjan
// versiot näytetään mallisivun vertailutaulukossa. Sivustolla esitellään vain malleja, joihin saadaan affiliate-linkki,
// sekä SC 1:n, SC 2:n ja SC 3:n perusmallit karcher.comin linkillä (Villen päätös 2026-10-12, ks. CLAUDE.md).
export const paatuotteet = {
	'SC 1': 'sc-1',
	'SC 2': 'sc-2-upright',
	// SC 3: Deluxe EasyFix (Kärcherin feed, Villen päätös 2026-10-20), koska se on SC 3 EasyFixiä halvempi ja
	// siinä on lisäksi rakoharja. Jos alennus päättyy, tarkista suositus.
	'SC 3': 'sc-3-deluxe-easyfix',
	// SC 4: Deluxe EasyFix (Kärcherin feed, 2026-10-21), koska se on alennettuna EasyFix Plussaa halvempi, tehokkaampi
	// (2250 W, 4 bar) ja säiliö on isompi. Tarkista suositus, jos alennus päättyy.
	'SC 4': 'sc-4-deluxe-easyfix',
	'SC 5': 'sc-5-easyfix',
	'SV 7': 'sv-7',
} as const;
export type Mallisarja = keyof typeof paatuotteet;

export const mallisivut: Record<Mallisarja, string> = {
	'SC 1': '/karcher-sc-1-hoyrypesuri/',
	'SC 2': '/karcher-sc-2-hoyrypesuri/',
	'SC 3': '/karcher-sc-3-hoyrypesuri/',
	'SC 4': '/karcher-sc-4-hoyrypesuri/',
	'SC 5': '/karcher-sc-5-hoyrypesuri/',
	'SV 7': '/karcher-sv-7-hoyryimuri/',
};

// Kärcherin mallit, jotka sivustolla esitellään (Villen päätös 2026-10-12, ks. CLAUDE.md): Kärcherin affiliate-feedin
// mallit (FEEDIT.md, 2026-10-05) sekä feedistä puuttuvat SC 1 (perusmalli 1.516-400, koska karcher.com ei myy SC 1
// EasyFixiä), SC 2 EasyFix (ei myynnissä 2026-10-20) ja SC 3 EasyFix karcher.comin linkillä (Villen hyväksyntä 2026-10-20).
// Muita Kärcherin malleja (esim. SC 2 Deluxe, SC 4 EasyFix, SG 4/2 ja SGV 8/5) ei näytetä korteissa eikä taulukoissa.
export const KARCHER_ESITELTAVAT = new Set([
	'sc-1',
	'sc-1-multi-up-textile-edition',
	'sc-2-easyfix',
	'sc-2-upright',
	'sc-3-easyfix',
	'sc-3-easyfix-plus',
	'sc-3-deluxe-easyfix',
	'sc-3-easyfix-go-further',
	'sc-4-easyfix-plus',
	'sc-4-deluxe-easyfix',
	'sc-5-easyfix',
	'sc-5-deluxe-signature-line',
	'sc-5-easyfix-iron-select-bath-edition',
	'sv-7',
	'scv-4',
	'sg-4-4',
]);
export const esiteltavat = (tt: Tuote[]) => tt.filter((t) => t.merkki !== 'Kärcher' || KARCHER_ESITELTAVAT.has(t.id));

// Laitetyypin nimi teksteihin ja taulukoihin (tyypit: hoyrypesuri-writerin tietopohja, kohta 3).
export const tyyppinimet: Record<string, string> = {
	sailio: 'Säiliömalli',
	kasi: 'Käsimalli',
	moppi: 'Höyrymoppi',
	'2-in-1': 'Höyrymoppi ja käsiosa',
	imeva: 'Imevä höyrypesuri',
	ammatti: 'Ammattilaite',
};

export async function merkinTuotteet(merkki: string): Promise<Tuote[]> {
	const kaikki = await getCollection('tuotteet', (t) => t.data.merkki === merkki);
	return kaikki
		.map((t) => ({ ...t.data, id: t.id }))
		.sort((a, b) => (a.hinta ?? Infinity) - (b.hinta ?? Infinity) || a.nimi.localeCompare(b.nimi, 'fi', { numeric: true }));
}

export async function tuote(id: string): Promise<Tuote> {
	const entry = await getEntry('tuotteet', id);
	if (!entry) throw new Error(`Tuotetta "${id}" ei löydy datasta. Aja npm run hae:karcher tai korjaa id.`);
	return { ...entry.data, id: entry.id };
}

export async function paatuote(sarja: Mallisarja): Promise<Tuote> {
	return tuote(paatuotteet[sarja]);
}

// Saman sarjan versiot: myynnissä olevat ensin halvimmasta alkaen.
export async function versiot(...sarjat: string[]): Promise<Tuote[]> {
	const kaikki = await getCollection('tuotteet', (t) => sarjat.includes(t.data.sarja ?? ''));
	return kaikki
		.map((t) => ({ ...t.data, id: t.id }))
		.sort(
			(a, b) =>
				Number(b.myynnissa) - Number(a.myynnissa) ||
				(a.hinta ?? Infinity) - (b.hinta ?? Infinity) ||
				a.nimi.localeCompare(b.nimi, 'fi', { numeric: true }),
		);
}

// Kärcher.comin omat hinnat: myynnissä olevat mallit ilman kumppanikauppojen hintoja. Käytä tätä aina, kun teksti
// sanoo "Kärcher.comissa".
export const karcherComissa = (tt: Tuote[]) => tt.filter((t) => t.myynnissa && t.hinta != null && !t.kumppanikauppa);

// Version nimi teksteihin: "SC 3 EasyFix *EU" → "SC 3 EasyFix".
export const versionimi = (t: Tuote) => t.nimi.replace(/\s*\*EU$/, '');

// 389 → "389 €", 311.2 → "311,20 €"
export function euroa(hinta: number): string {
	const desimaalit = Number.isInteger(hinta) ? 0 : 2;
	return new Intl.NumberFormat('fi-FI', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: desimaalit,
		maximumFractionDigits: desimaalit,
	}).format(hinta);
}

// 12.4 → "12,4"
export const luku = (n: number) => new Intl.NumberFormat('fi-FI', { maximumFractionDigits: 2 }).format(n);

// "2026-09-23" → "23.9.2026"
export const paiva = (iso: string) => new Date(iso).toLocaleDateString('fi-FI');

// Myynnissä olevien versioiden hintaväli, esim. "229 €–259 €".
export function hintavali(vv: Tuote[]): string {
	const h = vv.filter((v) => v.myynnissa && v.hinta != null).map((v) => v.hinta!);
	if (!h.length) return '–';
	const [min, max] = [Math.min(...h), Math.max(...h)];
	return min === max ? euroa(min) : `${euroa(min)}–${euroa(max)}`;
}

// Vesimäärä tekstiin: erillinen säiliö, tai kattila, jos laitteessa ei ole erillistä säiliötä (SC 1 ja SC 2).
// Säiliön voi täyttää kesken työn, kattilan vasta jäähtyneenä (hoyrypesuri-writerin tietopohja, kohta 2).
export const vesi = (t: Tuote) =>
	t.tekniset.sailioL != null ? `säiliö ${luku(t.tekniset.sailioL)} l` : t.tekniset.kattilaL != null ? `kattila ${luku(t.tekniset.kattilaL)} l` : null;

// Lämmitysaika tekstiin: alle minuutin ajat sekunteina ("30 s"), muut minuutteina ("3 min").
export const lammitysaika = (min: number | null) => (min == null ? null : min < 1 ? `${Math.round(min * 60)} s` : `${luku(min)} min`);

// Rivit, joita ei näytetä "Mukana lisäksi" -sarakkeessa: osat, jotka ovat jokaisessa sarjan versiossa.
// Lasketaan versioiden leikkauksena, jotta taulukko näyttää vain erot.
export function erotVersioissa(vv: Tuote[]): Map<string, string[]> {
	// Versiot, joiden toimitussisältöä valmistaja ei ilmoita, jätetään leikkauksesta pois.
	const tiedossa = vv.filter((v) => v.toimitusSisaltaa.length > 0);
	const kaikilla = tiedossa.length
		? tiedossa.map((v) => new Set(v.toimitusSisaltaa)).reduce((a, b) => new Set([...a].filter((x) => b.has(x))))
		: new Set<string>();
	return new Map(vv.map((v) => [v.id, v.toimitusSisaltaa.filter((r) => !kaikilla.has(r) && !/^Malliversio/.test(r))]));
}

// "Kärcher myy SC 3 -sarjaa neljänä versiona."
const ESSIIVI: Record<number, string> = { 2: 'kahtena', 3: 'kolmena', 4: 'neljänä', 5: 'viitenä', 6: 'kuutena', 7: 'seitsemänä', 8: 'kahdeksana' };
export const versioina = (n: number) => `${ESSIIVI[n] ?? n} versiona`;
