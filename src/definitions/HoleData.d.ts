interface HoleData {
  imgSrcURL: string;
  imgPixelsPerYard: number;
  widthYards: number;
  heightYards: number;
  teeLocations: {
    [name: string]: Coords;
  };
  pinLocations: Coords[];
}
