import FiberFunction from "../lib/ts/fiber_function.ts";
import FiberBlock from "../lib/ts/fiber_block.ts";
import FiberTempCounter from "../lib/ts/fiber_counter.ts";
import { FiberType } from "../lib/ts/fiber_value.ts";
import FiberModule from "../lib/ts/fiber_module.ts";

const mod = new FiberModule("main.fir");
const counter = new FiberTempCounter();

const fn = new FiberFunction("main", FiberType.Void, [], true);
const block = new FiberBlock(counter);
fn.setBlock(block);

const x = block.varTmpValue(FiberType.Int, "60");
const y = block.varTmpValue(FiberType.Int, "9");
const z = block.call("sum", FiberType.Int, [x, y]);
block.print(z);
block.halt();

const fnNumber = new FiberFunction("sum", FiberType.Int, [
    mod.makeValue("x", "", false, FiberType.Int),
    mod.makeValue("y", "", false, FiberType.Int),
]);

const nBlock = new FiberBlock(counter);
fnNumber.setBlock(nBlock);
const result = nBlock.add(
    FiberType.Int,
    fnNumber.getArg(0),
    fnNumber.getArg(1),
);
nBlock.ret(result);

mod.addFunc(fn);
mod.addFunc(fnNumber);

console.log(mod.gen());
