% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/structure.R
\name{sketch}
\alias{sketch}
\title{Create a sketch from multiple parts}
\usage{
sketch(pre = NULL, setup = NULL, between = NULL, draw = NULL,
  post = NULL, width = NULL, height = NULL, padding = 0)
}
\arguments{
\item{pre}{A [pre] sketch.}

\item{setup}{A [setup] sketch.}

\item{between}{A [between] sketch.}

\item{draw}{A [draw] sketch.}

\item{post}{A [post] sketch.}

\item{width}{Width of the sketch.}

\item{height}{Height of the sketch.}

\item{padding}{Padding of the sketch.}
}
\description{
p5 sketches are split into five sections:

1. Code before the [setup].
2. The [setup] code.
3. Code between [setup] and [draw].
4. The [draw] code.
5. Code after [draw].

The [p5] function automatically determines where an illustrating function
should be added. You can use `sketch` along with the [pre], [setup],
[between], [draw], and [post] functions in order to explicitly specify where
illustrating functions should be added.
}
