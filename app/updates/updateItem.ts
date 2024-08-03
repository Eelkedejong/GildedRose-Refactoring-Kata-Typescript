import { Item } from "@/models/Item";
import { decreaseQuality, decreaseSellIn } from "@/utils";

export function updateItem(item: Item) {
  decreaseSellIn(item);
  item.sellIn < 0 ? decreaseQuality(item, 2) : decreaseQuality(item);
}
