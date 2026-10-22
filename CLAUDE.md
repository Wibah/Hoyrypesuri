# Höyrypesuri.fi

Suomenkielinen affiliate-sivusto, joka vertailee Suomessa myytäviä höyrypesureita, höyrypuhdistimia ja höyrymoppeja. Kärcher on pääpainopiste, mutta sivusto on monimerkkinen vertailusivusto, ei Kärcherin mikrosivusto (Villen päätös 2026-10-12). Omistaja on Ville Hinkkanen. Sisarsivusto on tekstiilipesuri.com (`~/Projects/tekstiilipesuri`).

**Tila 2026-10-22:** SCN:n vaiheet 1–3 on rakennettu (25 sivua). Sivustoa ei julkaista ennen kuin se on kokonaan valmis (Villen ohje 2026-10-12), joten `JULKAISTU = false` tiedostossa `src/layouts/Layout.astro` (noindex), eikä Vercel-projektia tai domainia kytketä. Ennen julkaisua puuttuvat Adtraction-kanava ja kumppanuudet sekä Vercel ja domain. Suunnitelma on tiedostoissa `SUUNNITELMA.md` (tausta ja avoimet tehtävät), `SCN.md` (sivut, linkit ja riskit) ja `FEEDIT.md` (kumppanifeedien laitteet).

## Tekniikka ja julkaisu

- **GitHub:** `Wibah/Hoyrypesuri` (yksityinen), päähaara `main` (luotu 2026-10-12).
- **Koodipohja:** kopioitu tekstiilipesuri.comista, joka on painepesurit.fi:n (`~/Projects/painepesurit`) pohjan uudempi kopio: Astro 7, Tailwind 4 ja `src/styles/site.css`, tuotekomponentit ja affiliate-middleware. Kun korjaat jotain pohjasta perittyä, tarkista ensin tekstiilipesuri.comin ratkaisu. `scripts/hae_affiliate.py` ja `scripts/yhteiset.mjs` ovat vielä painepesurit.fi:n kopioita, ja ne sovitetaan, kun hoyrypesuri.fi:n Adtraction-kanava on olemassa.
- **Kanoninen domain on `https://hoyrypesuri.fi`** (ostettu 2026-10-04, ilman ääkkösiä; brändi kirjoitetaan sivuilla muodossa Höyrypesuri.fi). höyrypesuri.fi kuuluu Yellow Service Oy:lle. hoyrypesurit.fi oli vapaana, ja sen voi rekisteröidä ohjaukseksi.
- **Vercel:** projektia ei ole vielä. Kun se tehdään, jokainen push `main`-haaraan julkaisee sivuston, joten aja `npm run build` ennen pushia.
- **Dev-palvelin:** `.claude/launch.json` → `hoyrypesuri-dev`, portti 4341 (painepesurit.fi 4321, tekstiilipesuri.com 4331). Node 22 (nvm: `~/.nvm/versions/node/v22.23.2`).

## Rakenne

