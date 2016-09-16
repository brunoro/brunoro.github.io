Date: 2016-09-15
Title: Serbilian: writing Brazilian Portuguese in Serbian Cyrilic
Tags: languages, cyrilic, serbian, portuguese

EDIT (2016-09-16): as of a great suggestion from [hisham](http://hisham.hm/), I reused some symbols from Russian Cyrilic (Э э for /ɛ/, X x for /x/) instead of using Latin alphabet or IPA replacements. I still kept S s for /z/ with readability in mind, as З з looks *very* similar to Э э to non-seasoned cyrilic readers like me.

I recently attented [BalCCon2k16](https://2k16.balccon.org/index.php?title=Main_Page) in Novi Sad, Serbia with 
my good friend [@daltojr](https://twitter.com/daltojr) and, apart from the amazing people and delicious food, 
something that we both enjoyed was reading [Serbian Cyrilic](https://en.wikipedia.org/wiki/Serbian_Cyrillic_alphabet).
The fact that every sound was represented directly by one letter made it very easy for us to (badly) read with the Serbian
language very quickly. Due to the similarities of the sounds between Serbian and Portuguese, we quickly started joking
around writing portuguese words in that script. After hearing from one of the cool staff members on the hostel we were staying
that Brazilians and Serbs were very much alike -- the so called Serbilians -- I decided to roll up my sleeves and write
some software to translate pt-BR into cyrilic.

## Сербилeрu
Before writing any line of code, I had to define how each sound in Brazilian Portuguese would be written.
I was sure that some of the sounds would have a corresponding cyrilic letter, so that also meant creating a new script: the
*Serbilian* (Alfabeto Serbileiro/Auфабεтu Сербилeрu). 
My process was simple: I started off with the [Portuguese phonemes in IPA](https://en.wikipedia.org/wiki/Help:IPA_for_Portuguese), then matched those to the Serbian Cyrilic characters and finally added the missing symbols. 
At that point, I followed some guidelines to fill the gaps:

1. reuse symbols from sounds similar sounds in Serbian not present in pt-BR: /v/ is written as "В" or "в", which originally represent /ʋ/.
2. group sounds with negligible pronounciation differences: /r/ and /ɾ/ are both written as "Р" or "р".
3. use latin letters not used in the Serbian Cyrilic script: /w/, /ʊ/ and /ʊ̃/ are represented as "U" or "u".
4. grab Russian alphabet letters that represent sounds that are not present in Serbian: /ɛ/ becomes "Э" or "э".
5. use the IPA symbol rather than adding an accent over a letter: /ɐ/ is written as "∀" or "ɐ", rather than "â".

One downside of the result is that the stress mark, normally written with acute accents in pt-BR, is totally lost.
This could be easily solved by adding stress marks like a dot under the letter (I didn't implement this in my code).

IPA             | Example                                                                   | Serbilian
----------------|---------------------------------------------------------------------------|----------------------------------------
/a/ /æ/         | d**á**, J**a**ime                                                         | А а
/ã/ /ɐ/ /ɐ̃/     | **a**ndaime, itapu**ã**, p**ã**o                                          | ∀ ɐ (not in Serbian)
/b/             | **b**eiço, ca**b**eça                                                     | Б б
/k/             | **c**or, **qu**ente, **k**iwi                                             | К к
/d/             | **d**edo, i**d**ade                                                       | Д д
/dʒ/            | **d**igo, ida**d**e                                                       | Џ џ
/e/             | pr**ê**mio, m**e**do                                                      | Е е
/ɛ/             | m**e**ta, s**é**, **É**merson, caf**e**zinho                              | Э э (not in Serbian)
/f/             | **f**ado, ca**f**é                                                        | Ф ф
/ɡ/             | **g**ato, **gu**erra                                                      | Г г
/j/ /ɪ/         | sa**i**a, pa**i**s,                                                       | Ј ј
/i/ /y/         | d**i**a, ra**i**nha, pa**i**s                                             | И и
/l/             | **l**ua, a**l**ô                                                          | Л л
/ʒ/             | **j**á, **g**ente                                                         | Ж ж
/ʎ/             | **lh**e, ve**lh**o                                                        | Љ љ
/w/ /ʊ/ /ʊ̃/ /y/ | **o**, ma**l**, ma**u**, freq**u**ente, q**u**ã**o**, Ca**u**ã, veja**m** | У y
/m/             | **m**ês, so**m**o                                                         | М м
/n/             | **n**ão, so**n**o                                                         | Н н
/ɲ/             | **nh**oque, so**nh**o                                                     | Њ њ
/ɔ/             | av**ó**, fam**o**sa                                                       | Ɔ ɔ (not in Serbian)
/o/             | av**ô**, fam**o**so                                                       | О о
/õ/             | p**õ**e                                                                   | Õ õ (not in Serbian)
/p/             | **p**ó, so**p**a                                                          | П п
/ʁ/ /χ/ /x/     | **r**io, ca**rr**o, po**r** favo**r**                                     | X x (not in Serbian)
/r/ /ɾ/         | f**r**io, ca**r**o, po**r** acaso                                         | Р р
/s/             | **s**aco, i**ss**o, bra**ç**o, má**x**imo, e**s**cola                     | С с
/z/             | ca**s**a, o**s**, do**z**e, e**x**istir                                   | S s (not in Serbian)
/ʃ/             | **ch**ave, bai**x**o, su**sh**i                                           | Ш ш
/tʃ/            | **tch**au, ri**t**mo, pon**t**e                                           | Ч ч
/t/             | **t**empo, á**t**omo                                                      | Т т
/u/             | r**u**a, l**ú**cido, sa**ú**de                                            | У у
/v/             | **v**ela, li**v**ro                                                       | В в (reused from /ʋ/, which is not in pt-BR)

Some example transliterations:

* _Foi o cão que botou pra nós beber_: Фoи у кɐo кi ботоу пра нɔс бебер.
* _Acho a velocidade um prazer de cretinos. Ainda conservo o deleite dos bondes que não chegam nunca._: Ашу а велосидаџi ун праsер џi кречинус. Аинда консэрву у делeчi дус бонџiс кi нɐo шегɐo нунка.
* _Ao vencedor, as batatas_: Aу вeнседор, ас бататас.
* _Nada separa as classes como a língua. Fora a renda, claro_: Нада сепара ас класiс кому а лингуа. Фɔра а xeнда, клару.

## Implementation
Now that I had a clear specification of the script, I could put together some code to transliterate pt-BR from the Latin
to Serbilian Cyrilic. My weapon of choice for writing quick and dirty code for this was Ruby: loads of libraries and nice Unicode
support. The algorithm is pretty simple: grab the text in latin script, tokenize it, extract the IPA pt-BR pronounciation, convert
the phonemes to Serbilian, put the text together again.

I used [pragmatic_tokenizer](https://github.com/diasks2/pragmatic_tokenizer) for separating tokens and 
[eSpeak](http://espeak.sourceforge.net/) for extracting the IPA pronounciation.
One interesting thing I found in during the implementation is that the case of a character depends on locale.
Ruby handles this by just not handling natively at all, i.e.: `'é'.upcase == 'é'`. 
For this reason, I also used the [unicode_utils](https://github.com/lang/unicode_utils) gem, which does the locale-aware conversion.

I also got some [pangrams](https://en.wikipedia.org/wiki/Pangram) from [this website](http://clagnut.com/blog/2380/#Portuguese)to test out if I had at least most of the phonemes covered by my script. 

One shortcoming of this approach is that sounds in pt-BR that depend on the context ("por favor" vs "por acaso", where the "r" changes its sound when before a vowel on the next word) get the wrong phonetic transliteration. This is a though problem to tackle: either we give up on having a 1x1 phonetic transcription, or we get words that have multiple forms, depending on the next word on the phrase. I won't go there for my little fun project -- if you have an easy solution please let me know!

Finally, the code:

[gist:id=e9ab9c1e662f7e8db188c3a29515246a,filetype=ruby]
