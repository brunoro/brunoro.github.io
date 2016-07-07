Date: 2016-07-06
Title: Making XCode bearable: a plugin list
Tags: xcode, ios, osx, objective-c

Let's face it, using XCode in 2016 is a burden that iOS developers are forced to bear. 
All the crashes, the eternal indexing, the terrible refactoring functionality, the weird
build fails solved by re-opening the editor, the inability to (sometimes) run individual
unit tests, and other annoyances are already well-known by daily users of the tool.
To some, like me, switching to AppCode isn't a viable solution. The toolchain used by
the JetBrains suite still relies on XCode for many tasks, and you might end up switching between 
both IDEs most of the time.

The awkwardness of the Apple development tools is understandable when looking at its history. 
OS X, and, more recently, iOS follow the lineage of the operating system developed by another
company by Steve Jobs, NeXT. A more detailed look on how the legacy of the [NeXTSTEP operating system](https://en.wikipedia.org/wiki/NeXTSTEP)
is still living in our Macs and iPhones is available on this [Ars Technica article](http://arstechnica.com/apple/2012/12/the-legacy-of-next-lives-on-in-os-x/).
XCode is the successor of the NeXT development tools, bundling the 
[Interface Builder](http://www.cilinder.be/docs/next/NeXTStep/3.3/nd/DevTools/03_InterfaceBuilder/InterfaceBuilder.htmld/index.html)
(the .nib extension used on Cocoa and Carbon interface files stands for _NeXT Interface Builder_) and 
the [Project Builder](http://www.cilinder.be/docs/next/NeXTStep/3.3/nd/DevTools/02_ProjectBuilder/ProjectBuilder.htmld/index.html)
(guess where the cluttered and unmergeable .pbxproj project format comes from).

Although a notable and innovative development suite for its time -- Tim Berners-Lee used it to develop the first WorldWideWeb browser at the CERN -- it's still a piece of software designed in the late 80s.
Apart from adding support to new mobile platforms and programming languages, Apple hasn't done much 
to bring the development evironment to the 21st century. The featureset still lags behind contemporary alternatives,
like Microsoft's Visual Studio or even Google's Android Builder, which is based on IDEA's IntelliJ.
Luckily, some plugins can ease this suffering and fill some of the usability gaps left by the Cupertino company.

### Alcatraz
[Alcatraz](https://github.com/alcatraz/Alcatraz) is a plugin manager for XCode and your
starting point on pimping up your development environment. Installing it is as simple as
running the install script found at `https://raw.github.com/alcatraz/Alcatraz/master/Scripts/install.sh`.
The plugin manager window can be opened by the shortcut **⌘ + ⇧ + 9**.

![Alcatraz window](https://camo.githubusercontent.com/919efe4e1e53237df51d7010c862bd5c04fd6a70/687474703a2f2f616c63617472617a2e696f2f696d616765732f73637265656e73686f744032782e706e67)

### AutoHighlightSymbol
The [Auto Highlight Symbol](https://github.com/chiahsien/AutoHighlightSymbol) improves drastically the
built-in symbol highlighting from XCode by using a configurable background color to highlight the text,
instead of the barely visible underlining.

![Auto Highlight Symbol screenshot](https://github.com/chiahsien/AutoHighlightSymbol/raw/master/screenshot.png)

### Backlight
One simple feature overlooked by the XCode text editor is highlighting the current line where the cursor is placed.
Luckily, the [Backlight](https://github.com/limejelly/Backlight-for-XCode) plugin fixes that.

![Backlight](https://raw.githubusercontent.com/limejelly/Backlight-for-XCode/master/screenshot.png)

### Fuzzy Autocomplete
I always wondered why the autocomplete dialog from from XCode didn't use the same algorithm as the quick open
functionality (accessed at **⌘ + ⇧ + O**). The [FuzzyAutocomplete](https://github.com/FuzzyAutocomplete/FuzzyAutocompletePlugin) 
plugin does exactly that, using Xcode's own `IDEOpenQuicklyPattern` to implement a better autocomplete algorithm. 
A [fascinating writeup by chendo](http://chen.do/blog/2013/10/22/reverse-engineering-xcode-with-dtrace/?utm_source=github&utm_campaign=fuzzyautocomplete) explains how he used `dtrace` to inspect what the infamous IDE is doing under the hood
and implement this great plugin.

![Fuzzy Autocomplete demo](https://github.com/FuzzyAutocomplete/FuzzyAutocompletePlugin/raw/master/demo.gif)

### IconMaker
I've created the habit to curse Apple and their lack of love towards developers using their platform everytime I have to resize, crop 
and rename images to generate app icons. After dealing with a suite of imagemagick scripts, I've decided to use [IconMaker](https://github.com/kaphacius/IconMaker) for the job. It adds a tool that allows on to easily create asset catalogs from a source image.

### MCLog
A very necessary and basic feature lacking on XCode is filtering the output of the console.  Android developers can easily 
do that using UNIX tools such as `grep`, but iOS developers are hostages to Apple's walled garden. 
[MCLog](https://github.com/yuhua-chen/MCLog) comes to the rescue, adding a search bar to the bottom of the console that
allows the output of a running app to be filtered using regexes.

![MCLog demo](https://camo.githubusercontent.com/ecbdebd01af366c9a7d3c3d0850a164f127030a9/68747470733a2f2f7261776769746875622e636f6d2f79756875612d6368656e2f4d434c6f672f6d61737465722f4d434c6f6753637265656e73686f742e676966)

### Peckham
Another basic IDE use-case overlooked by Apple on XCode that I'm sure most iOS developers will identify with, is 
scrolling all the way to the top of a source file to add new import statments.
[Peckham](https://github.com/markohlebar/Peckham) solves that by adds a tiny menu with fuzzy autocompletion accessible by 
the **⌘ + Ctrl + P** shortcut.
