import lib.d.fiber_module;
import lib.d.fiber_function;
import lib.d.fiber_block;
import lib.d.fiber_counter;
import lib.d.fiber_value;
import std.stdio;

void main()
{
    auto mod = new FiberModule("programa.fir");
    auto fn = new FiberFunction("main", Type.Void, [], true);
    auto block = new FiberBlock(new FiberTempCounter());

    auto x = block.varTmp(Type.Int, "60");
    auto y = block.varTmp(Type.Int, "9");
    auto result = block.add(Type.Int, x, y);
    block.print(result);
    block.halt(); // Finaliza o programa

    fn.setBlock(block);
    mod.addFunc(fn);

    writeln(mod.gen()); // Gera código Fir
}
