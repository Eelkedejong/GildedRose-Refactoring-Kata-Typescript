import { Item } from "@/models/Item";
import { MIN_QUALITY } from "@/constants";

export function decreaseQuality(item: Item, amount = 1) {
  item.quality = Math.max(item.quality - amount, MIN_QUALITY);
}
