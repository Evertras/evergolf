import { Terrain } from '.';

test('all terrain enums are unique', () => {
  const seen: string[] = [];

  let terrainKey: keyof typeof Terrain;
  for (terrainKey in Terrain) {
    const terrain = Terrain[terrainKey];

    expect(seen).not.toContain(terrain);
    seen.push(terrain);
  }
});

export {};
