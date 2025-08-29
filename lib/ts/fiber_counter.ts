export default class FiberTempCounter {
    counter: number = 0;
    next(): number {
        return this.counter++;
    }
}
