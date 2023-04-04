interface HoleData {
  imgSrcURL: string;
  holeNumber: number;
  imgPixelsPerYard: number;
  widthYards: number;
  heightYards: number;
  par: number;
  teeLocations: {
    [name: string]: Coords;
  };
  pinLocations: Coords[];
}
