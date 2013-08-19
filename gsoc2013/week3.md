Date: 08/07/2013
Title: Elixir: Debugging and Inspection - week 3
Tags: gsoc2013, elixir

The third week of my GSoC project featured the [pretty printer](https://github.com/elixir-lang/elixir/pull/1377) being merged into upstream.
This is quite exciting for me, as it's my first expressive contribution to an open source project (:

An [issue](https://github.com/elixir-lang/elixir/issues/1383) was raised on the behavior of the pretty printer when printing lists.
This kind of output is expected from the Wadler pretty printing algorithm, as it can seen on the Ruby implementation as well:

    :::RubyConsoleLexer
    irb(main):001:0> require 'pp'
    => true
    irb(main):002:0> pp (1..100).to_a
    [1,
     2,
     3,
     4,
     5,
     6,
     7,
     8,
     9,
     10,
    # ...and so on
     90,
     91,
     92,
     93,
     94,
     95,
     96,
     97,
     98,
     99,
     100]

The Hughes algorithm implementation present on OTP, despite less performant, allows that kind of fluid paragraph-like 
documents to be produced.
I'm still trying to think of any way of tweaking the Wadler algorithm to solve the issue.

This week I also started making my way through OTP's `dbg` source code and trying out some Erlang debugging tools. 
Maybe one of these days a quick survey about those tools will pop up here on the blog. 

Oh, and I survived finals week and will hand over my last college assignments today, which means full-time Elixir'ing
on the weeks to come!
