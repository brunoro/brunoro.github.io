Date: 2013-07-14
Title: Elixir: Debugging and Inspection - week 4
Tags: gsoc2013, elixir

This week all the last pretty printing issue was solved, thanks to a pretty cool solution proposed by
José (my mentor on the project). 
More details about the solution, based on changing a bit the way the algorithm decides between formatting
a document on `:flat` or `:break` mode, are available on the 
[commit that closed the issue](https://github.com/elixir-lang/elixir/commit/2dc1e41aca4b456ee7644f3c4c97a2205f0df36b).

Some advance was made regarding the design of the debugger and how to achieve the desired functionalities.
My initial idea was to implement an Elixir interpreter based on quoted expressions, and then insert debugging functionalities
on top of that runtime, similar to the way OTP's [debugger](http://www.erlang.org/doc/apps/debugger/debugger_chapter.html) is built.
That approach would enable total control over code execution and provide a sandboxed environment for debugging.
However, emulating Elixir's semantics would require a large amount of effort that could be avoided with a design based on meta-programming.

The idea of using meta-programming to solve the problem is to inject message passing calls to _Evaluators_, processes spawned to 
handle function calls for modules running on _debug_ mode, on the programs to be debugged.
That way, _Evaluators_ can access the current running scope and are able to provide inspecting information and manipulate
the control flow as requested by the debugger interface.

As a starting point to that approach, I'm implementing a proof of concept that provides a `defdebug` macro, which allows stepping
the execution of the defined function.
