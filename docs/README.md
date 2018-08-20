---
home: true
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed
---

### Run It

First, run `beanstalkd` on one or more machines.

```bash
./beanstalkd -l 10.0.1.5 -p 11300
```

This starts up `beanstalkd` listening on address `10.0.1.5`, port `11300`.

See [Configuration](/guide/configuration.md) for more configuration options.

### Use It

Here’s an example in Ruby.

First, have one process put a job into the queue

```ruby
beanstalk = Beanstalk::Pool.new(['10.0.1.5:11300'])
beanstalk.put('hello')
```

Then start another process to take jobs out of the queue and process them

```ruby
beanstalk = Beanstalk::Pool.new(['10.0.1.5:11300'])
loop do
  job = beanstalk.reserve
  puts job.body # prints "hello"
  job.delete
end
```

See [Client Libraries](/guide/libraries.md) for your favorite language.

### Thanks

Many thanks to [memcached](http://memcached.org) for providing inspiration for simple protocol design and for the structure of the documentation. Not to mention a fantastic piece of software!

### Author

`beanstalkd` is written by [Keith Rarick](https://github.com/kr) and maintained by the community.