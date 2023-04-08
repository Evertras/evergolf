// Using these links for rough chances, modifying to make more linear but these
// could be greatly improved by real data.
// https://shotscope.com/blog/stats/putting-make-percentages-by-handicap-how-do-you-compare/
// (in 5 handicap increments starting from scratch)
const percentMakeOver30ByHandicap = [4.3, 4.3, 3, 2.5, 1.9, 1.9];
const percentMake24to30ByHandicap = [10, 8, 8, 7, 6, 6];
const percentMake18to24ByHandicap = [14.5, 13, 11, 11, 11, 10];
const percentMake12to18ByHandicap = [25, 24, 20, 20, 19, 16];
const percentMake6to12ByHandicap = [43, 41.4, 38.1, 38, 37.8, 35];
const percentMakeUnder6ByHandicap = [92.8, 90.2, 89.3, 84.4, 84, 82.6];

// Just grouped into big buckets, don't have better data for now...
const percent3puttOver50 = 40;
const percent3putt40to50 = 30;
const percent3putt30to40 = 17;
const percent3putt20to30 = 7;
const percent3putt10to20 = 4;

function percentMake(distanceFeet: number, handicap: number): number {
  const handicapBucket = Math.min(
    Math.max(Math.floor(handicap / 5), 0),
    percentMakeOver30ByHandicap.length - 1
  );

  if (distanceFeet >= 30) {
    return percentMakeOver30ByHandicap[handicapBucket];
  }

  if (distanceFeet >= 24) {
    return percentMake24to30ByHandicap[handicapBucket];
  }

  if (distanceFeet >= 18) {
    return percentMake18to24ByHandicap[handicapBucket];
  }

  if (distanceFeet >= 12) {
    return percentMake12to18ByHandicap[handicapBucket];
  }

  if (distanceFeet >= 6) {
    return percentMake6to12ByHandicap[handicapBucket];
  }

  return percentMakeUnder6ByHandicap[handicapBucket];
}

function percent3Putt(distanceFeet: number): number {
  if (distanceFeet >= 50) return percent3puttOver50;
  if (distanceFeet >= 40) return percent3putt40to50;
  if (distanceFeet >= 30) return percent3putt30to40;
  if (distanceFeet >= 20) return percent3putt20to30;
  if (distanceFeet >= 10) return percent3putt10to20;

  // Be generous...
  return 0;
}

export function putt(distanceFeet: number, handicap: number): number {
  const r = Math.random() * 100;

  const percentMakeChance = percentMake(distanceFeet, handicap);
  const percent3PuttChance = percent3Putt(distanceFeet);

  if (r <= percentMakeChance) {
    return 1;
  }

  if (r - percentMakeChance <= percent3PuttChance) {
    return 3;
  }

  return 2;
}
