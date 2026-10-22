"""Muuntaa Viledan, Poltin, Black+Deckerin, Bissellin ja Sharkin höyrylaitteiden tiedot sivuston tietomuotoon.

Käyttö: python3 scripts/muunna_merkit.py   (npm run hae:merkit; aja ensin npm run lataa:feedit)

Tekniset tiedot ovat valmistajien sivuilta selaimessa kerättyä raakadataa (sivustot estävät skriptit):
- data/vileda/vileda-<päivä>.json: vileda.de (Steam Plus ja Steam Plus XXL: teho, säiliö, johto ja paino; Pro-malleista
  vain lämpenemisaika ja höyrytasot, koska Vileda ei ilmoita muuta) ja vileda.fi (Suomen mallinimet)
- data/polti/polti-com-<päivä>.json: polti.com:n Technical Specifications; paine tuotekuvauksesta, kun taulukossa ei ole
- data/blackdecker/blackanddecker-co-uk-<päivä>.json: Britannian sivuston taulukko. Selvästi virheelliset arvot
  (esim. paino 0,0029 kg) on lueteltu kentässä 'hylatyt', eikä niitä käytetä.
- data/bissell/bissell-de-<päivä>.json: bissell.de:n Technische Produktdaten
- data/shark/sharkninja-de-<päivä>.json: sharkninja.de (EU-mallit). Ristiriitaiset arvot (paino, johto senttimetreinä,
  'Staubbehälter') on lueteltu kentässä 'hylatyt'.
- data/ev/ev-atlantis-kayttoohje-<päivä>.json: EV Internationalin käyttöohjeen (EV ATLANTIS) tekniset tiedot.
  Feedissä ei ole EAN-koodia, joten tarjous haetaan mallinimellä EV3000i (feedtarjoukset.tarjoukset).

Suomessa myytävä versio tunnistetaan EAN-koodilla (FEEDIT.md). Hinta, ostolinkki ja kuva tulevat kumppanifeedeistä
(feedtarjoukset.tarjoukset_ean): halvin varastossa oleva tarjous. Linkki on kaupan suora tuotesivu, koska
hoyrypesuri.fi:llä ei vielä ole Adtraction-kanavaa (kumppanikauppa: true, kaupan nimeä ei näytetä). Mallit, joita ei ole
missään kumppanikaupassa varastossa, jäävät tuotetiedoiksi ilman hintaa.
Kirjoittaa tiedostot src/data/tuotteet/<merkki>.json. Älä muokkaa tuloksia käsin.
"""

import json
import pathlib
import re
import statistics

from feedtarjoukset import halvin, lataa_kuva, tarjoukset, tarjoukset_ean

JUURI = pathlib.Path(__file__).resolve().parent.parent
TUOTTEET = JUURI / 'src/data/tuotteet'


def viimeisin(kansio, kuvio):
    return sorted((JUURI / 'data' / kansio).glob(kuvio))[-1]


def luku(arvo):
    m = re.search(r'(\d+(?:[,.]\d+)?)', arvo or '')
    return float(m.group(1).replace(',', '.')) if m else None


def tyhjat():
    return {k: None for k in ('tehoW', 'paineBar', 'lammitysaikaMin', 'sailioL', 'kattilaL', 'pintaAlaM2', 'hoyryGmin',
                              'lampotilaC', 'virtajohtoM', 'painoKg', 'mitatMm')}


