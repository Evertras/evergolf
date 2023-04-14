export class Rand {
  constructor() {
    this.value = Math.random();
  }

  readonly value: number;

  inRange(min: number, max: number): number {
    if (max < min) throw new Error('max < min');

    const diff = max - min;

    return this.value * diff + min;
  }
}

export type Rand2 = [Rand, Rand];
export type Rand3 = [Rand, Rand, Rand];
export type Rand4 = [Rand, Rand, Rand, Rand];

export function makeRand(): Rand {
  return new Rand();
}

export function makeRand2(): Rand2 {
  return [new Rand(), new Rand()];
}

export function makeRand4(): Rand4 {
  return [new Rand(), new Rand(), new Rand(), new Rand()];
}
