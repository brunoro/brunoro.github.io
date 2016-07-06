Date: 2016-07-06
Title: Making XCode bearable: a plugin list
Tags: xcode, ios, osx, objective-c

Let's face it, using XCode in 2016 is a burden that iOS developers are forced to bear. 
All the crashes, the eternal indexing, the terrible refactoring functionality, the weird
build fails solved by re-opening the editor, the inability to (sometimes) run individual
unit tests, and other annoyances are already well-known by daily users of the tool.
To some, like me, switching to AppCode isn't a viable solution. The toolchain used by
the Jetbrains still relies on XCode for many tasks, and you might end up switching between 
both IDEs most of the time.

To be fair, XCode inherits its codebase from [PBX](http://www.cilinder.be/docs/next/NeXTStep/3.3/nd/DevTools/02_ProjectBuilder/ProjectBuilder.htmld/index.html), the NeXTSTEP's Project Builder
Luckily, some plugins can ease this suffering and fill the gaps left by Apple on the
_mandatory_ IDE for iOS, OS X and Watch OS development.

### Alcatraz
[Alcatraz](https://github.com/alcatraz/Alcatraz) is a plugin manager for XCode and your
starting point on pimping up your development environment. Installing it is as simple as
running the install script found at `https://raw.github.com/alcatraz/Alcatraz/master/Scripts/install.sh`.

![Alcatraz menu](https://camo.githubusercontent.com/70505dece9a75af5ca4715fff66271127f7d5b78/687474703a2f2f616c63617472617a2e696f2f696d616765732f6d656e754032782e706e67)

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
A [fascinating writeup by chendo](http://chen.do/blog/2013/10/22/reverse-engineering-xcode-with-dtrace/?utm_source=github&utm_campaign=fuzzyautocomplete) explains how to use dtrace to inspect what the infamous IDE is doing under the hood.

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
[Peckham](https://github.com/markohlebar/Peckham) solves that by adds a tiny menu with fuzzy autocompletion accessible by the *⌘ + Ctrl + P* shortcut.