def tuote(*, id, merkki, nimi, sarja, tyyppi, ean, tekniset, raaka, mukana, kuvaus, lahde, haettu, tarjoukset):
    # Feedeissä on virhehintoja, joten yli 2,5-kertaa mediaanin hinnat pois.
    if len(tarjoukset) > 1:
        med = statistics.median(t['hinta'] for t in tarjoukset)
        tarjoukset = [t for t in tarjoukset if t['hinta'] <= 2.5 * med]
    paras = halvin(tarjoukset)
    lataa_kuva(id, sorted(tarjoukset, key=lambda t: t is not paras))
    return {
        'id': id, 'merkki': merkki, 'nimi': nimi, 'sarja': sarja, 'tyyppi': tyyppi, 'ammattilaite': False,
        'tuotenumero': ean, 'kuvaus': kuvaus, 'tekniset': tekniset, 'teknisetValmistajalta': raaka,
        'toimitusSisaltaa': mukana, 'ominaisuudet': [],
        'hinta': paras['hinta'] if paras else None,
        'hintaEnnenAlennusta': paras['ennen'] if paras else None,
        'myynnissa': bool(paras), 'vainTuotetiedot': not paras, 'kumppanikauppa': bool(paras),
        'ostopaikka': {'nimi': paras['nimi'], 'url': paras['url'], 'napinTeksti': 'Katso tarjous'} if paras
        else {'nimi': merkki, 'url': lahde, 'napinTeksti': 'Katso tuotetiedot'},
        'valmistajanKuva': None, 'lahde': lahde, 'haettu': haettu,
    }


def paiva(polku):
    return re.search(r'(\d{4}-\d{2}-\d{2})', polku.name).group(1)


