import { Item } from "@/models/Item";
import { MAX_QUALITY } from "@/constants";

export function increaseQuality(item: Item, amount = 1) {
  item.quality = Math.min(item.quality + amount, MAX_QUALITY);
}
