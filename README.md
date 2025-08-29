# Fiber IR Builder

**Official programmatic builder for [Fiber Virtual Machine](https://github.com/fernandothedev/fiber)**

A type-safe, multi-language API for generating Fiber IR (Intermediate Representation) code programmatically, eliminating the need for manual writing.

## Features

- **Zero dependencies** - standalone libraries
- **Multi-language** - consistent APIs across languages
- **Optimized** - generates efficient IR code

## Operating Systems

- Linux
- Windows (no support plans)

## Supported Languages

| Language | Status | Example |
|-----------|--------|---------|
| **D** | ✅ Stable | `ldc2 examples/example.d lib/d/*.d` |
| **TypeScript** | ✅ Stable | `deno -A examples/example.ts` |
| **Python** | 🚧 Planned | - |

## Installation

### D

```bash
git clone https://github.com/fernandothedev/fiber-ir-builder
cd fiber-ir-builder
ldc2 tests/example.d lib/d/*.d
```

### TypeScript

```bash
git clone https://github.com/fernandothedev/fiber-ir-builder
cd fiber-ir-builder
deno -A tests/example.ts
```

## Quick Use

### D

```d
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
block.halt(); // End the program 

fn.setBlock(block); 
mod.addFunc(fn); 

writeln(mod.gen()); // Generate Fir code
}
```

### TypeScript

```typescript
import FiberModule from "./lib/ts/fiber_module.ts";
import FiberFunction from "./lib/ts/fiber_function.ts";
import FiberBlock from "./lib/ts/fiber_block.ts";
import { FiberType } from "./lib/ts/fiber_value.ts";
import FiberTempCounter from "./lib/ts/fiber_counter.ts";

const mod = new FiberModule("programa.fir");
const fn = new FiberFunction("main", FiberType.Void, [], true);
const block = new FiberBlock(new FiberTempCounter());

const x = block.varTmpValue(FiberType.Int, "60");
const y = block.varTmpValue(FiberType.Int, "9");
const result = block.add(FiberType.Int, x, y);
block.print(result);
block.halt(); // End the program

fn.setBlock(block);
mod.addFunc(fn);

console.log(mod.gen()); // Generate Fir code
```

## Example

**Output (Fir IR generated):**

```llvm
.main { 
$0: int = 60 
$1: int = 9 
$2: int; 
add $2, $0, $1
print $2
halt
}
```

**Execution:**

```bash
./bin/fiber programa.fir # Result: 69
```

## API Reference

### Main Modules

- **FiberModule** - Main container for functions
- **FiberFunction** - Function definition with parameters and types
- **FiberBlock** - Block of instructions and operations
- **FiberTempCounter** - Automatic temporary variable manager

<!-- ### Supported Operations

| Operation | D | TypeScript | Description |
|----------|---|------------|-----------|
| Variables | `block.varTmp(Type, value)` | `block.varTmpValue(Type, value)` | Creates a temporary variable |
| Arithmetic | `block.add(Type, a, b)` | `block.add(Type, a, b)` | Addition |
| Calls | `block.call(name, Type, args)` | `block.call(name, Type, args)` | Function call |
| I/O | `block.print(var)` | `block.print(var)` | Prints value |
| Control | `block.halt()` | `block.halt()` | Terminates program | -->

## Project Structure

```
fiber-ir-builder/
├── lib/
│ ├── d/ # D API
│ └── ts/ # TypeScript API
├── tests/ # Tests and Examples
├── bin/ # Fiber VM Binary
└── README.md
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Related Links

- [Fiber VM](https://github.com/fernandothedev/fiber) - Main Virtual Machine
- [Examples](./tests/) - Sample Code
