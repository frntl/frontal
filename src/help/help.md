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

## Speaker notes

You can have speaker notes. Just enclose your text into standrad HTML comments and it will automagically appear in the "Speaker Notes" window.  

<!-- Isn't it great what computers can do for you -->


    <!-- Isn't it great what computers can do for you -->


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

<p style="text-align:center">If the display is not enough for you use good old html to edit your style (for now - custom CSS is one of the issues to tackle). This paragraph for example is center aligned.</p>

This one is not. How is it done? We just added the following code:  

    <p style="text-align:center"> Some text </p>

Nifty, isn't it?  

---

> Of course there are qoutes! They are done like this.  
> fabiantheblind

```text
> Of course there are qoutes! They are done like this.  
> fabiantheblind
```