# Kumppanifeedien höyrypesurit (2026-10-05)

Kaikki kahdeksan Adtraction-feediä ladattiin painepesurit.fi:n kanavalla (2113484494). hoyrypesuri.fi:llä ei vielä ole omaa kanavaa. Rivit poimittiin otsikon, kategorian tai Kärcherin mallinimen (SC, SV, SG) perusteella. Mukaan otettiin myös rivit ilman otsikkoa: Virtasenkaupassa niitä on 236, eikä yksikään niistä ole höyrylaite. Rivit yhdistettiin EAN-koodilla, ja luokittelu tarkistettiin käsin. Raakadata on tiedostossa `data/feedit-2026-10-05.json`.

## Yhteenveto
- **98 eri laitetta** (EAN), joista 89 on varastossa vähintään yhdessä kaupassa. Lisäksi feedeissä on 54 lisävarustetta, 5 höyryä käyttävää tekstiilipesuria, 3 epäselvää riviä, 2 duplikaattia ilman EANia ja 27 aiheeseen kuulumatonta osumaa (vaatehöyrystimet, uunit, Puzzit ym.).
- **Luokat:** säiliöhöyrypesurit 28, käsihöyrypuhdistimet 15, höyrymopit 44, imevät höyrypesurit ja höyryimurit 6 sekä ammattilaitteet 5.
- **Merkit:** Kärcher 31, Black+Decker 12, Polti 12, Vileda 5, Ariete 5, Bissell 5, Adler 4, ETA 3, Shark 3 ja 16 muuta merkkiä yhdellä tai kahdella mallilla.
- **Varastossa kaupoittain:** CS Megastore 73, Proshop 33, Multitronic 24, Kärcher 13, Staypro 6, Virtasenkauppa 2, Hobbybox 1 ja Uittokalusto 0. Hobbyboxin höyrylaitteet ovat lähes kaikki loppu, ja niiden hinta on 0.
- **Kärcher:** Kärcherin omassa feedissä on 13 laitetta: SC 2 Upright, SC 1 Multi & Up Textile Edition, SC 3 Deluxe, SC 3 Go!Further, SC 3 Plus, SC 4 Deluxe, SC 4 Plus, SC 5 EasyFix, SC 5 Deluxe Signature Line, SC 5 Iron Select Bath Edition, SV 7, SCV 4 ja SG 4/4. Muita Kärcher-malleja (18) on vain muissa kaupoissa, muun muassa suosittuja perusmalleja SC 1, SC 1 EasyFix, SC 1 Upright, SC 2 EasyFix ja SC 3 EasyFix.
- **Muut merkit:** 62 mallia 67:stä on varastossa. Linkit tulevat lähinnä CS Megastoresta, Proshopista ja Multitronicista. Vaikka hakuja on vähän (Emax 100, Ryobi 60, Nilfisk 30, Lumira), näiden merkkien laitteita ei ole yhdessäkään feedissä. Vileda on mukana (5 mopia), mutta H2O:ta ei ole.
- **Kuivahöyry:** feedeissä on vain yksi kuivahöyrypesuri, EV International Atlantis EV3000i (Virtasenkauppa, 3 490 €), joka on ammattilaite. Sitä voi käyttää kuivahöyrypesurisivulla.
- **Imevät mallit:** Kärcher SV 7 ja SCV 4, Polti Vaporetto 3 Clean, Bissell Vac & Steam 4266N sekä Bissell CrossWave HydroSteam 3527N ja 3528N. Viimeiset kaksi ovat lattianpesureita, joissa on höyry, joten niitä ei kannata esitellä höyryimureina. Tineco Floor One S9 Steam Pro (CS Megastore) on samaa tyyppiä.
- **Siltasivun ehdokkaat:** Bissell SpotClean HydroSteam Pro 3700N ja Select 3697N, Revolution HydroSteam 3670N, PowerWash HydroSteam 4199N ja Dreame N20 Steam. Ne ovat tekstiilipesureita, joissa on höyry, joten ne kuuluvat tekstiilipesuri.comiin.

## Estore (lisätty 2026-10-05)
Villen antama feed (apid 1960533616, pfid 2749) on ladattu **ikkunanpesurobotti.fi:n kanavalla (2083764081)**. Kartoitukseen se kelpaa, mutta sivustolle tulevat linkit on haettava hoyrypesuri.fi:n omalla kanavalla, kun kanava ja kumppanuus ovat olemassa. Raakarivit ovat tiedostossa `data/feedit-2026-10-05-estore.json`.

