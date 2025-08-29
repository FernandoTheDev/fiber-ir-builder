module lib.d.fiber_counter;

class FiberTempCounter
{
public:
    long counter = 0;
    long next()
    {
        return this.counter++;
    }
}
