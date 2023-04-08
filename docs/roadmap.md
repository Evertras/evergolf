# Roadmap

This is a projected roadmap of milestones to hit. Very rough, no promises.

## v0.1.0 - Boilerplate (Complete)

This is purely setup boilerplate to make everything else easier later.

Requirements:

- [x] Automated prod deployment to https://golf.evertras.com
- [x] Automated dev deployment to https://devgolf.evertras.com
- [x] Page built using expected pipeline viewable at above
  - [x] This page has some simple javascript placeholder
- [x] Automated tests/linting in GHA

## v0.2.0 - Visible hole

Have a hole visible with a top down view, and some basic data about it.

Requirements:

- [x] A hole is visible in a top down view (pull from Google Earth)
- [x] The hole has boundaries marking fairway, rough, hazards, green, etc.
- [x] The player is put on the tee (only one tee for now)
- [x] Mousing over the hole displays what type of terrain is under the cursor
- [x] Mousing over displays distance between player and cursor, and hole and cursor

## v0.3.0 - Playable long shots

Have a hole and let the player make some preset shots at it.

Requirements:

- [x] Preset list of shots (can be short with just As Intended outcomes)
- [x] Player can select a shot and a directional target
- [x] Player can hit preset shots and ball advances
- [x] If the ball is on the green, 2 putt and display total hole score
- [x] If the ball is less than minimum yardage, automatically hit onto green
- [x] Previous shots are shown as tracers
- [x] Moving the mouse over the course displays distance to the player and hole
- [x] Current stroke total is shown

## v0.4.0 - Short game

Add chipping.

Requirements:

- [ ] The playable hole can be chipped onto at some distance.
  - [ ] A club can be selected when chipping
  - [ ] A target can be selected when chipping
  - [ ] The chip happens based on Rule of 12 distances + some dispersion
- [ ] Bunker shots work with simple chance dispersion

## Future TBD

- [ ] 18 holes (should be simple after 9)
- [ ] Player shot management
- [ ] Login / saving player data
