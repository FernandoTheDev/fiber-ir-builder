module tests.test;

import lib.d.fiber_function;
import lib.d.fiber_block;
import lib.d.fiber_counter;
import lib.d.fiber_value;
import lib.d.fiber_module;

import std.stdio;

void main()
{
    auto mod = new FiberModule("main.fir");
    auto counter = new FiberTempCounter();

    auto fn = new FiberFunction("main", Type.Void, [], true);
    auto block = new FiberBlock(counter);
    fn.setBlock(block);

    auto x = block.varTmp(Type.Int, "60");
    auto y = block.varTmp(Type.Int, "9");
    auto z = block.call("sum", Type.Int, [x, y]);
    block.print(z);
    block.halt();

    auto fn_number = new FiberFunction("sum", Type.Int, [
            Value("x", "", false, Type.Int),
            Value("y", "", false, Type.Int)
        ]);
    auto n_block = new FiberBlock(counter);
    fn_number.setBlock(n_block);
    auto result = n_block.add(Type.Int, fn_number.getArg(0), fn_number.getArg(1));
    n_block.ret(result);

    mod.addFunc(fn);
    mod.addFunc(fn_number);

    writeln(mod.gen());
}
