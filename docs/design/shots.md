# Shots

Describes how shots are made in more detail.

## Clubs

For now, clubs aren't actually a thing. Instead, a '9 iron shot' is added to
emulate a 9 iron. This lets us add arbitrary shots like a '5 iron punch' with
useful attributes and not have to track potential clubs. This may change in the
future.

## Potential outcomes

Every shot has a set of potential outcomes, each with a percentage chance of
happening. Every outcome has a dispersion - no shot is perfect. However, many
golfers (including myself) have discrete 'misses'. My misses are either a
strong duck hook, or a straight push right. Sometimes it just goes way right.
Sometimes it's just a total duff and it dribbles 30 yards down the fairway.
These are exceptional outcomes that must be tracked separately.

### As Intended

Every shot can go as intended, with a variable dispersion. Dispersion will
generally go a little long left and a little short right for a right hander, and
opposite for a left hander.

### Other

Other outcomes can be added to each shot. As long as all possible outcomes
(including As Intended) add up to 100%, it's fine.

## Shot results

For now, outcomes are completely discrete. In the future, it might be
interesting to blend them together further to simulate thin/fat shots rather
than duff-or-nothing.

For now, outcome chances are unaffected by anything else. In the future, it
might be interesting to adjust percentage chances based on proximity to
water/hazards, OB, etc. "Don't hook it into the water" == hooks it into the
water...

Similarly, fatigue isn't a thing for now. This may be interesting in the future.

### Roll

Balls will roll. For now, roll is calculated off some known real world values
as estimations. It's likely useful to add usual roll as a parameter for shots,
and maybe in the future do something more interesting with spin.

Balls roll regularly on the fairway, a little faster on greens, and slower in
rough.

## Terrain

For now, the only terrain types that are supported are:

| Terrain         | Description                                            |
| --------------- | ------------------------------------------------------ |
| Fairway         | The fairway, no modifiers to shots or roll             |
| Rough           | Adds significant distance dispersion, % roll reduction |
| Green           | Only putting allowed                                   |
| OB              | Penalty and reset                                      |
| Hazard (red)    | Penalty and retry, or drop along entry                 |
| Hazard (yellow) | Penalty and retry, or drop in designated zone          |
| Woods           | Chance to lose ball, chance to ricochet if not punched |

For now, slope is unused. In the future this should be added, but it will get
very complicated very quickly in terms of course data.

In the future, it would be interesting to add a bit of a minigame to the woods
to provide the opportunity to hero shot (and likely fail) or punch out safely
depending on some random assortment of trees.

## Chipping

Chipping is a special kind of shot, usable to some maximum distance (TBD).

Chipping uses the Rule of 12 to approximate distances of landing and roll.

Chipping requires picking a target. The closer the target is to the player, the
smaller the resulting dispersion becomes. Dispersion is circular for now.

Some experimentation will be required to figure out what an appropriate level of
dispersion is for the chip to meet real world data.

## Bunker shots

For now, bunker shots are just going to use some real world data to determine
how far from the hole someone ends up. In the future this can be made more
interesting.

## Putting

For now, putting will use real world player data and just have a chance of 1, 2,
or 3 putting based on distance. This may be adjusted in the future. It would be
great to illustrate the idea that "never up never in" is actually not good
advice to follow due to leaving longer comeback putts, for example.
