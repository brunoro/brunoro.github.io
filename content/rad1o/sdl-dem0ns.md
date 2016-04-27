Date: 2016-03-20
Title: SDL dem0ns, or: a tiny emulat0r
Tags: rad1o, cellular automata, sdl

While writing my little l0dable, I faced a small inconvenient: compiling and flashing the
f1rmware at every iteration of the development. The easiest solution for this would be running the code on some kind of emulator for development purposes. With a little research, I found a mention of a [simulat0r for the r0ket](http://r0ket.de/l0dable). As much of the code of the rad1o standard library comes from the r0ket one, it shouldn't be difficult to run my l0dable with minor changes on this simulator. Turns out it wasn't the case.

!["SDL dem0ns"](img/dem0ns-sdl.png "SDL dem0ns")

After a quick download-read-compile-run of the [simulat0r code](https://github.com/r0ket/r0ket/tree/master/simulat0r), I realized that the work of modfiying this existing code -- which provides much more than the l0dable environment, actually running the whole firmware -- would be more difficult than just writing a quick and dirty emulation layer providing the functions I used on dem0ns. I chose SDL for the job with portability in mind, so although I only tested this on OSX and Linux, this should run in most operating systems. The code can be found at [github](https://github.com/brunoro/dem0ns-sdl) alongside my demons of the cyclic space implementation using it.
