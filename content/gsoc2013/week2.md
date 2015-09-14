Date: 2013-07-01
Title: Elixir: Debugging and Inspection - week 2
Tags: gsoc2013, elixir

Not much going on this week on my GSoC project, mainly due to the finals season on my university. Besides studying to exams my class assignments kept me busy with [cryptography-related](https://gist.github.com/brunoro/5894145) [algorithms](https://gist.github.com/brunoro/5893701), [AES on WebCL](https://bitbucket.org/brunoro/aes-webcl) and [LLVM passes](https://bitbucket.org/brunoro/clone-constant-args).

!["Brace yourselves, finals are coming"](http://farm3.staticflickr.com/2681/4407477295_c124d447fb.jpg "Finals, serious business.")

I started adjusting the code on the pretty-printer pull request to use the new defrecordp syntax on Elixir. Also, there's some documentation pending on the public interface of the Binary.Inspect.Utils functions

My goal is to have the code merged on upstream until the end of the week, so I can start working on ANSI colors on the pretty-printer and crafting some inspeaction helpers for iex.