- Feedissä on noin 105 000 tuotetta, ja niistä vain 3 537 on varastossa (`in_stock`). Muiden tila on `out_of_stock` tai `backorder`, joten Estore toimii pääosin tilaustuotteilla. Kuvausten rivinvaihdot ja heittomerkit rikkovat CSV-jäsennyksen (noin 16 000 osittaista riviä), joten raakateksti tarkistettiin erikseen. Yhtään höyrylaitetta ei jäänyt pois.
- **Hakuun osui 46 riviä, eikä yksikään ole varastossa:** tilattavissa (`backorder`) on 14 ja loppu (`out_of_stock`) 32, kun mukaan lasketaan rikkinäinen rivi 166849. Riveistä kaksi on Montissin mikrokuitutyynyjä (lisävaruste), ja kaksi on Northion höyryharjoja, jotka ovat vaate- ja lemmikkiharjoja.
- **Samat laitteet kuin muissa feedeissä (11):**
  - Kärcher SC 1 Upright, SC 3 Deluxe EasyFix ja SC 4 Deluxe EasyFix
  - Black+Decker BHSM15FX08, BHSM1610DSM, FSMH13E5, FSMH1321 ja FSM13E1
  - Champion CHSM210
  - Vileda Steam 3.0 ja Steam Plus XXL 3.0
  
  Estoren hinnat ovat selvästi korkeampia, esimerkiksi SC 3 Deluxe maksaa 348,90 €, kun Kärcherin feedissä hinta on 183,20 €.
- **Uudet mallit (noin 16), kaikki loppu tai tilattavissa:**
  - CWY/Northix-perusmerkki, 9 mallia useina värivariantteina:
    - säiliömallit ES10389, ES10430, ES10431, ES10500 ja ES10530
    - käsimallit ES10287, ES10340, ES10395 ja EP25619
  - Cenocco 10-in-1 -höyrymoppi (3 väriä) ja Cenocco Home -höyrypuhdistin
  - Dirt Devil 2-in-1 -höyrymoppi
  - Solac 242716 ja Steam Jet 2.0
  - InnovaGoods-käsimalli
  - Pricenet KX3788
- **Johtopäätös:** Estore ei tuo yhtään varastossa olevaa laitetta, ja sen uudet mallit ovat perusmerkkejä, joille Ahrefs-datassa ei ole hakuja (Dirt Devil -hakujen volyymi on tyhjä). Estorea ei käytetä ostopaikkana ainakaan aluksi. Se voi täydentää valikoimaa, jos sen varastotilanne paranee.

## Avoimet päätökset
1. ✅ **Kärcherin mallit, joita ei ole Kärcherin feedissä (18):** Villen päätös 2026-10-12: Kärcherin feedistä puuttuvista malleista otetaan mukaan kolme eniten haettua, **SC 1 EasyFix, SC 2 EasyFix ja SC 3 EasyFix** (sarjojen SC 1, SC 2 ja SC 3 perusmallit; SC 1 noin 250, SC 2 noin 170 ja SC 3 noin 150 hakua, ja ”sc 2 easyfix” ja ”sc 3 easyfix” saavat noin 30 hakua kumpikin). Ne linkitetään suoraan karcher.comiin ilman provisiota. Kaikki muut sivustolla esiteltävät mallit ovat sellaisia, joille saadaan affiliate-linkki. Pois jäävät mm. SC 1, SC 1 Multi, SC 1 Multi & Up, SC 1 Upright, SC 2 EasyFix Plus, SC 2 Deluxe, SC 3 Upright, SC 3 Deluxe Textile Edition, SC 4 EasyFix, SC 4 EasyFix Iron, SC 4 Deluxe Iron, SC 5 EasyFix Iron, SG 4/2 Classic ja SGV 8/5.
2. **Epäselvät rivit** jätettiin pois: Bissell Lift Off 9339E (11,90 €, todennäköisesti tarvike), Technaxx Fabric Steam Cleaner LX-069 ja Garo o529 -höyryharja (100 W). Ne tarkistetaan, jos niitä tarvitaan.
3. **Valmistajan tekniset tiedot** puuttuvat vielä. Feedissä on vain otsikko, hinta ja kuva, eivätkä esimerkiksi Icecat-pohjaiset otsikot (”Sylinterillinen höyrypuhdistin”) ole luotettavia. Esimerkiksi Kärcher SC 1 on käsimalli, vaikka CS Megastoren otsikko sanoo muuta.

