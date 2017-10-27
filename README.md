
<!--- README.md is generated from README.Rmd. Please edit that file -->
Real time data visualizations
=============================

[![Project Status: WIP - Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](http://www.repostatus.org/badges/latest/wip.svg)](http://www.repostatus.org/#wip) [![Travis Build Status](https://img.shields.io/travis/ropensci/realtime/master.svg?label=Mac%20OSX%20%26%20Linux)](https://travis-ci.org/ropensci/realtime) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/ropensci/realtime/master.svg?label=Windows)](https://ci.appveyor.com/project/ropensci/realtime) [![Coverage Status](https://codecov.io/github/ropensci/realtime/coverage.svg?branch=master)](https://codecov.io/github/ropensci/realtime?branch=master) [![CRAN\_Status\_Badge](http://www.r-pkg.org/badges/version/ropensci)](https://CRAN.R-project.org/package=ropensci)

The *realtime R* package can generate real time data visualizations. As an example, let's monitor the sentiment of the *\#auspol* twitter community--in real time. To do this, we will need to install the *rtweet* and *sentimentr R* packages. Also, you will need to create a `.Renviron` file in home directory that contains your twitter access keys. For more information on setting up twitter access, see the [*rtweet* vignette](http://rtweet.info/articles/auth.html).

``` r
realtime(function() {
  # token registration
  token <- rtweet::create_token(
    app = Sys.getenv("TWITTER_APP_NAME"),
    consumer_key = Sys.getenv("TWITTER_CONSUMER_KEY"),
    consumer_secret = Sys.getenv("TWITTER_SECRET_KEY"))
  # tweet
  tweet <- rtweet::search_tweets("#auspol", n = 1, token = token)$text[1]
  # extract sentiment
  return(mean(sentimentr::sentiment(tweet)$sentiment))
}, title = "#auspol mood", ylim = c(-1, 1))
```