- **Layout ja yhteiset komponentit:** `src/layouts/Layout.astro` (title, description, `JULKAISTU`-kytkin ja noindex), `src/components/Header.astro` (valikot Kärcher, Laitetyypit, Merkit ja Oppaat), `Footer.astro` (luottamussivut), `Ukk.astro` (näkyvä UKK ja FAQPage-JSON-LD samasta taulukosta), `Murupolku.astro` (BreadcrumbList) ja `Kokemuslomake.astro` (Formspree; `mallikentta` merkkisivuille, joilla käyttäjä kertoo oman mallinsa).
- **Tuotekomponentit** (`src/components/tuote/`): TuoteHero (sivun H1, avainluvut ja ostolaatikko; vain sivun alkuun), Ostolaatikko, TuoteKuva, TeknisetTiedot, TuoteSchema, VersioVertailu (mallisivujen versiot), MallistoTaulu, Merkkikortit, Korttirivi (kaikki tuotekortit), Tuotekortti, ToplistaRivi (etusivun toplista) ja VuokraTaulu (`vuokrahinnat.json`).
- **Kirjasto** `src/lib/tuotteet.ts`: mallisivujen päätuotteet (`paatuotteet`) ja polut (`mallisivut`), `KARCHER_ESITELTAVAT` ja `esiteltavat()`, `tyyppinimet`, tuotehaut (`tuote`, `paatuote`, `merkinTuotteet`, `versiot`) ja muotoilijat (`euroa`, `luku`, `paiva`, `hintavali`, `lammitysaika`, `vesi`). `euroa()` kaataa buildin, jos hinta puuttuu, joten myynnistä poistuneen tuotteen hinta on aina tarkistettava ehdolla `myynnissa`.
- **Data:** content collection `tuotteet` (`src/content.config.ts`) yhdistää merkkitiedostot `src/data/tuotteet/*.json` ja affiliate-tiedot (`src/data/affiliate.json`, kun kanava on olemassa). Varaosasivun data on `src/data/varusteet/karcher-sc.json`.
- **Middleware** `src/middleware.ts`: lisää hoyrypesuri.fi:n Adtraction-linkkeihin EPI-tunnisteen ja affiliate-ilmoituksen vain sivuille, joilla on affiliate-linkkejä. Kanavan tunnus puuttuu vielä (`KANAVA`).
- **Sivut** (`src/pages/`, SCN-kartta `SCN.md`:ssä):
  - pilari `index.astro`
  - Kärcher: hub `karcher-hoyrypesurit`, mallisivut `karcher-sc-1` … `karcher-sc-5-hoyrypesuri` ja `karcher-sv-7-hoyryimuri`, `karcher-hoyrypesuri-varaosat`, `karcher-hoyrypesurin-kaytto-ja-huolto`
  - laitetyypit: `hoyrymoppi`, `imeva-hoyrypesuri`, `kuivahoyrypesuri`, `hoyrypesuri-ammattikayttoon`
  - merkit: `vileda-hoyrymoppi`, `polti-hoyrypesurit`, `black-decker-hoyrypesurit`, `hoyrypesurimerkit`
  - oppaat: `hoyrypesuri-kylpyhuoneeseen`, `hoyrymoppi-laminaatille`, `hoyrypesuri-vuokraus-vai-osto`
  - luottamussivut: `nain-vertailemme`, `tietoa-meista`, `ota-yhteytta`, `tietosuojaseloste`
- **Sivun alkukommentti:** jokaisen sivun frontmatterin kommentissa ovat SCN-tyyppi, intentti, emopilari, hakusanat volyymeineen, lähteet ja kirjoituspäivä. Päivitä kommentti, kun muutat sivua.
- **SCN-tarkistus:** `npm run scn:linkit` (`scripts/linkkikartta.py`) kokoaa buildatusta sivustosta `SCN.md`:n linkkikartan ja ilmoittaa rikkinäiset linkit, orposivut ja puuttuvat linkit emopilariin. Aja `npm run build` ensin.

## Data

- **Kärcher:** `npm run hae:karcher` (`scripts/hae-karcher.mjs`) lukee karcher.com/fi:n listaukset `/fi/home-garden/hoeyrypuhdistimet.html` sekä ammattipuolen höyrypuhdistimet ja höyryimurit, tuotesivujen teknisten tietojen taulukon ja hinta-API:n → `src/data/tuotteet/karcher.json` (23 tuotetta 2026-10-12). Kentät `sarja` (SC 1 … SGV 8/5) ja `tyyppi` (sailio, kasi, moppi, 2-in-1, imeva, ammatti) päätellään mallin nimestä. Kaikki valmistajan taulukon rivit ovat kentässä `teknisetValmistajalta`.
- **EV International (kuivahöyry):** `data/ev/ev-atlantis-kayttoohje-<päivä>.json` (valmistajan käyttöohjeen tekniset tiedot) muunnetaan `npm run hae:merkit` → `src/data/tuotteet/ev-international.json`. Feedissä ei ole EAN-koodia, joten Virtasen kaupan tarjous haetaan mallinimellä EV3000i.
- **Kärcherin varusteet:** `npm run hae:varusteet` (`scripts/hae_karcher_varusteet.py`) lukee Kärcherin feedin höyrypesurien lisävarusteet ja jokaisen varustesivun Yhteensopivat laitteet -listan (vain nykyiset mallit) → `src/data/varusteet/karcher-sc.json` (31 varustetta 2026-10-22). Käytössä sivulla `/karcher-hoyrypesuri-varaosat/`.
- **Tuotekuvat:** `npm run hae:kuvat` (`scripts/hae_kuvat.py`) lataa kuvat Kärcherin, CS Megastoren ja Multitronicin feedeistä tuotenumerolla kansioon `src/assets/tuotteet/`.
- **Muut merkit:** `npm run hae:merkit` (`scripts/muunna_merkit.py`) muuntaa valmistajien sivuilta selaimessa kerätyn raakadatan (`data/vileda`, `data/polti`, `data/blackdecker`, `data/bissell`, `data/shark`, `data/ev`) tiedostoiksi `src/data/tuotteet/<merkki>.json`. Suomessa myytävä versio tunnistetaan EAN-koodilla, ja hinta, linkki ja kuva tulevat halvimmasta varastossa olevasta kumppanifeedin tarjouksesta (`scripts/feedtarjoukset.py`). Virheelliset valmistajan arvot luetellaan raakadatan kentässä `hylatyt`. Merkkitiedostot luetellaan `MERKKITIEDOSTOT`-listassa tiedostossa `src/content.config.ts`.
- **Feedit:** `npm run lataa:feedit` (`scripts/lataa_feedit.py`) lataa kumppanifeedit kansioon `.feedit/` (ei versionhallinnassa).
- **Vuokrahinnat:** `src/data/vuokrahinnat.json` päivitetään käsin vuokraamoiden sivuilta (kenttä `tarkistettu`).
- **Hakusanat:** Ahrefs-taulukot ovat kansiossa `data/ahrefs/`.
- **Mallisivujen päätuotteet ja polut:** `src/lib/tuotteet.ts` (`paatuotteet`, `mallisivut`).

