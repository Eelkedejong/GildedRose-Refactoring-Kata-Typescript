export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const SELLIN_DECREASE = 1;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  increaseQuality(item: Item, amount = 1) {
    item.quality = Math.min(item.quality + amount, MAX_QUALITY);
  }

  decreaseQuality(item: Item, amount = 1) {
    item.quality = Math.max(item.quality - amount, MIN_QUALITY);
  }

  decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - SELLIN_DECREASE;
  }

  updateBrie(item: Item) {
    this.decreaseSellIn(item);

    item.sellIn < 0
      ? this.increaseQuality(item, 2)
      : this.increaseQuality(item);
  }

  updateBackstagePasses(item: Item) {
    this.decreaseSellIn(item);

    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateItem(item: Item) {
    this.decreaseSellIn(item);

    item.sellIn < 0
      ? this.decreaseQuality(item, 2)
      : this.decreaseQuality(item);
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case AGED_BRIE:
          this.updateBrie(item);
          break;
        case BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          break;
        case SULFURAS:
          break;
        default:
          this.updateItem(item);
          break;
      }
    }

    return this.items;
  }
}
