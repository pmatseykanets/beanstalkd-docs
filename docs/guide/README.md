# Introduction

**Beanstalkd is a simple, fast work queue.**

Its interface is generic, and it was originally designed for reducing the latency of page views in high-volume web applications by running time-consuming tasks asynchronously.

You can think of `beanstalkd` as a big "to-do" list for your distributed application. If there is a unit of work that you want to defer to later (say, sending an email, pushing some data to a slow external service, pulling data from a slow external service, generating high-quality image thumbnails) you put a description of that work, a **"job"**, into `beanstalkd`. Some processes (such as web request handlers), **"producers"**, put jobs into the queue. Other processes, **"workers"**, take jobs out of the queue and process them.

::: tip
See [Protocol](/protocol/) for details.
:::
