module lib.d.fiber_block;

import std.stdio;
import std.conv;
import std.array;
import std.format;
import lib.d.fiber_value;
import lib.d.fiber_counter;

class FiberBlock
{
private:
    FiberTempCounter counter;
    string[] instructions;

    void emit(string code)
    {
        this.instructions ~= code;
    }

public:
    this(FiberTempCounter counter)
    {
        this.counter = counter;
    }

    Value varTmp(Type type)
    {
        string name = to!string(counter.next());
        emit(format("$%s: %s;", name, cast(string) type));
        return Value("$" ~ name, "", false, type);
    }

    Value varTmp(Type type, string value)
    {
        string name = to!string(counter.next());
        emit(format("$%s: %s = %s", name, cast(string) type, value));
        return Value("$" ~ name, "", false, type);
    }

    string sargs(Value[] args)
    {
        string sargs;
        for (long i; i < args.length; i++)
        {
            sargs ~= format("%s %s", cast(string) args[i].type, args[i].value);
            if (!((i + 1) >= args.length))
            {
                sargs ~= ", ";
            }
        }
        return sargs;
    }

    Value call(string fn, Type type, Value[] args)
    {
        Value tmpVar = varTmp(type);
        string sargs = sargs(args);
        emit(format("call %s(%s), %s", fn, sargs, tmpVar.value));
        return tmpVar;
    }

    Value call(string fn, Value[] args, Value target)
    {
        string sargs = sargs(args);
        emit(format("call %s(%s), %s", fn, sargs, target.value));
        return target;
    }

    Value add(Type type, Value x, Value y)
    {
        Value tmpVar = varTmp(type);
        emit(format("add %s, %s, %s", tmpVar.value, x.value, y
                .value));
        return tmpVar;
    }

    Value print(Value value)
    {
        emit(format("print %s", value.value));
        return value;
    }

    Value ret(Value value)
    {
        emit(format("ret %s", value.value));
        return value;
    }

    Value halt()
    {
        emit("halt");
        return Value("\0", "", false, Type.Void);
    }

    string gen()
    {
        string code = " {\n"; // code ~= join(instructions, "\n");
        foreach (instr; instructions)
        {
            code ~= "    " ~ instr ~ "\n";
        }
        code ~= "}\n";
        return code;
    }
}
