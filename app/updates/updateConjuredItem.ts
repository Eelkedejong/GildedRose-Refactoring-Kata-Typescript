import { Item } from "@/models/Item";
import { decreaseQuality, decreaseSellIn } from "@/utils";

export function updateConjuredItem(item: Item) {
  decreaseSellIn(item);
  item.sellIn < 0 ? decreaseQuality(item, 4) : decreaseQuality(item, 2);
}
