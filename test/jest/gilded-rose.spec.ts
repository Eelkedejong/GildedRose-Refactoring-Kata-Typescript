import { Item } from "@/models/Item";
import { GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should maintain the name of the item", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should not decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item("normal", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should decrease quality and sellIn for normal items", () => {
    const gildedRose = new GildedRose([new Item("normal", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[0].sellIn).toBe(9);
  });

  it("should increase quality of 'Aged Brie'", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("should increase quality of 'Backstage passes' by 2 for 10 days, 3 for 5 days before sell date", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
    expect(items[1].quality).toBe(23);
  });

  it("should not change quality or sellIn for 'Sulfuras'", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it("should decrease quality by 2 for 'Conjured' items", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  });
});
