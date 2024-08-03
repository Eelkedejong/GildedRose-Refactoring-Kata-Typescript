import { Item } from "@/models/Item";
import { SELLIN_DECREASE } from "@/constants";

export function decreaseSellIn(item: Item) {
  item.sellIn -= SELLIN_DECREASE;
}
