import { Item } from "@/models/Item";
import { increaseQuality, decreaseSellIn } from "@/utils";

export function updateBrie(item: Item) {
  decreaseSellIn(item);
  item.sellIn < 0 ? increaseQuality(item, 2) : increaseQuality(item);
}
