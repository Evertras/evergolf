export default class rand {
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
