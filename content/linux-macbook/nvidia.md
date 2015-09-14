Date: 2012-11-07
Title: NVIDIA blob, Macbook 7,1 and EFI boot
Tags: linux, mac os x, macbook, efi, nvidia

The user experience for a developer under Linux is way more flexible than under Mac OS X,
specially talking about package management, which is light-years more evolved on the open
source world. But, on the other hand, some hassle can be experienced from bad hardware 
support and buggy drivers. That's definetely the case with the NVIDIA 320m card on the 
Macbook 7,1 using a EFI boot. The lack of support of the NVIDIA drivers is already known
from many recent facts such as [that Linus Torvalds interview](ihttp://www.youtube.com/watch?v=MShbP3OpASA) 
and the [10 million GPU order](http://www.phoronix.com/scan.php?page=news_item&px=MTEyNTE) they've lost to AMD.

!["A picture is worth a thousand words"](img/fuck-you-nvidia.jpg "A picture is worth a thousand words")

Apple decided to ship the Macbooks using a different boot technology than the old BIOS that
we see on most hardware; Mac OS X boots using a wonky EFI (Extended Firmware Interface) implementation.
That said, it does not use the old MBR partition tables, but the more flexible GUID Partition Tables.
Not to care about the true intentions of switching to EFI boot and the bizarre hybrid MBR setup Apple
proposes for booting Windows and other legacy software (sic), the main issue resides on the fact that
the proprietary NVIDIA driver reads

Some precious information regarding booting from UEFI devices may be found on the [Ubuntu documentation](https://help.ubuntu.com/community/UEFIBooting). There are quite a few forum threads with no conclusive answers about this issue, such as
[this one](http://www.nvnews.net/vbulletin/showthread.php?t=180737&highlight=linux+EFI), [this one](http://forums.gentoo.org/viewtopic-p-7071700.html?sid=57d7b854338e2647b9ba910f7674263a) and [this one](https://bbs.archlinux.org/viewtopic.php?id=142664) only to mention a few. A NVIDIA developer already spoke about
the problem at [nvnews forum thread](http://www.nvnews.net/vbulletin/showthread.php?t=174006&page=2&highlight=linux+EFI) saying that they have plans on addressing it.

The **nouveau** reverse engineered driver does an excellent job for daily use of the machine. The lack
of support of the official driver closes the door to massive parallel CUDA programming, and also causes 
bad perfomance when up to OpenGL development and playing games, as hardware acceleration
is very much needed to guarantee a smooth ride on those applications.

It's quite a shame that NVIDIA still haven't fixed this issue on a 2009 machine, given that
the UEFI booting is to become the standard for newer hardware. Also, gaming on Linux is getting
a lot of attention with [Valve's initiative](http://www.phoronix.com/scan.php?page=article&item=valve_linux_dampfnudeln&num=1)
and the great [Humble Indie Bundle](http://humblebundle.com) with great games for the platform.

This whole experience just showed me that getting Apple hardware, despite its beauty and hype factor,
may not be a good option if you have plans on using it as a serious Linux box.
