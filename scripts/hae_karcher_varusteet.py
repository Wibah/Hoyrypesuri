"""Kärcherin höyrypesurien lisävarusteet ja kuluvat osat varaosasivulle (/karcher-hoyrypesuri-varaosat/).

Käyttö: python3 scripts/hae_karcher_varusteet.py   (npm run hae:varusteet)

Varusteet, hinnat, saatavuus ja tuotesivujen osoitteet luetaan Kärcherin Adtraction-feedistä (.feedit/karcher.tsv,
npm run lataa:feedit): mukaan otetaan rivit, joiden tuoteryhmässä on sana höyry, paitsi itse laitteet. Yhteensopivat
laitteet luetaan jokaisen varusteen karcher.com/fi-sivulta, osiosta Yhteensopivat laitteet → Nykyinen
tuotevalikoima. Poistuneiden tuotteiden lista jätetään pois. Kentässä sarjat ovat ne sarjat, joille sivustolla on
sivu (SARJAT).

Linkki on Kärcherin suora tuotesivu, koska hoyrypesuri.fi:llä ei vielä ole Adtraction-kanavaa.
Kirjoittaa tiedoston src/data/varusteet/karcher-sc.json. Älä muokkaa tulosta käsin.
"""

import csv
import html
import json
import pathlib
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date

JUURI = pathlib.Path(__file__).resolve().parent.parent
FEED = JUURI / '.feedit/karcher.tsv'
ULOS = JUURI / 'src/data/varusteet/karcher-sc.json'

# Sarjat, joille sivustolla on malli- tai vertailusivu. Pidempi etuliite ensin (SCV ennen SC).
SARJAT = ['SCV 4', 'SC 1', 'SC 2', 'SC 3', 'SC 4', 'SC 5', 'SV 7', 'SG 4/4']
LAITERYHMAT = ('Höyrypuhdistimet', 'Höyryimurit')
MALLIN_ALKU = re.compile(r'^(SC|SCV|SV|SG|SGV|SI|SB)\s?\d')


def eurot(arvo):
	m = re.match(r'([\d.]+)', (arvo or '').strip())
	return float(m.group(1)) if m else None


def yhteensopivat(url):
	"""Palauttaa karcher.com-sivun Nykyinen tuotevalikoima -listan mallinimet."""
	pyynto = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
	sivu = urllib.request.urlopen(pyynto, timeout=30).read().decode('utf-8')
	sivu = re.sub(r'<script.*?</script>|<style.*?</style>', '', sivu, flags=re.S)
	rivit = [r.strip() for r in html.unescape(re.sub(r'<[^>]+>', '\n', sivu)).split('\n') if r.strip()]
	if 'Nykyinen tuotevalikoima' not in rivit:
		return []
	alku = rivit.index('Nykyinen tuotevalikoima') + 1
	mallit = []
	for r in rivit[alku:]:
		if r in ('Poistuneet tuotteet', 'Käyttökohteet', 'Verkkokauppa'):
			break
		if MALLIN_ALKU.match(r) or not mallit:
			mallit.append(r)
		else:
			mallit[-1] += ' ' + r
	# Vaahdonestoaineen listan alussa on muita laitteita (DS 6, RVF 7), jotka jätetään pois.
	return [m for m in mallit if MALLIN_ALKU.match(m)]


def sarjoiksi(mallit):
	sarjat = []
	for malli in mallit:
		for s in SARJAT:
			if (malli == s or malli.startswith(s + ' ')) and s not in sarjat:
				sarjat.append(s)
				break
	return [s for s in SARJAT if s in sarjat]


def main():
	if not FEED.exists():
		sys.exit('Kärcherin feed puuttuu: aja npm run lataa:feedit')
	csv.field_size_limit(10**9)
	haettu = date.fromtimestamp(FEED.stat().st_mtime).isoformat()
	tulos = []
	for r in csv.DictReader(open(FEED, encoding='utf-8'), delimiter='\t', quotechar="'"):
		ryhma = r['product_type'].split('>')[-1].strip()
		if 'öyry' not in r['product_type'] and ryhma not in ('Vaahdonesto', 'Kalkinpoistoaine'):
			continue
		if ryhma in LAITERYHMAT:
			continue
		url = urllib.parse.parse_qs(urllib.parse.urlparse(r['link']).query)['url'][0]
		mallit = yhteensopivat(url)
		time.sleep(0.5)
		hinta, ale = eurot(r.get('price')), eurot(r.get('sale_price'))
		tulos.append({
			'id': r['id'],
			'nimi': r['title'].removeprefix('Kärcher - ').strip(),
			'ryhma': ryhma,
			'tuotenumero': f"{r['id'][:1]}.{r['id'][1:4]}-{r['id'][4:7]}.{r['id'][7:]}",
			'mallit': mallit,
			'sarjat': sarjoiksi(mallit),
			'hinta': ale if ale and ale < hinta else hinta,
			'varastossa': r.get('availability') == 'in_stock',
			'url': url,
			'haettu': haettu,
		})
		if not mallit:
			print(f'Ei yhteensopivia laitteita: {tulos[-1]["nimi"]} ({url})', file=sys.stderr)
	ULOS.parent.mkdir(parents=True, exist_ok=True)
	ULOS.write_text(json.dumps(tulos, ensure_ascii=False, indent='\t') + '\n', encoding='utf-8')
	print(f'{len(tulos)} varustetta → {ULOS.relative_to(JUURI)}')
	for v in tulos:
		print(f"  {v['nimi'][:48]:48} {v['hinta']:>6} €  {', '.join(v['sarjat'])}")


if __name__ == '__main__':
	main()
