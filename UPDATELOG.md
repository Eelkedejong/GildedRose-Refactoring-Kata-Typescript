# Update log Gilded Rose Kata

Tijdens het uitvoeren van de refactor heb ik in dit log bijgehouden welke stappen ik heb ondernomen en hoe lang elke stap ongeveer geduurd heeft.

**Aanpak:**

- Eerst de functionele requirements duidelijk krijgen.
- Daarna zorgen voor goed werkende tests op basis van de requirements.
- Vervolgens door middel van de refactor zorgen dat het maken van aanpassingen aan de code makkelijk is.
- Ten slotte de aanpassingen maken.

## Voorbereiden: ~ 30 min

- Gilded Rose Requirements document goed doorgenomen. Op basis hiervan de functionele requirements uitgeschreven zodat de gewenste business logica duidelijk is (zie overzicht hieronder)
- Bestaande tests bekeken en gerunt (ik heb de Jest-tests gebruikt)
  - Output bekijken (en de eerste error er uit halen)
  - Test watchers aangezet zodat tijdens het refactoren constante controle is of de code correct werkt.
  - Regelmatig de TextTest gerunt voor handmatig controle van de output.

**Items**

- **SellIn** - Number of days we have to sell the **item**
  - Is a **Number**
  - Decreases by 1 every day
- **Quality** - How valuable the **item** is
  - **Number** between 0 and 50
  - Is never negative
  - Decreases by 1 every day by default, decreases by 2 after SellIn is below zero.
- **Name** - Name of the item
  - Is a **String**
  - Specific strings have special rules
    - **Aged Brie**
      - Increases in quality instead of decreases per day
    - **Sulfuras**
      - Never has to be sold or decreases in quality
      - Has fixed quality of 80
    - **Backstage passes**
      - Increases in quality as the **SellIn** value approaches
      - **Quality** increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      - **Quality** drops to 0 after the concert

## Eerste refactor + tests: ~ 1 uur

**Stappen:**
De eerste codeaanpassingen zijn aan de tests. Op basis van de requirements zijn de tests iets aangepast zodat de juiste requirements worden getest:

- Een aantal extra scenario's uit de requirements zijn aan de gilded-rose.spec.ts test toegevoegd.
- Een aantal extra edge cases zijn aan de thirty days update approval test toegevoegd. Mogelijk is dit niet direct nodig, maar het helpt potentieel errors in deze edge cases direct te zien tijdens de refactor.

Na een kleine update aan de tests was het tijd om de huidige logica te bekijken voor de `updateQuality()`

- Als eerste gekeken naar de types in de items class en deze goed gezet.
- De volgende stap was het ontleden van de updateQuality()-functie
  - Eerst aanpassingen gemaakt om de code iets leesbaarder te maken
    - `this.items[i]` aangepast naar `item`
    - `for (let i = 0; i < this.items.length; i++)` aangepast naar `for (const item of this.items)`
  - Er is aparte logica gebouwd voor
    - Iitems
    - Items genaamd Aged brie
    - Items genaamd Sulfuras
    - Items genaamd Backstage passes

Voor elk verschillende soort item waar aparte logica voor geldt heb ik aparte update functies gemaakt. Vanuit de originele updateQuality is alleen de logica overgehouden die relevant is voor het specifieke item.

`Snapshot2.ts` in de snapshot folder toont de staat van de `gilded-rose.ts` na de eerste stap in de refactor.

- UpdateQuality is vervangen met een switch statement op basis van de item name.
- Op basis van de item names worden relevante updatefuncties aangeroepen.
- De logica zelf is verder niet aangepast.

## Tweede refactor: ~ 1 uur

Nu de logica voor elk item los van elkaar staat was het tijd om naar de logica te kijken voor de quality en sellin waardes. Het doel hier was om te kijken of er overeenkomsten zitten tussen aanpassingen van de quality en sellin van de verschillende items die eenvoudiger kunnen worden geschreven, en vooral herbruikbaar kunnen worden gemaakt.

Kijkend naar de logica kunnen de volgende aanpassingen worden gemaakt aan de quality en Sellin waardes:

- Quality kan omhoog en omlaag, met een variabel aantal per item.
- SellIn kan alleen omlaag, met altijd een vast aantal per item (altijd 1)

Voor alle bovengenoemde aanpassingsmogelijkheden zijn functies aangemaakt.

Sulfuras is het enige item met een kwaliteit van boven de 50, echter veranderd de kwaliteit van dit item nooit, dus in de increaseQuality functie heb ik de 50 als bovengrens aangehouden.

Voor maintainability heb ik de waardes die gebruikt worden in de functies in consts gezet.

`Snapshot2.ts` in de snapshot folder toont de staat van de `gilded-rose.ts` na tweede stap in de refactor.

## Derde refactor: ~ 1 uur

Nu komt het punt om alle functionaliteiten los te halen van de gilded-rose.ts. Alle functies zijn in aparte files gezet en gegroepeerd in folders. Het is misschien wat overdreven om voor alle utility en update functies losse files te hebben, aangezien sommige vrij klein zijn. Echter, met het oog op mogelijke uitbreiding en scalability van de code, heb ik een dergelijke structuur aangehouden:

/models

- Hier staan alle data models in gedefiniëerd, in dit geval allen het item.

/constants

- Een folder waar alle constants is zijn gedefinieerd zodat deze los van alle business logica staan.

/utils

- Makkelijk herbruikbare utility classes.

/updates

- Alle update functies voor de verschillende items.

Zo bevat de `gilded-rose.ts` file alleen nog maar de switch voor verschillende items.

## Toevoegen conjured item ~ 15 min

Nu is de code op een niveau dat het toevoegen van de conjured item simpel is

- Een extra const is toegevoegd aan de constants genaamd “Conjured”
- Een extra update functie is toegevoegd met de juiste business logica voor conjured items (_items degrade in `Quality` twice as fast as normal items)_
- Deze const is hierna toegevoegd in de switch van de `gilded-rose.ts`
  - De uitleg rondom de conjured items is wat minimaal in het requirements-bestand. De requirements hebben het over meerdere “conjured” items. De test bevat alleen een “Conjured Mana Cake”. Ervan uitgaande dat er meerdere soorten conjured items zijn, heb ik er een check van gemaakt die kijkt of de itemnaam “Conjured” bevat. Zo worden alle items die “Conjured” zijn afgevangen. Deze oplossing is zeker niet 100% effectief, maar leek me hier een wenselijkere oplossing dan alleen op “Conjured Mana Cake” te controleren als het gaat om de conjured items.
- De tests zijn aangepast zodat de conjured items correct worden genomen in de tests.

## Documentatie uitschrijven en aanpassingen pushen ~ 15 min

Na ongeveer 4 uur bezig te zijn geweest heb ik alleen nog deze updatelog iets verder uitgeschreven en alles naar github gepushed.