### Säiliöhöyrypesurit (28)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Ariete 4145/22 (1,2 l) | 8003705124202 | CS Megastore 119,15 € | CS Megastore |
| Ariete 4146 X-Vapor Deluxe | 8003705114609 | Virtasenkauppa 139,00 € | CS Megastore, Virtasenkauppa |
| ETA Steam&Clean 7214 | 8590393366484 | CS Megastore 186,78 € | CS Megastore |
| Kärcher SC 2 Deluxe | 4054278975771 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 2 EasyFix | 4054278975122 | ei Kärcherin feedissä | CS Megastore, Multitronic, Proshop, Staypro (loppu) |
| Kärcher SC 2 EasyFix Plus | 4066529082435 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 3 Deluxe EasyFix | 4054278990316 | Kärcher 183,20 € | CS Megastore, Kärcher, Multitronic, Proshop |
| Kärcher SC 3 Deluxe Textile Edition | 4066529129338 | ei Kärcherin feedissä | Proshop (loppu) |
| Kärcher SC 3 EasyFix | 4054278975139 | ei Kärcherin feedissä | CS Megastore, Proshop, Staypro |
| Kärcher SC 3 EasyFix Go!Further | 4066529185594 | Kärcher 209,00 € | CS Megastore, Kärcher |
| Kärcher SC 3 EasyFix Plus | 4066529062901 | Kärcher 249,00 € | CS Megastore, Hobbybox (loppu), Kärcher |
| Kärcher SC 4 Deluxe EasyFix | 4054278989457 | Kärcher 287,20 € | CS Megastore, Kärcher, Multitronic, Proshop |
| Kärcher SC 4 Deluxe Iron | 4054278989471 | ei Kärcherin feedissä | Proshop (loppu) |
| Kärcher SC 4 EasyFix | 4054278991818 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 4 EasyFix Iron | 4054278991542 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 4 EasyFix Plus | 4066529063038 | Kärcher 339,00 € | CS Megastore, Kärcher, Proshop |
| Kärcher SC 5 Deluxe Signature Line | 4066529060365 | Kärcher 407,20 € | Kärcher, Proshop |
| Kärcher SC 5 EasyFix | 4054278991535 | Kärcher 449,00 € | CS Megastore, Kärcher, Proshop |
| Kärcher SC 5 EasyFix Iron | 4054278991825 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 5 EasyFix Iron Select Bath Edition | 4066529157294 | Kärcher 539,00 € | Kärcher |
| PELA 532267 | 200000075118 | Staypro 185,70 € | Staypro |
| Polti Eco Pro 3.0 | 8007411010835 | CS Megastore 342,45 € | CS Megastore |
| Polti Vaporetto Smart 100_T | 8007411011573 | CS Megastore 221,77 € | CS Megastore, Proshop (loppu) |
| Polti Vaporetto Smart 110 Eco | 8007411013683 | ei varastossa | Proshop (loppu) |
| Polti Vaporetto Smart 30_R | 8007411010910 | ei varastossa | Hobbybox (loppu) |
| Polti Vaporetto Smart 30_S | 8007411010903 | ei varastossa | Proshop (loppu) |
| Thomas Vaporo Buggy | 4005435109263 | CS Megastore 173,73 € | CS Megastore |
| Wagner Power Steamer 915E | 4004025130236 | Proshop 146,65 € | CS Megastore, Proshop |

### Käsihöyrypuhdistimet (15)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Adler AD 7038 | 5903887803588 | CS Megastore 39,66 € | CS Megastore, Hobbybox (loppu) |
| Ariete 4137 Vaporì Jet | 8003705118867 | CS Megastore 41,80 € | CS Megastore, Multitronic (loppu), Proshop (loppu) |
| Bissell Steam Shot 2635J | 11120220841 | Multitronic 68,90 € | CS Megastore, Multitronic, Proshop |
| Blow 44-750 | 5900804151180 | CS Megastore 33,08 € | CS Megastore |
| Camry CR 7021 (Proshopissa Adler) | 5908256835153 | CS Megastore 20,34 € | CS Megastore, Proshop |
| Clatronic DR 3539 | 4006160636215 | CS Megastore 57,13 € | CS Megastore |
| Clatronic DR 3653 | 4006160637854 | CS Megastore 39,85 € | CS Megastore, Proshop |
| Deerma ZQ610 | 6955578033810 | Proshop 63,96 € | Proshop |
| Esperanza Storm EHS001 | 5901299954041 | CS Megastore 20,26 € | CS Megastore, Proshop (loppu) |
| Kärcher SC 1 | 4054278975818 | ei Kärcherin feedissä | CS Megastore, Proshop |
| Kärcher SC 1 EasyFix | 4054278975733 | ei Kärcherin feedissä | CS Megastore, Multitronic, Proshop |
| Kärcher SC 1 Multi (1.516-416.0) | 4054278999210 | ei Kärcherin feedissä | CS Megastore, Multitronic, Proshop (loppu) |
| LUND T67200 | 5906083047466 | CS Megastore 25,11 € | CS Megastore |
| Polti Vaporetto First | 8007411008818 | CS Megastore 68,54 € | CS Megastore |
| ProfiCare PC-DR 3145 | 4006160045413 | CS Megastore 45,04 € | CS Megastore |

