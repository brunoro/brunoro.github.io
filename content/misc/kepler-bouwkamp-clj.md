Date: 14/10/2013
Title: The Kepler-Bouwkamp Constant
Tags: clojure, quil, math

Follow this construction: draw a circle and inscribe a triangle inside it; inscribe a circle inside
this triangle and repeat the process, now inscribing a square. Continue this steps using pentagons,
hexagons, heptagons, etc.
The ratio between the radius of the outer circle and the inner limit circle is called the
[Kepler-Bouwkamp constant](http://en.wikipedia.org/wiki/Kepler%E2%80%93Bouwkamp_constant).

As described by Adrian R. Kitson's paper [The prime analog of the Kepler-Bouwkamp constant](http://arxiv.org/abs/math/0608186),
that same steps can be done using other sequences, including that of prime numbers. 
On that article, Adrian derives the value of the constant, but doesn't include any image of the 
the construction that'd result from the process. 

I really like those kind of constructions, so I implemented it using [Quil](https://github.com/quil/quil)
to get an idea how it looks. The code used is on a [gist](https://gist.github.com/brunoro/6984849), and here's the result:

![The prime Kepler-Bouwkamp constant](img/prime-kepler-bouwkamp.png)

