This will no longer be deveoloped. There are so many fancy solutions out there. Also I learned for myself that creating a rich and awesome presentation needs more then markup. 

# frontal

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]() [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/frntl/frontal) ![](https://img.shields.io/badge/build%20with-%E2%9D%A4-brightgreen.svg) [![Code Climate](https://codeclimate.com/github/frntl/frontal/badges/gpa.svg)](https://codeclimate.com/github/frntl/frontal) [![Test Coverage](https://codeclimate.com/github/frntl/frontal/badges/coverage.svg)](https://codeclimate.com/github/frntl/frontal/coverage) [![Issue Count](https://codeclimate.com/github/frntl/frontal/badges/issue_count.svg)](https://codeclimate.com/github/frntl/frontal)  

Markdown powered presentation tool build on Electron / Node.js  

---

Grab a build from [here](https://github.com/frntl/frontal/releases). Be aware that this is a pre-release. There might be 🐛 🐉.  

---

![](docs/images/main-window.png)  
![](docs/images/speaker-window.png)  

---

## Installation & run

Init the project by running:  

```bash
#install nodejs using homebrew 
brew install node
git clone git@github.com:frntl/frontal.git && cd frontal
# if you use nvm you can run
# nvm use
# if you are using mert you can run
# mert start
npm install
npm start
```

---

## Development  



To write nice ES2015 style we use babel. Therefore we need to watch the whole `src/` and compile it to `app`. Run it like this in the root of the directory (additional files in the src folder will also be copied by babel into the `app/` folder):  

    npm run watch

To write on the default theme scss you can run

    npm run sassdefault

---

### Installing Additional Modules  

For packing the app we use the [`electron-builder`](https://github.com/electron-userland/electron-builder) package. Therefor we have two package.json files. If you want to add another module (currently - will be improved) you will need to:  

    # dont do this while the watch task is running!
    cd app/
    npm install [your-module] --save && cat package.json ../src/package.json
    

---

## tests

To run the tests just do a  

    npm test


---

## build  

For buildung the distribution version we use the [`electron-builder`](https://github.com/electron-userland/electron-builder) package. To make this work we have two package.json files. One in the root for development (devDependencies) and one in the `src/` folder for distribution. Run  

    npm run dist

for building the package

---

## Related projects:

- [github.com/yhatt/marp](https://github.com/yhatt/marp/)  
- [github.com/ogom/sublimetext-markdown-slideshow](https://github.com/ogom/sublimetext-markdown-slideshow)  
- [remarkjs.com](http://remarkjs.com/#1)  
- [slidify.org](http://slidify.org/)  
- [jdan.github.io/cleaver](http://jdan.github.io/cleaver/#2)   
- [decksetapp.com](http://www.decksetapp.com/)  
- [swipe.to/markdown](https://www.swipe.to/markdown/)  
- [ycosxapp.github.io](https://ycosxapp.github.io/)

So why writing another app for this task? Well on the one hand it is for learning application development with electron. On the other hand we started this because all the other options did have one or the other thing that we didn't like. (And because we can)
