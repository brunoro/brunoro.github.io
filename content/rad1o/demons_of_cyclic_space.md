Date: 2016-01-09
Title: A Demons of the Cyclic Space l0dable for the rad1o
Tags: rad1o, cellular automata, sdl, 32c3

I was one of the lucky ones that got hold of an amazing [rad1o](https://rad1o.badge.events.ccc.de/) on the last [Chaos Communication Camp](https://events.ccc.de/camp/2015/wiki/Main_Page),
but, apart from following some [SDR tutorials](https://greatscottgadgets.com/sdr/) and messing around with transmitting and recieving FM signals, I couldn't
invest much time in doing cool stuff using it.
After watching the amazing [Iridium Update by sec and schneider](https://media.ccc.de/v/32c3-7154-iridium_update) at the [32c3](https://events.ccc.de/congress/2015/wiki/Static:Main_Page), I decided to roll up my sleeves and implement something)
(although not SDR related) to run on my rad1o. It'd be something neat looking yet quick to implement, that I could use to keep my badge's
display busy when I was walking around on the congress. One algorithm quickly popped to my mind: the Demons of Cyclic Space.

!["it's alive!"](img/demons-rad1o.jpg "it runs!")

### Cyclic cycles in spaces

I first found out about this cellular automata though reading a collection of A.K. Dewdney's column "Computer Recreation" for Scientific American.
The algorithm described in the article, called "A cellular universe of debris, droplets, defects, and demons", and later on his book
["Computer Magic"](http://www.amazon.com/The-Magic-Machine-Handbook-Computer/dp/0716721449), is pretty simple:

1. Populate a 2D grid with out of random _n_ states.
2. At each step _t_, for every position _p_ on the grid, check if any neighboring position (up, down, left, right) has the successor state _n + 1_.
   The successiong of states is cyclic, so the successor of the state _n_ is the state _0_.
3. If yes, the state of _p_ on step _t + 1_ becomes it's successor.

### Writing a l0dable

The rad1o [f1rmware](https://github.com/rad1o/f1rmware) provides an easy way to write small interactive applications that can use the built-in joystick and display things on
the tiny Nokia 6100 screen -- the l0dables. Those are C programs that get dynamically loaded by the f1rmware through a navigable menu.
Their entry point is the `void ram(void)` function, that, for all effects, acts like the main method. The l0dable standard library is forked
from the one developed for the [r0cket](http://www.r0ket.de/l0dable), and provides a clear API for basic build blocks like handling the display
(initializing, drawing and closing), getting events from the joystick (4 directions + press), rendering fonts, etc.
I couldn't find any text documentation, but the [source code](https://github.com/rad1o/f1rmware/blob/master/r0ketlib/display.h) is
[available](https://github.com/rad1o/f1rmware/blob/master/r0ketlib/keyin.h) on [github](https://github.com/rad1o/f1rmware/blob/master/r0ketlib/fonts.h)
and is a breeze to understand if you have some knowledge of C. 

Deploying a l0dable on your rad1o is as simple as including the name of your `.c` file to the `C1D` array on the firmware Makefile, compiling and flashing again.
Instructions on the dependencies and how to compile and flash the f1rmware can be found in the [rad1o wiki](https://github.com/rad1o/f1rmware/blob/master/doc/build.md).
Notice that the name displayed on the menu will be the name of the `.c1d` file.

### dem0ns 

The implementation of the algorithm is pretty straightforward, but there are still some learnings worth highlighting:

- *memory size:* the automata needs two buffers to run, in order to keep the state at _t_ and _t + 1_. As a rookie in microcontroller
programming, I allocated two `uint8_t` buffers with the size of the screen 130x130 straight away. As it happens, the rad1o wouldn't even
have memory one of such buffers. The solution involved using the video memory directly as the one of the buffers, and using a grain size of
at least 2 pixels -- meaning 2x2 blocks, or a buffer size of at most 65x65.

- *color palette:* in order to display the the automata on the screen, it's necessary to have a mapping between colors and state. To keep
things simple, I used a linear mapping to the 8-bit (RRRGGGBB) color representation used on the device, ignoring the color component information.
Surprisingly, this method yielded some pleasant colorschemes that I'd probably otherwise not think of myself.
An important part of this step is ensuring that the range of possible colors is a multiple of the numer of states, so that the modular arithmetic
works fine and the states cycle correctly.

The code for the l0dable is available on [my fork of the f1rmware](https://github.com/brunoro/f1rmware/commit/a9818fa7e3af40f21f76bcf715da61e823682f8e)
