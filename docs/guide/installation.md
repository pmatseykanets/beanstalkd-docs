# Installation

## Debian and Ubuntu

```bash
sudo apt-get install beanstalkd
```

## macOS

### Homebrew

```bash
brew install beanstalkd
```

### MacPorts

```bash
sudo port install beanstalkd
```

## Fedora

```bash
su -c 'yum install beanstalkd'
```

## CentOS and RHEL

```bash
su -c 'rpm -Uvh http://download.fedora.redhat.com/pub/epel/5/i386/epel-release-5-3.noarch.rpm'
su -c 'yum install beanstalkd --enablerepo=epel-testing'
```

You can drop the `--enablerepo` bits when the next stable epel is pushed.

## Arch Linux

You’ll need to install [yaourt](http://archlinux.fr/yaourt-en).

```bash
yaourt -S beanstalkd
```

## Gentoo

```bash
sudo emerge beanstalkd
```

## Build from sources

```bash
git clone git@github.com:beanstalkd/beanstalkd.git
cd beanstalkd
make
```
