# Configuration

`beaqnstalkd` has no configuration file and only a handful of command-line options.

## Options

- `-b <path>`

  Use a binlog to keep jobs on persistent storage in directory `<path>`.
  Upon startup, `beanstalkd` will recover any binlog that is present
  in `<path>`, then, during normal operation, append new jobs and
  changes in state to the binlog.

- `-c`

  Perform online, incremental compaction of binlog files. Negates
  `-n`. This is the default behavior.

  Do not use this option, except to negate `-n`. Both `-c` and `-n`
  will likely be removed in a future `beanstalkd` release.

- `-f <ms>`

  Call `fsync` at most once every `<ms>` milliseconds. Larger values
  for `<ms>` reduce disk activity and improve speed at the cost of
  safety. A power failure could result in the loss of up to `<ms>`
  milliseconds of history.

  A `<ms>` value of `0` will cause `beanstalkd` to call `fsync` every time
  it writes to the binlog.

  This option has no effect without `-b`.

- `-F`

  Never call `fsync`. Equivalent to `-f` with an infinite `<ms>` value.

  This is the default behavior.

  This option has no effect without `-b`.

- `-h`

  Show a brief help message and exit.

- `-l <addr>`

  Listen on address `<addr>` (default is `0.0.0.0`).

  Option `-l` has no effect if `sd-daemon(5)` socket activation is
  being used. 
  
  See also [Environment](#environment).

- `-n`

  Turn off binlog compaction, negating `-c`.

  Do not use this option. Both `-c` and `-n` will likely be removed
  in a future `beanstalkd` release.

- `-p <port>`

  Listen on TCP port `<port>`. Default is `11300`.

  Option `-p` has no effect if `sd-daemon` socket activation is
  being used. 
  
  See also [Environment](#environment).

- `-s <bytes>`

  The size in bytes of each binlog file.

  This option has no effect without `-b`.

- `-u <user>`

  Become the user `<user>` and its primary group.

- `-V`

  Increase verbosity. May be used more than once to produce more
  verbose output. The output format is subject to change.

- `-v`

  Print the version string and exit.

- `-z <bytes>`

  The maximum size in bytes of a job.

## Environment

- `LISTEN_PID`, `LISTEN_FDS`

  These variables can be set by `init`. See `sd_listen_fds` for details.