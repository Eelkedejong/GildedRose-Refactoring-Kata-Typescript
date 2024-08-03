import { GildedRose } from "../app/gilded-rose";
import { Item } from "../app/models/Item";

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
  // Added a few extra edge cases.
  new Item("Aged Brie", 0, 50), // Aged Brie with max quality
  new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20), // Backstage passes after the concert
  new Item("Conjured Mana Cake", 0, 6), // Conjured item after sellIn
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + ", " + element.sellIn + ", " + element.quality);
  });
  console.log();
  gildedRose.updateQuality();
}
