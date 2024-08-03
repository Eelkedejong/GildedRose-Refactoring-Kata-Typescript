import { Item } from "@/models/Item";
import {
  updateBrie,
  updateBackstagePasses,
  updateItem,
  updateConjuredItem,
} from "@/updates";
import { itemTypes } from "@/constants";

export class GildedRose {
  readonly items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    for (const item of this.items) {
      switch (true) {
        case item.name.includes(itemTypes.CONJURED):
          updateConjuredItem(item);
          break;
        case item.name === itemTypes.AGED_BRIE:
          updateBrie(item);
          break;
        case item.name === itemTypes.BACKSTAGE_PASSES:
          updateBackstagePasses(item);
          break;
        case item.name === itemTypes.SULFURAS:
          break;
        default:
          updateItem(item);
          break;
      }
    }

    return this.items;
  }
}
