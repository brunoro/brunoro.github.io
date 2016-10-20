Date: 2016-10-20
Title: Building OCaml and C++ mixed projects with OCaml-Makefile
Tags: ocaml, opencv

One difficulty I faced in my recent adventures with OCaml was figuring out how to organize and build my tiny toy projects, which have some custom C++ code in the mix. 
There's a [lot of fragmentation](https://github.com/ocaml/ocamlbuild/blob/master/manual/manual.adoc#pros-cons-and-alternatives)
in the OCaml ecosystem for build systems, and while [ocamlbuild](https://github.com/ocaml/ocamlbuild) seems to be the most widely used tool,
there's no consensus on the community of an _official_ solution. In the midst of all that mess, my only
goal was to find something that required the minimum amount of configuration for me to get something running
and still keep a mildly organized codebase. 
The piece of software that met my requirements was [OCaml-Makefile](https://github.com/mmottl/ocaml-makefile).

It's very simple to use it: copy that OCaml-Makefile into the root of your project and create your Makefile containing
`-include OCamlMakefile` as the last line, and specify some variables:

* `SOURCES`: the OCaml and C source files.
* `RESULT`: the name of the resuting product.
* `PACKS`: [opam](https://github.com/ocaml/opam/) packages that should be linked.

That done, building binaries and libraries in native or bytecode, with debugging or profiling directives enabled if necessary, 
is as easy as invoking a make target. The README of the OCamlMakefile goes through most of the use cases of the tool,
but I still faced some minor trouble when trying to compile a piece of software that contained some C++ source files and was
linked with C libraries -- and that's why I'm writing this post.

It turns out that there are two more important variables to take care of when compiling and linking C++ libs:

* `CXXFLAGS`: the include path of headers used in your C++ code. The output of `pkg-config --cflags`. Not adding the correct `-I` flags here will result in a compile time error.
* `CLIBS`: the libraries used while linking your executable, without the `-l` part. As you're using C++ code remember to add `c++` (from `-lc++`) here. Missing libs here will result in a `Undefined symbols for architecture x86_64:` kind of error _at runtime_.

I uploaded [webcaml](https://github.com/brunoro/webcaml) as an example project with this setup that uses the [OpenCV C++](http://opencv.org/) interface through ctypes and [SDL2](https://libsdl.org/) through [tsdl](http://erratique.ch/software/tsdl) to show a webcam feed (a herculean task by itself without the help of some established codebase). The approach used to interface with C++ using is the one described in [this github issue](https://github.com/ocamllabs/ocaml-ctypes/issues/187).

[<img src="https://pbs.twimg.com/tweet_video_thumb/Cuu5OEKWYAAthVT.jpg">](https://twitter.com/elbeise/status/786926310929076224)
