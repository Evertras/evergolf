export default class rand {
  constructor() {
    this.value = Math.random();
  }

  readonly value: number;

  inRange(min: number, max: number): number {
    if (max < min) throw '???';

    const diff = max - min;

    return this.value * diff + min;
  }
}
