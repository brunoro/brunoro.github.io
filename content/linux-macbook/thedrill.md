Date: 2012-07-06
Title: Linux on a Macbook part II: the drill
Tags: linux, osx, macbook

The Arch Linux installation process wasn't much different on a Macbook than it would be on another laptop.
Installing the bootloader comes as the main issue, but even though it was quickly solved. It's always helpful
to have another device connected to the internet so you can read the [Arch](https://wiki.archlinux.org/index.php/MacBook) 
and [Gentoo](http://en.gentoo-wiki.com/wiki/Apple_Macbook) Macbook wiki pages during the process.
Also, you'll need wired internet access on some steps of the installation.

Start by downloading the core iso at archlinux.org and burning it on a CD. 
I have not tried to boot from a USB flash drive. Boot it on your Macbook by holding the C key on startup.
When you get a working shell, it's time to partition the hard drive using a GPT table. You won't be able
to this using the bundled cfdisk application, so connect to the internet and install cgdisk from the gptfdisk package:

    # connect to the internet
    $ dhcpcd
    # install the package
    $ pacman -Sy gptfdisk
    # partition your main disk
    $ cgdisk /dev/sda

You should create a separate /boot partition. For instance, my disk looks like this:

    Name	Type	Size 
    ----	----	----
    EFI		vfat	200Mb
    boot	ext2	100Mb
    swap	swap	2Gb
    root	ext4	60Gb
    home	ext4	170Gb

Now start the installation running /arch/setup. Select your timezone and your system clock looks fine with UTC time.
On the prepare hard disk step just create the filesystems on the partition table you created before.
Keep the setup normally until the bootloader step - __don't install a bootloader__.

Quit the arch setup menu and return to the shell. Install UEFI version of GRUB2 following the 
[guide on the Arch wiki](https://wiki.archlinux.org/index.php/Grub2). Run to generate the config files needed to boot:

    $ grub-mkconfig -o /boot/grub/grub.cfg

Now we just need to tell the built-in bootloader that our GRUB2 is bootable. 
To do this go fetch your Mac OS X install disk and boot from it. Select your
language and then open Terminal.app, it should be on the top menu under _Utils/Terminal.app_.
You're going to _bless_ your boot partition (the filenames depend on the previous step):

    $ bless --mount=/Volumes/EFI  --file=/Volumes/EFI/efi/arch/grub-x86_64.efi --setBoot

Now your Arch Linux should boot from GRUB2 after a couple of seconds stuck on the blue-ish EFI screen.
The next challeng is the post-install party, get your energy drinks.
