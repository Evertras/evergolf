export enum Terrain {
  Bounds = 'Bounds',
  Rough = 'Rough',
  Trees = 'Trees',
  BigTree = 'Big_Trees',
  Fairway = 'Fairway',
  Bunker = 'Bunkers',
  Green = 'Green',
  Hole = 'Hole',

  OutOfBounds = 'OutOfBounds',
}

export const terrainSVGID = '__terrain__';

function getSVGParent(element: HTMLElement): SVGSVGElement | null {
  let parent = element.parentElement;

  while (parent) {
    if (parent.tagName === 'svg') {
      return parent as unknown as SVGSVGElement;
    }
  }

  return null;
}

function pointInTerrain(terrainType: Terrain, point: DOMPoint): boolean {
  const rawElement = document.getElementById(terrainType);

  if (!rawElement) {
    return false;
  }

  // TODO: Not needed if we use DOMPoint, but needed later... so
  // figure out which we are more efficiently...
  const svg = getSVGParent(rawElement);
  if (!svg) {
    console.error('Missing SVG element for terrain');
    return false;
  }
  const svgPoint = svg.createSVGPoint();
  svgPoint.x = point.x;
  svgPoint.y = point.y;

  const svgGroup = rawElement as unknown as SVGGElement;
  const children = svgGroup.children;

  if (!children) {
    return false;
  }

  for (let i = 0; i < children.length; i++) {
    const child = children.item(i) as SVGGeometryElement;

    if (!child) {
      continue;
    }

    try {
      // TODO: Only fail this once and switch to othermode for optimization
      if (child.isPointInFill(point)) {
        return true;
      }
    } catch {
      if (child.isPointInFill(svgPoint)) {
        return true;
      }
    }
  }

  return false;
}

export function isTerrainHittableFrom(terrain: Terrain): boolean {
  return terrain !== Terrain.OutOfBounds;
}

// TODO: This is brittle but works for now...
export function terrainAtPoint(
  coords: Coords,
  imgYardsPerPixel: number = 1
): Terrain {
  const point = new DOMPoint(
    coords.xYards / imgYardsPerPixel,
    coords.yYards / imgYardsPerPixel
  );

  if (pointInTerrain(Terrain.Green, point)) {
    return Terrain.Green;
  }

  if (pointInTerrain(Terrain.Trees, point)) {
    return Terrain.Trees;
  }

  if (pointInTerrain(Terrain.BigTree, point)) {
    return Terrain.BigTree;
  }

  if (pointInTerrain(Terrain.Bunker, point)) {
    return Terrain.Bunker;
  }

  if (pointInTerrain(Terrain.Fairway, point)) {
    return Terrain.Fairway;
  }

  if (pointInTerrain(Terrain.Bounds, point)) {
    return Terrain.Rough;
  }

  return Terrain.OutOfBounds;
}
