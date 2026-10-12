# Höyrypesuri.fi

Suomenkielinen affiliate-sivusto, joka vertailee Suomessa myytäviä höyrypesureita, höyrypuhdistimia ja höyrymoppeja. Kärcher on pääpainopiste, mutta sivusto on monimerkkinen vertailusivusto, ei Kärcherin mikrosivusto (Villen päätös 2026-10-12). Omistaja on Ville Hinkkanen. Sisarsivusto on tekstiilipesuri.com (`~/Projects/tekstiilipesuri`).

**Tila 2026-10-12: alustava versio.** Sivustoa ei ole rakennettu. Suunnitelma on tiedostoissa `SUUNNITELMA.md` (tausta ja avoimet tehtävät), `SCN.md` (sivut, linkit ja riskit) ja `FEEDIT.md` (kumppanifeedien laitteet). Kun rakentaminen alkaa, koodipohja kopioidaan painepesurit.fi:stä, ja tämä tiedosto täydennetään tekstiilipesuri.comin `CLAUDE.md`:n mallilla. Siitä puuttuvat vielä osiot Rakenne ja Data, ja Tekniikka-osio on vain luonnos.

## Tekniikka ja julkaisu

- **GitHub:** `Wibah/Hoyrypesuri` (yksityinen), päähaara `main` (luotu 2026-10-12).
- **Koodipohja:** kopioidaan painepesurit.fi:stä (`~/Projects/painepesurit`) samaan tapaan kuin tekstiilipesuri.comiin (Astro, `src/styles/site.css`, tuotekomponentit, affiliate-middleware). Tarkista ensin tekstiilipesuri.comin ratkaisut, koska se on uudempi kopio samasta pohjasta.
- **Kanoninen domain on `https://hoyrypesuri.fi`** (ostettu 2026-10-04, ilman ääkkösiä; brändi kirjoitetaan sivuilla muodossa Höyrypesuri.fi). höyrypesuri.fi kuuluu Yellow Service Oy:lle. hoyrypesurit.fi oli vapaana, ja sen voi rekisteröidä ohjaukseksi.
- **Vercel:** projektia ei ole vielä. Kun se tehdään, jokainen push `main`-haaraan julkaisee sivuston, joten aja `npm run build` ennen pushia.
- **Dev-palvelimen portti:** valitse vapaa portti. Painepesurit.fi käyttää porttia 4321 ja tekstiilipesuri.com porttia 4331.

## Affiliate

- **Hoyrypesuri.fi:llä ei vielä ole Adtraction-kanavaa.** Tekstiilipesuri.comin linjan mukaan affiliate-ohjelmiin haetaan, kun sivusto on rakennettu ja julkaistu. Kanava ja kumppanuudet (Kärcher, Proshop, CS Megastore ja Multitronic) on kirjattu avoimeksi tehtäväksi `SUUNNITELMA.md`:hen.
- **Älä käytä painepesurit.fi:n (2113484494) tai ikkunanpesurobotti.fi:n (2083764081) kanavaa sivuston linkeissä.** Feedien kartoitus 2026-10-05 tehtiin näillä kanavilla, ja se kelpaa vain kartoitukseen.
- **Kärcherin linkitys (Villen päätös 2026-10-12):** Kärcherin tuotteet linkitetään Kärcherin omaan ohjelmaan (12 %). Kärcherin feedistä puuttuvista malleista sivustolla esitellään vain kolme eniten haettua, **SC 1 EasyFix, SC 2 EasyFix ja SC 3 EasyFix**, ja ne linkitetään suoraan karcher.comiin ilman provisiota. Muita feedistä puuttuvia Kärcher-malleja ei esitellä.
- **Muut mallit:** sivustolla esitellään tuotekortein vain malleja, joihin saadaan affiliate-linkki (kumppanifeedissä ja varastossa).
- **Avoin kysymys:** tekstiilipesuri.comissa Kärcherin ostopaikkajärjestys on 1) Kärcherin oma ohjelma, 2) eStore (12 %) ja 3) muut kaupat (Villen päätös 2026-10-05). Hoyrypesuri.fi:lle tätä ei ole päätetty. Estoren feedissä oli 2026-10-05 Kärcherin höyrylaitteita, mutta yksikään ei ollut varastossa (`FEEDIT.md`).
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