## Affiliate

- **Hoyrypesuri.fi:llä ei vielä ole Adtraction-kanavaa.** Tekstiilipesuri.comin linjan mukaan affiliate-ohjelmiin haetaan, kun sivusto on rakennettu ja julkaistu. Kanava ja kumppanuudet (Kärcher, Proshop, CS Megastore ja Multitronic) on kirjattu avoimeksi tehtäväksi `SUUNNITELMA.md`:hen.
- **Älä käytä painepesurit.fi:n (2113484494) tai ikkunanpesurobotti.fi:n (2083764081) kanavaa sivuston linkeissä.** Feedien kartoitus 2026-10-05 tehtiin näillä kanavilla, ja se kelpaa vain kartoitukseen.
- **Kärcherin linkitys (Villen päätös 2026-10-12):** Kärcherin tuotteet linkitetään Kärcherin omaan ohjelmaan (12 %). Kärcherin feedistä puuttuvista malleista sivustolla esitellään vain kolme eniten haettua, **SC 1, SC 2 EasyFix ja SC 3 EasyFix**, ja ne linkitetään suoraan karcher.comiin ilman provisiota. SC 1 on perusmalli 1.516-400, koska karcher.com ei myy SC 1 EasyFixiä, ja SC 2 EasyFix ei ollut 2026-10-20 myynnissä karcher.comissa, joten SC 2:n päätuote on SC 2 Upright (Villen hyväksyntä 2026-10-20). SC 2 EasyFix palasi Kärcher.comiin 2026-10-22 (149 €), mutta Upright pysyy päätuotteena (Villen päätös 2026-10-22). Muita feedistä puuttuvia Kärcher-malleja ei esitellä; lista on `KARCHER_ESITELTAVAT` tiedostossa `src/lib/tuotteet.ts`. SC 3:n suositus on Deluxe EasyFix (Villen päätös 2026-10-20).
- **Muut mallit:** sivustolla esitellään tuotekortein vain malleja, joihin saadaan affiliate-linkki (kumppanifeedissä ja varastossa).
- **Kärcherin ostopaikkajärjestys (Villen päätös 2026-10-22):** 1) Kärcherin oma ohjelma, ja jos tuote ei ole siellä (varastossa), 2) eStore (12 %). Muita kauppoja ei käytetä Kärcherin tuotteille. Jos kumpikaan ei käy, linkki vie karcher.comiin ilman provisiota. Logiikka on `scripts/hae_affiliate.py`:ssä (`KARCHER_JARJESTYS`). eStoren feedissä oli 2026-10-22 kolme Kärcherin höyrylaitetta (SC 4 Deluxe, SC 1 Upright ja SC 3 Deluxe), mutta yksikään ei ollut varastossa.
- **Painepesurit.fi:n affiliate-säännöt pätevät:**
  - yksi ostopaikka tuotetta kohden
  - hinta ja linkki samasta kaupasta
  - ostonapissa "Katso tarjous", hinnattomilla tuotteilla "Katso tuotetiedot"
  - kumppanikauppojen nimiä ei näytetä
  - `rel="sponsored nofollow"` affiliate-linkeille
  - affiliate-ilmoitus vain sivuille, joilla on affiliate-linkkejä
  - tuotekuvat ladataan feedeistä, eikä niitä hotlinkata

