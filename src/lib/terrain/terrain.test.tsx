import { isTerrainHittableFrom, Terrain } from '.';

test('all terrain enums are unique', () => {
  const seen: string[] = [];

  let terrainKey: keyof typeof Terrain;
  for (terrainKey in Terrain) {
    const terrain = Terrain[terrainKey];

    expect(seen).not.toContain(terrain);
    seen.push(terrain);
  }
});

test.each`
  terrain                | hittable
  ${Terrain.OutOfBounds} | ${false}
  ${Terrain.Rough}       | ${true}
  ${Terrain.Fairway}     | ${true}
  ${Terrain.Green}       | ${true}
  ${Terrain.Bunker}      | ${true}
  ${Terrain.BigTree}     | ${true}
  ${Terrain.Trees}       | ${true}
  ${Terrain.Water}       | ${false}
`('$terrain is hittable: $hittable', ({ terrain, hittable }) => {
  expect(isTerrainHittableFrom(terrain)).toEqual(hittable);
});
