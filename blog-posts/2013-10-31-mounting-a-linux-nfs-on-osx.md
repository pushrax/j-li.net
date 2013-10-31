---
title: Mounting a Linux NFS on OS X
subtitle: Notes for fixing UTF-8 and lag issues
tags:
- os x
- nfs
---

After upgrading to OS X Mavericks, I was a bit confused when I couldn’t play
any Röyksopp off my NFS server. It turns out the ö character was preventing
reads from completing successfully, but Finder was still able to retrieve a
directory listing.

Apparently Mac OS X doesn't enable support for normalizing UTF-8 file names by
default. This means that occasionally the representation of a file name on the
client and server can differ.  Fortunately, this is rectified easily by
enabling the `nfc` mount option, which tells OS X to normalize NFS paths using
[NFC](http://en.wikipedia.org/wiki/Unicode_equivalence#Normal_forms).

The other issue I've been having is that disconnecting from the server
without first unmounting causes all filesystem operations to stall for 30
seconds or so. I recently found out that this is due to OS X treating NFS mounts
as uninterruptible by default, meaning that fs calls to them will block until
the server responds, or until the mount completely times out and disconnects.
This is fixed by enabling the `intr` option, which causes calls to fail with
`EINTR` when the server becomes unresponsive.

To apply these options as the default for every mount, add the following line to `/etc/nfs.conf`:

```
nfs.client.mount.options = nfc,intr
```
After doing that, the regular “Connect to Server” function of Finder will use these options as well.
See [`man mount_nfs`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man8/mount_nfs.8.html) for more options.

