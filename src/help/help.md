![](../../node_modules/markdown-mark/svg/markdown-mark.svg)  

# Welcome to frontal.app
## Hit ⌘ + O to open a Markdown presentation

You can navigate your document by using these keys.

| Keys                | Actions                   |
| --:                | :--                       |
| Down ↓             | Next Slide                |
| Right →            | Next Slide                |
| Up ↑               | Previous Slide            |
| Left ←             | Previous Slide            |
| ⌘ or ^ + O         | Opens a new markdown file |
| ⌘ or ^ + Q         | Closes the App            |
| ⌘ or ^ + Plus (+)  | Zoom in (always 10%)      |
| ⌘ or ^ + Minus (-) | Zoom out (always 10%)     |

---


## How to write a presentation?  

Creating a presentation is dead simple. Just write your Markdown like you always would. To create separate slides just split them with a horizontal line and leave a empty line before and after it.  


```text
# Slide 1  
And some text.

---

## Slide 2
And more text
```

Simple. Isn't it?  

---

## Markdown headings `# to ######`

Of course you can use H1 to H6

```plain
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

Be aware that `#Heading` wont be converted to HTML. Only `# Heading`.  

---

## Paragraphs  

Paragraphs are just simple text. You don't need to add anything except to whitespaces at the end of it to create a line break.  
Simple isn't it


```text
Some paragraph that ends here.  
There is the line break ----> ^^
```

---

## Bold and Italic  

To make something __bold__ you can sourround it with two underscores like this: `__this will be bold__` or you can use two asterisk. `**This will also bold**`. The same goes for _italic_ but you just use one underscore or asterisk. `_This is italic_` and `*this as well*`.  



---

## Inline Code

On the slide before this one you saw also the usage of `inline code`. If you want to highlight something as code you can enclose it in backticks:

    This is normal text. `This is inline code!` This is normal text again. 

---

## Codeblocks  

Of course you can also add codeblocks. Just indent your code with four spaces. Or if you want to be fancy you can use the pygments style code blocks with three backticks and the abbrevaition for the language. We use [highlight.js](https://github.com/isagalaev/highlight.js) through [marked](https://github.com/chjj/marked) with an autodetection. So 4 spaces should be enough.  


```text
    // 4 spaces
    someCode()  
^^^^ //<-- 4 spaces
```

    ```js
    //backticks
    console.log('Hello JS');
    ```

---

## Quotes  

> Of course there are quotes! They are done like this.  
> fabiantheblind

```text
> Of course there are quotes! They are done like this.  
> fabiantheblind
```

---

## Ordered and Unordered Lists  

To create a unordered lists you can use `-`, `*` or `+` at the beginning of a line like you would in plain text.  


```text
- This 
- is 
* a 
- unordered list
- * it can also be nested and mixed - or *.
- - great.

1. This
2. would 
3. be a ordered list
```

---

## Hyperlinks  

To have [hyperlink](https://github.com/frntl) and open it in your default browser _(opening them directly in frontal is not supported yet)_ you write square brackets with the text and round brackets with the url `[hyperlink](https://github.com/frntl)`. There are also other ways to write links in Markdown [M↓]. Take a look at it [here](http://daringfireball.net/projects/markdown/syntax).  

---

## Images

![](./images/markdown-mark.svg)  

What would a presentation be without fancy shiny images? (Spoiler alert) Nothing. So to add your images just drop them next to your [M↓] file or into a subfolder and reference them like this `![](images/me-fro.png)`. This is an relativ path in the following folder structure. As you can see it is nearly the same as having a hyperlink.  

```text
├── help.md
└── images
    ├── markdown-mark.svg
    └── me-fro.png

```

You can also embed images from the web directly buy passing the url to your image to the same markup. `![](http://example.com/my-fancy-image.png)`. Of course you need a working Internet connection for that.  

---

## How To Use These Special Characters In Text?  

So sometimes you want to have \_underscores\_ around a word without them beeing converted to italic or bold. Or you want to use a plus sign at the beginning of a line but don't want a unordered list. You can escape them by using a backslash `\+`.  

These are the characters that can be escaped.

```text
\   backslash
`   backtick
*   asterisk
_   underscore
{}  curly braces
[]  square brackets
()  parentheses
#   hash mark
+   plus sign
-   minus sign (hyphen)
.   dot
!   exclamation mark
```
 
---


## Speaker notes

You can have speaker notes. Just enclose your text into standrad HTML comments and it will automagically appear in the "Speaker Notes" window.  

<!-- Isn't it great what computers can do for you -->


    <!-- Isn't it great what computers can do for you -->

---

## Emoji 💘 

We love emoji and so do you (we know it, all those little hearts you send to your boyfriend/girlfriend) so yeah. Emoji works. 🚀💥🦄 🌈

---
## Editor

> "Why can't I edit my [M↓] directly in frontal?"  
> Rock Strongo

Well there are so many good text editors out there we don't want to compete with them. Our editor of choice is [Sublime Text 3](https://www.sublimetext.com/3) but we can also recommend applications like [Atom](https://atom.io/), [Moeditor](https://github.com/Moeditor/Moeditor), [iAWriter](https://ia.net/) or [Marp](https://yhatt.github.io/marp/) (you can create slides with this one as well) and many more. We follow the unix philosophy. Do "One Thing Well". Writing an editor that can compete with the ones above is not in our scope.  

When you are editing in your editor you fell in love with - we got you covered. frontal will automagically refresh you slides on save and try to stay at the current slide. Of course if you add a new slide it wont work.  

---

## Advanced Editing

<p style="text-align:center">If the current CSS is not enough for you use good old html to edit your style. This paragraph for example is center aligned.</p>

This one is not. How is it done? We just added the following code:  

    <p style="text-align:center"> Some text </p>

Nifty, isn't it? In the future we want to have some custom CSS loading feature so you can have your own style.  

---

## Realted Projects  

There are a lot of nice Markdown presentation tools out there. So why did we write frontal? Well each tool has his disadvantages. Even frontal. We wrote this to have a tool that fits our needs and also to learn application development with electron. Check out the others and make your own choice.  


- [github.com/yhatt/marp](https://github.com/yhatt/marp/)  
- [github.com/ogom/sublimetext-markdown-slideshow](https://github.com/ogom/sublimetext-markdown-slideshow)  
- [remarkjs.com](http://remarkjs.com/#1)  
- [slidify.org](http://slidify.org/)  
- [jdan.github.io/cleaver](http://jdan.github.io/cleaver/#2)   
- [decksetapp.com](http://www.decksetapp.com/)  
- [swipe.to/markdown](https://www.swipe.to/markdown/)  


---

## FAQ

- Q: I added an image and some text and many more things to a slide. Now my Image at the top gets cut of. What can I do?
- A: Don't add that much content to a slide. This is a technical limitation we have. The slides get produced from the center. This is also a design decision. A slide with to much text is not good to keep the attention of your audience. (Trust us)
- Q: I want feature xy to work for me can you do this?
- A: No! (Or maybe. Write an [issue](https://github.com/frntl/frontal) on GitHub)  
- Q: Can I export this to Powerpoint or Keynote?  
- A: No.
- Q: I don't like how xy works. Pls change!
- A: No!
- Q: Why are you being a such a douchebag?
- A: Because open source projects tend to attract people who think that somebody who spends his time maintaining a free (as in beer) software he even has more time to fix their problems. 