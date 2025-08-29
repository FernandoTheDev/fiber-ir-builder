import { FiberType, FiberValue } from "./fiber_value.ts";
import FiberBlock from "./fiber_block.ts";

export default class FiberFunction {
    private name: string;
    private returnType: FiberType;
    private params: FiberValue[];
    private isSection: boolean;
    private block!: FiberBlock;

    constructor(
        name: string,
        type: FiberType,
        params: FiberValue[] = [],
        isSection: boolean = false,
    ) {
        this.name = name;
        this.returnType = type;
        this.params = params;
        this.isSection = isSection;
    }

    getArg(index: number): FiberValue {
        // TODO: Validate
        return this.params[index];
    }

    setBlock(block: FiberBlock): void {
        this.block = block;
    }

    gen(): string {
        let code = "";
        if (!this.isSection) {
            code += `fn ${this.name} (`;
            for (let i = 0; i < this.params.length; i++) {
                code += this.params[i].value;
                if (!((i + 1) >= this.params.length)) {
                    code += ", ";
                }
            }
            code += ") ";
            code += this.returnType;
        } else {
            code += `.${this.name}`;
        }
        code += this.block.gen();
        return code;
    }
}
