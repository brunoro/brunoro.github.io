Date: 26/08/2013
Title: Elixir: Debugging and Inspection - weeks 9 and 10
Tags: gsoc2013, elixir

After last weeks' drama about anonymous functions, we could say that everything went well: the final
code wouldn't differ much from the current `defdebug` and `case` expressions.
On weeks 9 and 10 I've finally managed to write code to make all runtime tests pass, dealt with with 
non-debugged code interoperability, did some module name refactoring and rambled bit about a simple CLI.

### Mystery on PIDland
The trouble of nested eval calls must have caused me some kind of __evalception__ trauma.
This last test related to the last features I've had implemented showed that:


    :::ElixirLexer
    defdebug msg_f2 do
      pid = spawn fn ->
        receive do
          { from, :msg } ->
            from <- :ack
        end
      end
      pid <- { self, :msg }
      receive do
        :ack -> :ok
      end
    end

Running this piece of code would either result in a perfect `:ok` or on a process hanging on a `receive`
expression with an `:EXIT` message from a process with an unknown PID. Deeply disturbing.
Inspecting stuff on that code revealed another problem: the escaping functions wouldn't
iterate deeply on data structures, so that `{ self, :msg }` wouldn't get escaped properly, and that
`self` PID would never get matched on receive. Bingo!

### Escape to the hills
On the beginning of the project I thought that escaping was the lesser of my concerns. 
That, however, proved to be wrong, as PIDs and then anonymous functions can't be injected inside an Elixir
quoted syntax tree.
My first solution, always escaping the result of evaluated code, seemed to be definitive until interoperability
with non-debugged code became a concern.
One solution was obvious at this point: evaluated values should always be the same as the results yielded from
a non-debugging run, so escaping should be done before evaluating!

At that point, `Runner.eval_quoted` had some code extracted that became `Runner.escape_and_eval`.
Some function calls were changed, as not every eval call on the runtime would require escaping.
For my surprise, after solving the escaping related problems, that message passing test passed and we got
0 failures (:

### Major Tom to Ground Control
The design of a CLI involved creating a `Controller` module that will interact with `Runner`, giving
the heads up for process execution.
But what about our good old `Controller` module, that only serves to the purpose of keeping the 
state of a process? Well, guess what, it is now called `StateServer`.

The CLI is very simple: when a `Controller` process gets notified by a running process that
an expression is about to be executed, an IO loop starts and a command is read. 
The running process has to wait for authorization before continuing, that way we will be able to
implement more advanced stepping and breakpoints by tweaking the protocol between those processes.
