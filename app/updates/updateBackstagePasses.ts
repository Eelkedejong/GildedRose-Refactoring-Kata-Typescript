import { Item } from "@/models/Item";
import { increaseQuality, decreaseSellIn } from "@/utils";

export function updateBackstagePasses(item: Item) {
  let amount = 1;

  if (item.sellIn < 11) {
    amount = 2;
  }

  if (item.sellIn < 6) {
    amount = 3;
  }

  increaseQuality(item, amount);
  decreaseSellIn(item);

  if (item.sellIn < 0) {
    item.quality = 0;
  }
}
