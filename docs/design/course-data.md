# Course Data

| Field | Type       | Description                    |
| ----- | ---------- | ------------------------------ |
| name  | string     | The name of the course         |
| holes | HoleData[] | A list of holes and their data |

## Coordinates

The hole is a rectangle that starts with `0,0` in the upper left. Positive Y is
down. Units are always in yards, and fields are always explicitly marked with a
`Yards` suffix to make this clear.

The `coordYards` type is used here to mark a spot on the hole map.

| Field  | Type   | Description                                            |
| ------ | ------ | ------------------------------------------------------ |
| xYards | number | The number of yards from the left edge of the hole map |
| yYards | number | The number of yards from the top edge of the hole map  |

## Hole map data

Hole map data contains the following information.

| Field            | Type         | Description                                                                                                    |
| ---------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| imgSrcURL        | string       | The raw background image of the hole, which exactly matches the aspect ratio of `widthYards` and `heightYards` |
| imgPixelsPerYard | number       | How many pixels in the image there are per real yard                                                           |
| widthYards       | number       | The width of the hole in yards                                                                                 |
| heightYards      | number       | The height of the hole in yards                                                                                |
| par              | number       | The par for the hole                                                                                           |
| pinLocations     | coordYards[] | Potential positions for pins                                                                                   |

|
| teeLocations | `string` -> `coordYards` map | A mapping of a tee name (such as `"blue"`) with an actual location on the map |

## Image data

The image is currently stored as a PNG/JPG. In the future it might be good to
change this into stylized SVG, but for now it's just a raw image taken from
Google Earth.

## Terrain data

TBD: Basic idea is to use separate image maps to highlight different terrain
types, not sure how to parse that in JS yet. Figure out later.
