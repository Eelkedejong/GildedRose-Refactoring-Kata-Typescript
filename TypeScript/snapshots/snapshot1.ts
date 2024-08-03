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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateBrie(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  updateBackstagePasses(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;

      if (item.sellIn < 11 && item.quality < 50) {
        item.quality = item.quality + 1;
      }

      if (item.sellIn < 6 && item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateSulfuras(item: Item) {
    // Do nothing
  }

  updateItem(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case AGED_BRIE:
          this.updateBrie(item);
          continue;
        case BACKSTAGE_PASSES:
          this.updateBackstagePasses(item);
          continue;
        case SULFURAS:
          this.updateSulfuras(item);
          continue;
        default:
          this.updateItem(item);
          continue;
      }
    }

    return this.items;
  }
}
