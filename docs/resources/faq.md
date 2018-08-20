# FAQ

**Q. How does it work, high-level?**

`beanstalkd` is a big "to-do" list for your distributed application. If there is a unit of work that you want to defer to later (say, sending an email, pushing some data to a slow external service, pulling data from a slow external service, generating high-quality image thumbnails) you put a description of that work, a "job", into `beanstalkd`. Some processes (such as web request handlers), "producers", put jobs into the queue. Other processes, "workers", take jobs out of the queue and process them.

**Q. Are the jobs persistent? What happens if the power goes out?**

Yes, if you choose, you can use the `-b` option, and `beanstalkd` will write all jobs to a binlog. If the power goes out, you can restart `beanstalkd` with the same option and it will recover the contents of the log.

**Q. Does beanstalk inherently support distributed servers?**

Yes, although this is handled by the clients, just as with `memcached`. The `beanstalkd` server doesn't know anything about other `beanstalkd` instances that are running.

**Q. Does the protocol help implement blocking, or is that the domain of the client libraries? In other words, do the client libraries themselves still have to poll?**

There is a blocking `reserve` command in the beanstalkd protocol. A client can simply try to read the response -- this will block until a job is available and reserved for the client. Clients don't have to poll.

**Q. What if I want to poll? Is there a reserve command with a timeout?**

Yes, as of version 1.1. The command is `reserve-with-timeout`. Full details are in the [protocol] (/guide/protocol.md).

**Q. What are tubes and how do they work?**

Tubes are job queues.

A common use case of tubes would be to have completely different sets of producers and consumers running through a single beanstalk instance such that a given consumer will not know what to do with jobs produced by some of the producers.  Producer1 can enqueue jobs into Tube1 and Consumer1 can pick up the jobs from there completely independently of what Producer2 and Consumer2 are doing with Tube2, for example.

**Q. What is the purpose of the "buried" state? When should I use it?**

If you `bury` a job, the server will leave it alone until you kick the job. The job won't be reserved while it is buried, and it won't get put into the ready queue.

For example, this is useful in preventing the server from re-entering a timed-out task into the queue when large and unpredictable run-times are involved. If a client reserves a job, then first buries it, then does its business logic work, then gets stuck in deadlock, the job will remain buried indefinitely, available for inspection by a human -- it will not get rerun by another worker.

**Q. Is there any web administration interface?**

Yes. A list of administration and monitoring tools is available on the [Tools](/resources/tools.md) page.

**Q. How does TTR work?**

`TTR` only applies to a job at the moment it becomes reserved. At that event, a timer (called `time-left` in the job stats) starts counting down from the job's `TTR`.

* If the timer reaches zero, the job gets put back in the `ready` queue.
* If the job is `buried`, `deleted`, or `released` before the timer runs out, the timer ceases to exist.
* If the job is `touch`ed before the timer reaches zero, the timer starts over counting down from `TTR`.

(The job stats of a job that isn't reserved still contain a `time-left` entry, but its value is meaningless.)

**Q. What does DEADLINE_SOON mean?**

`DEADLINE_SOON` is a response to a reserve command indicating that you have a job reserved whose deadline is real soon (current safety margin is approximately 1 second).

If you are frequently receiving `DEADLINE_SOON` errors on reserve, you should probably consider increasing the `TTR` on your jobs as it generally indicates you aren't completing them in time.  It may also be that you are failing to delete tasks when you have completed them.

See [the mailing list discussion](http://groups.google.com/group/beanstalk-talk/browse_thread/thread/232d0cac5bebe30f) for more information.