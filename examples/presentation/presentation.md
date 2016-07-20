# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

_This is a italic._ __This is bold.__ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
There is a comment in here
<!-- comment 1 slide 1 -->
<!-- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. -->

---

## Images  

![](http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg)  

---
## Images  

![](http://i.giphy.com/xTiTnhMOQ4zE0ukz2U.gif)  

---

## an image relativ to the markdown file
![some text](me-fro.png)  
And some more text.  

---

# Foobahr 

## this is a bit longer headline 2 lets see whats happens
There is a comment  

<!--
## comment 1 on slide
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  

    code?
-->

---

## Text in code  

    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


---

# [LINK in headline](http://example.com)   

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. [link](http://example.com) in text. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
---

## Code below should be executed

<div onload="writeit();">
<script type="text/javascript">
function writeit(){
document.open();
document.write("<h1>writen by JS</h1>");
document.close();
}
</script>
</div>


---

# Syntaxhighlighting  

    this is normal code block

```js
// this is a ```js codebl
let value = 5;
console.log(`${value} times hello my friend`);
```

---

## This is a table:  

| Heading   | another one    |
| :--       | :--            |
| something | something else |
| more      | even more      |
| duck      | dog            |
| junk      | food           |
| hello     | world               |


---

# Some random quote

> So they have Internet on computers now?    
> - Homer Jay Simpson


---

## some unordered list

- item 1
- item 2
- - nested item 1
- - nested item 2
- item 3


---

## and a ordered list

1. one
2. two
3. three
4. four
5. - four one