### Höyrymopit (myös 2-in-1 moppi + käsiosa) (44)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Adler AD 7052 | 5905575902696 | CS Megastore 103,17 € | CS Megastore |
| Adler AD 7057 | 5905575905710 | CS Megastore 51,38 € | CS Megastore |
| Adler AD 7068 | 5905575907011 | CS Megastore 35,19 € | CS Megastore |
| AENO SM2 | 5291485011536 | CS Megastore 107,49 € | CS Megastore |
| Ariete 4164 | 8003705114241 | CS Megastore 74,70 € | CS Megastore, Proshop (loppu) |
| Ariete 4175 | 8003705124240 | CS Megastore 74,08 € | CS Megastore |
| Bissell PowerFresh SlimSteam 4268N | 11120283150 | Multitronic 169,90 € | Multitronic |
| Black+Decker BHSM15FX08 | 5035048790243 | Multitronic 132,90 € | Multitronic |
| Black+Decker BHSM1610DSM | 5035048737828 | CS Megastore 163,56 € | CS Megastore, Multitronic, Proshop, Staypro |
| Black+Decker BHSM1615DSG + SteaMitt | 5035048738870 | CS Megastore 156,60 € | CS Megastore |
| Black+Decker BHSM166DSM | 5035048737798 | Staypro 165,00 € | CS Megastore, Staypro |
| Black+Decker BHSM168DSM | 5035048737804 | ei varastossa | Staypro (loppu) |
| Black+Decker FSM13E1 | 5035048665978 | Multitronic 39,90 € | CS Megastore, Multitronic, Staypro |
| Black+Decker FSM1616 | 5035048642344 | CS Megastore 86,41 € | CS Megastore, Proshop (loppu) |
| Black+Decker FSMH1321 (Gen 3.5) | 5035048648223 | Multitronic 104,90 € | CS Megastore, Multitronic, Staypro |
| Black+Decker FSMH1321-QS 7-in-1 | 5035048657683 | Multitronic 138,90 € | Multitronic |
| Black+Decker FSMH1351SM 9-in-1 | 5035048648186 | Multitronic 116,90 € | CS Megastore, Multitronic |
| Black+Decker FSMH13E10 | 5035048666036 | Multitronic 55,90 € | CS Megastore, Multitronic, Staypro (loppu) |
| Black+Decker FSMH13E5 5-in-1 | 5035048666005 | Multitronic 60,90 € | Multitronic, Staypro (loppu) |
| Champion CHSM210 | 7391091856694 | Multitronic 58,90 € | Hobbybox, Multitronic |
| Concept CP2000 (2-in-1) | 6975472771182 | CS Megastore 246,86 € | CS Megastore |
| Dreame Mira 10 | 6979181922644 | CS Megastore 145,33 € | CS Megastore |
| ETA Azurit 2267 | 8590393303694 | CS Megastore 109,15 € | CS Megastore |
| ETA Vapuro 2261 (2-in-1) | 8590393435357 | CS Megastore 113,38 € | CS Megastore |
| Kärcher SC 1 Multi & Up | 4054278999159 | ei Kärcherin feedissä | CS Megastore, Hobbybox (loppu), Proshop |
| Kärcher SC 1 Multi & Up Textile Edition | 4066529155832 | Kärcher 111,20 € | Kärcher |
| Kärcher SC 1 Upright | 4054278995427 | ei Kärcherin feedissä | CS Megastore, Multitronic, Proshop |
| Kärcher SC 2 Upright | 4054278990279 | Kärcher 119,00 € | CS Megastore, Kärcher, Proshop |
| Kärcher SC 3 Upright | 4054278974774 | ei Kärcherin feedissä | Hobbybox (loppu), Multitronic, Proshop |
| LUND höyrymoppi 67220 | 5906083047480 | CS Megastore 51,42 € | CS Megastore |
| Polti Vaporetto SV440 Double | 8007411011443 | CS Megastore 127,62 € | CS Megastore, Proshop |
| Polti Vaporetto SV450 Double | 8007411011856 | CS Megastore 140,55 € | CS Megastore |
| Polti Vaporetto SV460 Double | 8007411012600 | CS Megastore 140,70 € | CS Megastore |
| Polti Vaporetto SV610 Style | 8007411013225 | Proshop 180,50 € | CS Megastore, Proshop |
| Polti Vaporetto SV660 Style | 8007411013256 | ei varastossa | Proshop (loppu) |
| Severin SC 7145 | 4008146040924 | Multitronic 124,90 € | Multitronic |
| Shark S1000 | 622356231107 | Proshop 104,97 € | Proshop |
| Shark S6001 Klik n Flip | 622356220736 | CS Megastore 96,22 € | CS Megastore, Multitronic, Proshop |
| Shark S6003 | 622356220743 | Proshop 167,33 € | Proshop |
| Vileda Steam 3.0 | 4023103229716 | CS Megastore 65,25 € | CS Megastore, Hobbybox (loppu), Multitronic, Proshop |
| Vileda Steam Plus (168934) | 4023103229747 | CS Megastore 92,56 € | CS Megastore |
| Vileda Steam Plus Pro | 4023103263833 | CS Megastore 107,60 € | CS Megastore |
| Vileda Steam Plus XXL 3.0 | 4023103229754 | Proshop 73,79 € | CS Megastore, Multitronic, Proshop |
| Vileda Steam Plus XXL Pro | 4023103263819 | CS Megastore 119,88 € | CS Megastore |

