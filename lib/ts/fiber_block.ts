import FiberTempCounter from "./fiber_counter.ts";
import { FiberType, FiberValue } from "./fiber_value.ts";

export default class FiberBlock {
    private counter: FiberTempCounter;
    private instructions: string[] = [];

    private emit(code: string): void {
        this.instructions.push(code);
    }

    constructor(counter: FiberTempCounter) {
        this.counter = counter;
    }

    varTmp(type: FiberType): FiberValue {
        const name = String(this.counter.next());
        this.emit(`$${name}: ${type};`);
        return {
            value: "$" + name,
            pointer: "",
            isPointer: false,
            type: type,
        } as FiberValue;
    }

    varTmpValue(type: FiberType, value: string): FiberValue {
        const name = String(this.counter.next());
        this.emit(`$${name}: ${type} = ${value}`);
        return {
            value: "$" + name,
            pointer: "",
            isPointer: false,
            type: type,
        } as FiberValue;
    }

    sargs(args: FiberValue[]): string {
        let sargsResult = "";
        for (let i = 0; i < args.length; i++) {
            sargsResult += `${args[i].type} ${args[i].value}`;
            if (!((i + 1) >= args.length)) {
                sargsResult += ", ";
            }
        }
        return sargsResult;
    }

    call(fn: string, type: FiberType, args: FiberValue[]): FiberValue {
        const tmpVar = this.varTmp(type);
        const sargsResult = this.sargs(args);
        this.emit(`call ${fn}(${sargsResult}), ${tmpVar.value}`);
        return tmpVar;
    }

    callWithTarget(
        fn: string,
        args: FiberValue[],
        target: FiberValue,
    ): FiberValue {
        const sargsResult = this.sargs(args);
        this.emit(`call ${fn}(${sargsResult}), ${target.value}`);
        return target;
    }

    add(type: FiberType, x: FiberValue, y: FiberValue): FiberValue {
        const tmpVar = this.varTmp(type);
        this.emit(`add ${tmpVar.value}, ${x.value}, ${y.value}`);
        return tmpVar;
    }

    print(value: FiberValue): FiberValue {
        this.emit(`print ${value.value}`);
        return value;
    }

    ret(value: FiberValue): FiberValue {
        this.emit(`ret ${value.value}`);
        return value;
    }

    halt(): FiberValue {
        this.emit("halt");
        return {
            value: "\0",
            pointer: "",
            isPointer: false,
            type: FiberType.Void,
        } as FiberValue;
    }

    gen(): string {
        let code = " {\n";
        for (const instr of this.instructions) {
            code += "    " + instr + "\n";
        }
        code += "}\n";
        return code;
    }
}
