module lib.d.fiber_function;

import std.stdio;
import std.conv;
import std.format;
import lib.d.fiber_counter;
import lib.d.fiber_value;
import lib.d.fiber_block;

class FiberFunction
{
private:
    string name;
    FiberType returnType;
    FiberValue[] params;
    bool isSection;
    FiberBlock block;
public:
    this(string name, FiberType type, FiberValue[] params = [], bool isSection = false)
    {
        this.name = name;
        this.returnType = type;
        this.params = params;
        this.isSection = isSection;
    }

    Value getArg(int index)
    {
        // TODO: Validar
        return params[index];
    }

    void setBlock(FiberBlock block)
    {
        this.block = block;
    }

    string gen()
    {
        string code;
        if (!isSection)
        {
            code ~= format("fn %s (", name);
            for (long i; i < params.length; i++)
            {
                code ~= params[i].value;
                if (!((i + 1) >= params.length))
                {
                    code ~= ", ";
                }
            }
            code ~= ") ";
            code ~= returnType;
        }
        else
        {
            code ~= format(".%s", name);
        }
        code ~= block.gen();
        return code;
    }
}
