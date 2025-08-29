module lib.d.fiber_value;

alias Type = FiberType;
alias Value = FiberValue;

enum FiberType : string
{
    String = "string",
    Int = "int",
    Void = "void",
}

struct FiberValue
{
    string value; // ex.: x 
    string pointer; // ex.: $0
    bool isPointer;
    FiberType type;
}