def vileda():
    polku = viimeisin('vileda', 'vileda-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    hinnat = tarjoukset_ean([r['ean'] for r in raaka])
    tulos = []
    for r in raaka:
        sp = r['spec']
        tek = tyhjat() | {
            'tehoW': luku(sp.get('Leistung (W)')), 'sailioL': luku(sp.get('Tankvolumen (l)')),
            'virtajohtoM': luku(sp.get('Kabellänge (m)')), 'painoKg': luku(sp.get('Produktgewicht (kg)')),
            'lammitysaikaMin': luku(sp.get('Aufheizzeit (s)')) / 60 if sp.get('Aufheizzeit (s)') else None,
        }
        tunnus = 'vileda-' + re.sub(r'[^a-z0-9]+', '-', r['nimi'].lower().replace('vileda ', '')).strip('-')
        tulos.append(tuote(id=tunnus, merkki='Vileda', nimi=r['nimi'].replace('Vileda ', ''), sarja='Vileda Steam',
                           tyyppi='moppi', ean=r['ean'], tekniset=tek, raaka={**sp, 'Huomio': r['huomio']},
                           mukana=r['lieferumfang'], kuvaus=r['huomio'], lahde=r['u_fi'] or r['u'],
                           haettu=paiva(polku), tarjoukset=hinnat[r['ean']]))
    return 'vileda', tulos


POLTI_TYYPPI = {'vaporetto-first': 'kasi', 'vaporetto-3-clean-blue': 'imeva'}


def polti():
    polku = viimeisin('polti', 'polti-com-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    for r in raaka:
        r['ean'] = re.search(r'EAN (\d+)', r['spec']).group(1)
        r['sku'] = re.search(r'SKU (\w+)', r['spec']).group(1)
    hinnat = tarjoukset_ean([r['ean'] for r in raaka])
    tulos = []
    for r in raaka:
        s = r['spec']
        hae = lambda kuvio: (m.group(1) if (m := re.search(kuvio, s)) else None)
        lammitys = hae(r'Heat-up time ([\d,.]+ (?:min|sec|Sec))')
        lammitysMin = (luku(lammitys) / 60 if 'sec' in lammitys.lower() else luku(lammitys)) if lammitys else None
        tyyppi = POLTI_TYYPPI.get(r['slug']) or ('2-in-1' if re.search(r'handheld|2 in 1 function', s) else 'sailio')
        vesi = hae(r'Water tank capacity ([\d,.]+ ?(?:ml|L|l))')
        sailio = (luku(vesi) / 1000 if vesi and 'ml' in vesi else luku(vesi)) if vesi else None
        tek = tyhjat() | {
            'tehoW': luku(hae(r'Max power (\d+) W')), 'paineBar': luku(r['paine']) if r['paine'] else luku(hae(r'Max Pressure ([\d,.]+) bar')),
            'lammitysaikaMin': lammitysMin, 'sailioL': sailio,
            'kattilaL': 2.0 if r['slug'] == 'vaporetto-eco-pro-3-0' else None,
            'hoyryGmin': luku(hae(r'(?:up to|Steam output) (\d+) g/min')),
            'virtajohtoM': luku(hae(r'Cable length ([\d,.]+) m')), 'painoKg': luku(hae(r'Weight ([\d,.]+) ?[Kk]g')),
            'mitatMm': None,
        }
        nimi = r['nimi'].replace('Polti ', '').replace('_', ' ')
        sarja = 'Polti Vaporetto ' + ('Smart' if 'Smart' in nimi else 'SV' if 'SV' in nimi else 'Eco Pro' if 'Eco Pro' in nimi else '3 Clean' if '3 Clean' in nimi else 'First')
        tulos.append(tuote(id='polti-' + r['slug'], merkki='Polti', nimi=nimi, sarja=sarja, tyyppi=tyyppi,
                           ean=r['ean'], tekniset=tek, raaka={'Valmistajan tiedot': s, 'Paine': r['paine'] or '', 'Huomio': r['huomio'] or '', 'Tuotekoodi': r['sku']},
                           mukana=[], kuvaus=r['huomio'], lahde=r['u'], haettu=paiva(polku), tarjoukset=hinnat[r['ean']]))
    return 'polti', tulos


BD_EAN = {'FSM13E1': '5035048665978', 'FSMH13E5': '5035048666005', 'FSMH13E10': '5035048666036',
          'FSMH1321': '5035048648223', 'BHSM166DSM': '5035048737798', 'BHSM1610DSM': '5035048737828'}
BD_TEHO = {'BHSM166DSM': 1600}  # teho sivun otsikosta ("1600W 2-in-1 steam-mop"), taulukosta puuttuu


def blackdecker():
    polku = viimeisin('blackdecker', 'blackanddecker-co-uk-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    hinnat = tarjoukset_ean(list(BD_EAN.values()))
    tulos = []
    for r in raaka:
        sp = {k: v for k, v in r['spec'].items() if k not in r['hylatyt']}
        lammitys = luku(sp.get('Preheating Time [sec]'))
        tek = tyhjat() | {
            'tehoW': luku(sp.get('Power [W]')) or BD_TEHO.get(r['sku']),
            'lammitysaikaMin': lammitys / 60 if lammitys else None,
            'painoKg': luku(sp.get('Product Weight [Kg]')),
        }
        ean = BD_EAN[r['sku']]
        tulos.append(tuote(id='black-decker-' + r['sku'].lower(), merkki='Black+Decker', nimi=r['nimi'].replace('Black+Decker ', ''),
                           sarja='Black+Decker Steam-Mop', tyyppi='moppi' if r['sku'] == 'FSM13E1' else '2-in-1', ean=ean,
                           tekniset=tek, raaka={**r['spec'], 'Käyttöaika yhdellä täytöllä (min)': r['spec'].get('Run-Time [min]', ''), 'Huomio': r['huomio']},
                           mukana=r['mukana'], kuvaus=r['huomio'], lahde=r['u'], haettu=paiva(polku), tarjoukset=hinnat[ean]))
    return 'black-decker', tulos


BISSELL_EAN = {'4268N': '0011120283150', '4266N': '0011120283136'}


def bissell():
    polku = viimeisin('bissell', 'bissell-de-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    hinnat = tarjoukset_ean(list(BISSELL_EAN.values()))
    tulos = []
    for r in raaka:
        sp = r['spec']
        lammitys = luku(sp.get('Aufheizzeit (Text)'))
        tek = tyhjat() | {
            'tehoW': luku(sp.get('Wattzahl')), 'sailioL': luku(sp.get('Wassertankkapazität')),
            'painoKg': luku(sp.get('Gewicht')), 'virtajohtoM': luku(sp.get('Kabellänge')),
            'lammitysaikaMin': lammitys / 60 if lammitys else None,
        }
        ean = BISSELL_EAN[r['sku']]
        tulos.append(tuote(id='bissell-' + re.sub(r'[^a-z0-9]+', '-', r['nimi'].lower().replace('bissell ', '')).strip('-'),
                           merkki='Bissell', nimi=r['nimi'].replace('Bissell ', ''), sarja='Bissell ' + r['nimi'].split()[1],
                           tyyppi=r['tyyppi'], ean=ean, tekniset=tek, raaka={**sp, 'Huomio': r['huomio']},
                           mukana=r['mukana'], kuvaus=r['huomio'], lahde=r['u'], haettu=paiva(polku), tarjoukset=hinnat[ean]))
    return 'bissell', tulos


def shark():
    polku = viimeisin('shark', 'sharkninja-de-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    hinnat = tarjoukset_ean([r['ean'] for r in raaka])
    tulos = []
    for r in raaka:
        sp = {k: v for k, v in r['spec'].items() if k not in r['hylatyt']}
        tek = tyhjat() | {'tehoW': luku((sp.get('Wattleistung (W)') or '').replace('.', '')), 'painoKg': luku(sp.get('Gewicht (kg)'))}
        tulos.append(tuote(id='shark-' + r['sku'].lower(), merkki='Shark', nimi=r['nimi'].replace('Shark ', ''), sarja='Shark Steam Mop',
                           tyyppi='moppi', ean=r['ean'], tekniset=tek,
                           raaka={**r['spec'], 'Käyttöaika yhdellä täytöllä (min)': r['spec'].get('Akkulaufzeit (Min.)', ''), 'Huomio': r['huomio']},
                           mukana=r['mukana'], kuvaus=r['huomio'], lahde=r['u'], haettu=paiva(polku), tarjoukset=hinnat[r['ean']]))
    return 'shark', tulos


def ev():
    polku = viimeisin('ev', 'ev-atlantis-kayttoohje-*.json')
    raaka = json.loads(polku.read_text(encoding='utf-8'))
    hinnat = tarjoukset([r['sku'] for r in raaka], 'ev international', raja=10000)
    tulos = []
    for r in raaka:
        sp = r['spec']
        tek = tyhjat() | {
            'tehoW': luku(sp['Max. boiler power']), 'paineBar': luku(sp['Maximum pressure']),
            'sailioL': luku(sp['Capacity of the refilling tank']), 'kattilaL': luku(sp['Boiler capacity']),
            'painoKg': luku(sp['Weight']), 'mitatMm': sp['Size'].removesuffix(' mm'),
            'lammitysaikaMin': 5,  # "about 3-5 minutes", pidempi arvo
            # Höyryn lämpötila (150–170 °C) on spec-kentässä; lampotilaC on kattilan lämpötila, jota ohje ei ilmoita.
        }
        tulos.append(tuote(id='ev-atlantis-ev3000i', merkki='EV International', nimi='Atlantis EV3000i', sarja='EV Atlantis',
                           tyyppi='ammatti', ean=r['sku'], tekniset=tek, raaka={**sp, 'Lähde': r['lahde'], 'Huomio': r['huomio']},
                           mukana=r['mukana'], kuvaus=r['huomio'], lahde=r['u'], haettu=paiva(polku), tarjoukset=hinnat[r['sku']])
                     | {'ammattilaite': True})
    return 'ev-international', tulos


for tiedosto, tulos in (vileda(), polti(), blackdecker(), bissell(), shark(), ev()):
    tulos.sort(key=lambda t: t['nimi'])
    (TUOTTEET / f'{tiedosto}.json').write_text(json.dumps(tulos, ensure_ascii=False, indent='\t') + '\n', encoding='utf-8')
    print(f'{tiedosto}: {len(tulos)} mallia')
    for t in tulos:
        print(f"  {t['nimi']:42} {t['tyyppi']:7} {t['hinta'] if t['hinta'] is not None else '–':>8} {t['ostopaikka']['nimi']}")
