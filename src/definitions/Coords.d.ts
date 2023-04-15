// Coords represents a point on the hole from the top left corner of the map.
interface Coords {
  xYards: number;
  yYards: number;
}

// CoordsPixels represents a point on the actual display.
interface CoordsPixels {
  xPixels: number;
  yPixels: number;
}
