# hoyrypesuri.fi – suunnitelma

Siirretty keskustelusta ”Uudet ideat saitteihin” (2026-10-04). Sivustoa ei ole vielä rakennettu.

## Taustaa
- Domain **hoyrypesuri.fi** ostettu 2026-10-04. Yksikkömuoto valittiin, koska ”höyrypesuri” saa 5 300 hakua ja ”höyrypesurit” vain 80. Ääkköset puuttuvat, mutta Google rinnastaa ö:n ja o:n, ja brändi kirjoitetaan sivuilla muodossa Höyrypesuri.fi. höyrypesuri.fi:n omistaa Yellow Service Oy (vuodesta 2005, ei sivua). **hoyrypesurit.fi** oli vapaana ohjaukseksi.
- Sisarsivusto **tekstiilipesuri.com** (`~/Projects/tekstiilipesuri`). Sivustot ovat erillisiä EMD-sivustoja yhteisellä koodipohjalla (painepesurit.fi:n pohja). hoyrypesuri.fi:n etusivu linkittää tekstiilipesuri.comin vertailusivulle, ja se linkittää takaisin. Käyttäjät sekoittavat tuotetyypit, mutta Google näyttää hauille eri URLit, ja Ahrefsin Parent keywordit ovat erilliset.
- Rakennetaan `semantic-content-network`-skillin mukaan, ja tekstit kirjoitetaan `microsemantic-writer`- ja `finnish-humanizer`-skilleillä. Mitään ei keksitä.
- Ahrefs-data: https://docs.google.com/spreadsheets/d/1xpF1KUAiwyBSNvJiGO7uPAW6hxgu7_wkuCkIZn6Yc00/ (höyrypesurin välilehdet gid=1 ja gid=992037549). CSV-export: `.../export?format=csv&gid=<gid>`.

## Havainnot datasta
- Noin 14 000 hakua kuukaudessa (300 hakusanaa). ”höyrypesuri” saa 5 300 hakua (KD 0, Traffic potential 4 000) ja ”kärcher höyrypesuri” 1 800 + ”höyrypesuri kärcher” 500. Ahrefsin mukaan kasvu on lievästi laskeva.
- **Kärcher:** noin 3 390 hakua. Mallihaut SC 1–SC 5 (EasyFix, Deluxe), SV 7 (imevä) ja SG 4/4 (ammatti) saavat noin 80–200 hakua kukin, joten mallit kannattaa aluksi käsitellä osioina Kärcher-hubissa eikä omina sivuinaan.
- **Imevä höyrypesuri ja höyryimuri:** noin 650 hakua yhteensä (höyryimuri 300, imevä 200, paras imevä höyrypuhdistin 90, SV 7, kokemuksia).
- **Kuivahöyrypesuri** 200, **höyrypuhdistin** 250, **kylpyhuone** 150, **laminaatti/parketti/höyrymoppi** pieniä.
- **Vuokraus:** noin 1 400 hakua (”höyrypesuri vuokraus” 600, Helsinki, Tampere, Oulu, Turku).
- **Sekaannus tekstiilipesuriin:** ”tekstiili höyrypesuri” 250, ”höyrypesuri sohva” 100, ”höyrypesuri sohvalle” 90 ja jopa ”kärcher höyrypesuri se 6.100” (SE on tekstiilipesuri). Google kysyy hauissa: ”Mikä on tekstiilipesurin ja höyrypesurin ero?” ja ”Voiko höyrypesurilla pestä maton?”. Nämä jätetään tekstiilipesuri.comille, jonka sivu `/tekstiilipesuri-vai-hoyrypesuri/` vastaa niihin. Omaa siltasivua ei tehdä (Villen päätös 2026-10-12), vaan etusivun yläosan ohjaus linkittää tekstiilipesuri.comiin.
- Muut merkit: Emax 100, Ryobi 60, Nilfisk 30, Lumira, Vileda, H2O. Kauppahakuja (Tokmanni, Biltema, Prisma, Puuilo, Lidl, Clas Ohlson) ei tavoitella.
- KD lähes kaikkialla 0. Poikkeukset: ”höyrypesuri laminaatti” 26 ja ”paras höyrymoppi” 32. Taulukossa ”höyrypesuri kärcher” sai KD:n 52, mutta Villen Ahrefs-tarkistuksessa (2026-10-12) arvo on 0.