## Semantic content network

- **SCN on pakollinen.** Sivujen ja sisäisten linkkien muutokset tehdään `semantic-content-network`-skillin mukaan, ja `SCN.md` päivitetään.
- **Etusivu** omistaa haut "höyrypesuri", "höyrypuhdistin" ja "paras höyrypesuri", joten erillistä paras-sivua ei tehdä.
- **Kauppahaut** (Tokmanni, Biltema, Puuilo, Prisma, Lidl, Clas Ohlson, Motonet ja Jula) jätetään pois. Kaupunkikohtaisia vuokraussivuja ei tehdä.
- **Työnjako tekstiilipesuri.comin kanssa (Villen päätös 2026-10-12):**
  - Sohvan, maton ja tekstiilien pesu sekä "höyrypesuri vai tekstiilipesuri" kuuluvat tekstiilipesuri.comille. Sen julkaistu sivu `/tekstiilipesuri-vai-hoyrypesuri/` omistaa vertailuhaut.
  - Hoyrypesuri.fi ei tee vastinsivua, vaan etusivun yläosan ohjaus ("Haluatko pestä sohvan tai maton? Tarvitset tekstiilipesurin.") linkittää sinne.
  - Tekstiilipesurit, joissa on höyry (Bissell HydroSteam, Dreame N20 Steam), kuuluvat tekstiilipesuri.comille.
  - Kun hoyrypesuri.fi julkaistaan, tekstiilipesuri.comissa vaihdetaan `HOYRYPESURI_JULKAISTU = true`.
- **Mallisivuja tehdään vain Kärcherille** (SC 1–SC 5 ja SV 7). Sarjan versiot ovat samalla sivulla. SC 2 -sivulla ovat SC 2 EasyFix ja SC 2 Upright (Villen päätös 2026-10-12).
- **Merkkisivut:**
  - Kärcher-hub, Vileda, Polti ja Black+Decker saavat omat sivunsa.
  - Merkit, joille on hakuja mutta ei feedituotteita (Dolphin, Silvercrest/Lidl, H2O, Emax, Ryobi ja Philips), esitellään merkkikoosteessa `/hoyrypesurimerkit/` ilman ostolinkkiä.
  - Merkkisivut rakennetaan Dolphin-kyselyjen pohjalla: "<merkki> höyrypesuri", hinta, kokemuksia ja käyttöohje (ks. `SCN.md`).
- **Älä karsi merkkiä pelkän pienen hakuvolyymin takia,** jos sillä on useita affiliate-malleja.

## Kirjoitussäännöt

- **Tekstit kirjoitetaan `hoyrypesuri-writer`-skillillä** (`~/.claude/skills/hoyrypesuri-writer/`) ja viimeistellään `microsemantic-writer`- ja `finnish-humanizer`-skilleillä.
- **Älä keksi mitään:** ei hintoja, teknisiä tietoja, tilastoja eikä lähteitä. Tekniset tiedot tulevat valmistajalta, testiviittauksissa on nimi ja ajankohta, eikä omia kokemuksia väitetä.
- **Bakteeriväitteet** (99,9 % tai 99,99 %) kirjoitetaan vain valmistajan nimissä ja rajauksineen.
- **Vain Suomen markkinoilla myytävät mallit.** Ulkomaisista testeistä käytetään vain Suomessa myytäviä malleja koskevat havainnot, ja versio tarkistetaan. Esimerkiksi brittiläiset Kärcher SC 3 EasyFix Extra ja Deluxe Home ovat eri myyntiversioita.
- **Myynnistä poistuneiden mallien testejä ei käytetä.**
- **Kokemukset** tulevat vain kokemuslomakkeesta, ja Ville tarkistaa ne ennen julkaisua.
- **Mallisivujen title:** tuotteen nimi ja sana "kokemuksia", ja ajatusviivan jälkeen termi, jolla on hakuvolyymia (painepesurit.fi:n sääntö).

## Git

- Commit-viestit kirjoitetaan englanniksi: lyhyt otsikko ja sen alle perustelu.
