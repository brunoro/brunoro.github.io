Date: 2013-08-12
Title: Elixir: Debugging and Inspection - weeks 7 and 8
Tags: gsoc2013, elixir

The second half of the GSoC program started with the Elixir debugger beginning to show some stability.
Some of the challenges foreseen when taking the decision on the metaprogramming-based design have been solved,
but other tricky control-flow structures involving exception handling and multiprocessing now have to be tackled.

### Rescue catching or keep trying
Exceptions require a lot of caution on their handling: the debugger should isolate its own exceptions from
those raised withing the interpreted program.
With that goal in mind some refactoring work was needed to tag and enclose the `:elixir.eval_quoted` calls
on a rescue-all block.

The expression building trick used to emulate variable initialization used for case expressions
showed itself an amazing tool for implementing many constructs of Elixir on the debugger runtime.
However, this pattern couldn't be used for matching variables on rescue/catch clauses, as, differently
from case clauses, the names defined inside exception-handling blocks don't persist on the rest of the
program.

An example illustrates better this behaviour:

    :::ElixirLexer
    def foo do
      try do
        raise "message"
      rescue
        x in [RuntimeError] ->
          x.message # => "message"
      end
      x  # => ERROR: x not alive here
    end

    def bar do
      case "message" do
        x -> x # => "message"
      end
      x  # => x is alive here, equals to "message")
    end

To avoid implementing the semantics for rescue/catch, we resorted to the before dreaded nested eval calls.
That strategy worked pretty well with some rough edges yet to be rounded, mainly coming from this __evalception__.

### Private mode
I have foreseen anonymous functions somehow as bump on the road while nested eval calls were ruled out of the options.
After the change on the structure of Evaluators/Coordinators/Runners, that approach became again the perfect fit
for implementing `fn -> (...) end` constructs.

The next weeks will host a lot of effort on anonymous functions and polishing try/rescue/catch expressions,
and hopefully the first version of the debugger shell.