## Google.fi (2026-10-04)
- **”höyrypesuri”:** Kärcher.com, Prisma, Clas Ohlson, Motonet, Verkkokauppa.com, Netrauta, parasverkossa.fi/paras-hoyrypesuri/ (vain Kärcher-mallit) ja Hobbyhall. Mainoksia näytti kaksi (Rennoa ja Clas Ohlson).
- **”paras höyrypesuri”:** Gigantin testivoittajat, Staypro, parasverkossa.fi, Techweise (oma merkki kärjessä), tyovaline.fi, Hintaopas, Kärkkäisen video ja YouTube. Höyrypesureihin keskittynyttä sivustoa ei ole.

## SCN-hahmotelma
| Sivu | Tyyppi | Intentti | Hakusanat |
|---|---|---|---|
| `/` Höyrypesuri – vertailu ja ostajan opas | Pilari | Decision | höyrypesuri 5 300, höyrypuhdistin 250, paras 150, höyrypesurit 80 |
| `/karcher-hoyrypesurit/` (SC 1–5 osioina) | Pilari (merkki) | Comparison | kärcher höyrypesuri 1 800 + 500 ja mallihaut |
| `/imeva-hoyrypesuri/` | Tuki | Mechanism | noin 650 |
| `/kuivahoyrypesuri/` | Tuki | Definition | 200 |
| `/hoyrypesuri-vuokraus-vai-osto/` | Tuki | Decision | noin 1 400 |
| Käyttökohteet: kylpyhuone, laminaatti/parketti ja höyrymoppi | Tuki | Use Case | 40–210 kukin |
| `/hoyrypesuri-ammattikayttoon/` | Tuki | Decision | 90, SG 4/4 |
| `/karcher-hoyrypesuri-varaosat/` | Tuki | Outcome | 150 |

Etusivun yläosaan ohjaus: ”Haluatko pestä sohvan tai maton? Tarvitset tekstiilipesurin.” Etusivu omistaa myös paras-haun, joten erillistä paras-sivua ei tehdä.

## Kumppanifeedit (2026-10-04)
Höyrypesuririvejä (osuma otsikossa tai kategoriassa, sisältää lisävarusteita ja duplikaatteja): Proshop 83, CS Megastore 63, Multitronic 32, Staypro 14, Kärcher 12, Hobbybox 9, Uittokalusto 0. Virtasenkauppa jäi laskematta. Feedien tunnukset ja URL ovat tiedostossa `~/Projects/painepesurit/scripts/hae_affiliate.py`.

## Avoimet tehtävät
1. ✅ Feedien siivous tehty 2026-10-05, katso `FEEDIT.md`: 98 laitetta, joista 89 on varastossa. Kärcher-linkitys päätetty 2026-10-12: Kärcherin feedistä puuttuvista malleista mukaan otetaan vain SC 1 EasyFix, SC 2 EasyFix ja SC 3 EasyFix, jotka linkitetään karcher.comiin. Muut mallit ovat affiliate-malleja.
2. **Adtraction:** oma kanava hoyrypesuri.fi:lle ja sille kumppanuudet (Kärcher, eStore, Proshop, CS Megastore, Multitronic). Kärcherin tuotteille järjestys on Kärcherin oma ohjelma, sitten eStore (Villen päätös 2026-10-22). `scripts/hae_affiliate.py` on vielä painepesurit.fi:n kopio (kanava, Nilfisk-versiot, kohdetiedosto puuttuu), ja se sovitetaan, kun kanava on olemassa.
3. ✅ Writer-skilli `hoyrypesuri-writer` ja alustava CLAUDE.md tehty 2026-10-12. Auki: Vercel-projekti ja CLAUDE.md:n Rakenne- ja Data-osiot rakentamisen alussa. GitHub-repo `Wibah/Hoyrypesuri` (yksityinen) luotu 2026-10-12, päähaara `main`.
4. Valinnaisesti hoyrypesurit.fi:n rekisteröinti ohjaukseksi.
5. Rakennetaan tekstiilipesuri.comin jälkeen, koska sen volyymi on noin kolminkertainen.
