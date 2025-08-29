export enum FiberType {
    String = "string",
    Int = "int",
    Void = "void",
}

export interface FiberValue {
    value: string;
    pointer: string;
    isPointer: boolean;
    type: FiberType;
}
