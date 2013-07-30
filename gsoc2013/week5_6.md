Date: 29/07/2013
Title: Elixir: Debugging and Inspection - weeks 5 and 6
Tags: gsoc2013, elixir

The last two weeks have been quite busy Elixir debugging: the project has seen a fair amount of changes 
on the design side and many practical issues came up. 
All that had to do with implementing debugging of programs using multi-processing directives, 
which are the most important and distinctive features of Elixir.

### Evaluators, Coordinators and Runners
On our previous design, an `Evaluator` would responsible for keeping the state of a current process and evaluate code on its behalf.
That idea worked quite well when not dealing with message sending for one basic reason: with code actually running on another process,
the PID (process identifier) and the mailbox being used for message passing wouldn't be that of the process being evaluated.
On that context, switching from __interpreted__ to __native__ running modes would be very tricky, as all PIDs would have to be translated
from host to Evaluator and vice-versa.

A `Coordinator`/`Runner` structure would fit much better the problem: the first process would be the bridge between the user interface
and the running code, keeping the state of the code evaluation for the possiblity of inspection; 
the latter would evaluate it's own expressions while waiting for the approval of its `Coordinator`.

### Such a pid thing to do
A practical problem faced recently was injecting PID literals on an Elixir tree -- there's no thing such as PID literals.
The approach used by the interpreter being implemented is to depth-first search on the quoted expressions and backtrack
the values of sub-expressions by replacing them on the tree with the result of their evaluations.
So, when the value of an expression is a process identifier, `:elixir.eval_quoted` would return something that looks like
`#PID<0.27.0>`, which is clearly not valid Elixir syntax and would yield the infamous `invalid quoted expression: #PID<0.27.0>`
when interpreted.

The solution to that problem would require a bit of name mangling and corner case handling.
PIDs have to be provided to the binding just after they're evaluated, as there's no literal representation for them<sup>1</sup>, so
with some name mangling we generate a very distinctive variable name for a process identifier and filter everything coming
off our slick `:elixir_code.eval_quoted` calls.
In the end, turning `#PID<0.27.0>` into a variable called `__PID_0_27_0__` bound to the PID's value (and not a representation) pretty
much solves the problem.

<sub><sup>1</sup>well, as a matter of fact one could use a char list as a PID literal using the `list_to_pid/1` and `pid_to_list/1` functions,
but that'd just make things get more complex.</sub>
