import FiberModule from "../lib/ts/fiber_module.ts";
import FiberFunction from "../lib/ts/fiber_function.ts";
import FiberBlock from "../lib/ts/fiber_block.ts";
import { FiberType } from "../lib/ts/fiber_value.ts";
import FiberTempCounter from "../lib/ts/fiber_counter.ts";

const mod = new FiberModule("programa.fir");
const fn = new FiberFunction("main", FiberType.Void, [], true);
const block = new FiberBlock(new FiberTempCounter());

const x = block.varTmpValue(FiberType.Int, "60");
const y = block.varTmpValue(FiberType.Int, "9");
const result = block.add(FiberType.Int, x, y);
block.print(result);
block.halt(); // Finaliza o programa

fn.setBlock(block);
mod.addFunc(fn);

console.log(mod.gen()); // Gera código Fir