### Imevät höyrypesurit ja höyryimurit (6)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Bissell CrossWave HydroSteam Pet Pro 3528N | 11120273328 | Multitronic 597,90 € | CS Megastore, Multitronic |
| Bissell CrossWave HydroSteam Pet Select 3527N | 111202733112 | CS Megastore 460,25 € | CS Megastore |
| Bissell Vac & Steam 4266N | 11120283136 | Multitronic 234,90 € | CS Megastore, Multitronic |
| Kärcher SCV 4 | 4066529002716 | Kärcher 335,20 € | Kärcher |
| Kärcher SV 7 | 4054278974767 | Kärcher 749,00 € | CS Megastore, Kärcher, Proshop, Staypro (loppu) |
| Polti Vaporetto 3 Clean | 8007411012716 | CS Megastore 299,44 € | CS Megastore |

### Ammattikäyttö (5)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| EV International Atlantis EV3000i (kuivahöyry) | – | Virtasenkauppa 3 490,00 € | Virtasenkauppa |
| Kärcher SG 4/2 Classic | 4054278880419 | ei Kärcherin feedissä | CS Megastore, Proshop (loppu), Staypro (loppu) |
| Kärcher SG 4/4 | 4039784943117 | Kärcher 1 496,96 € | CS Megastore, Kärcher, Proshop, Staypro (loppu) |
| Kärcher SGV 8/5 | 4039784846463 | ei Kärcherin feedissä | Proshop (loppu), Staypro (loppu) |
| Kärcher SGV 8/5 Classic | 4066529041210 | ei Kärcherin feedissä | Staypro (loppu) |

### Höyryä käyttävät tekstiilipesurit (siltasivu tekstiilipesuri.comiin) (5)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Bissell PowerWash HydroSteam 4199N | 11120281897 | CS Megastore 505,21 € | CS Megastore |
| Bissell Revolution HydroSteam 3670N | 11120271454 | CS Megastore 456,75 € | CS Megastore, Multitronic |
| Bissell SpotClean HydroSteam Pro 3700N | 11120272130 | CS Megastore 241,85 € | CS Megastore, Multitronic |
| Bissell SpotClean HydroSteam Select 3697N | 11120272123 | Proshop 247,46 € | CS Megastore, Multitronic, Proshop, Staypro |
| Dreame N20 Steam | 6978515257278 | CS Megastore 310,99 € | CS Megastore |

### Epäselvät (ei oteta mukaan ilman tarkistusta) (3)

| Malli | EAN | Varastossa (halvin) | Kaikki kaupat |
|---|---|---|---|
| Bissell Lift Off 9339E (11,90 €, todennäköisesti tarvike) | 11120169492 | Multitronic 11,90 € | Multitronic |
| Garo o529 höyryharja 100 W | 5904806163523 | CS Megastore 41,83 € | CS Megastore |
| Technaxx Fabric Steam Cleaner LX-069 | 4260101730213 | CS Megastore 227,22 € | CS Megastore |
