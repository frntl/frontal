# frontal  

Markdown powered presentation tool build on Electron / Node.js  

## dependencies  

- [https://github.com/creationix/nvm](https://github.com/creationix/nvm)  

## installation 
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

## execute

    npm start

## development  

To write nice ES2015 style we use babel. Therefore we need to watch the whole `src` and compile it to `app`. Run it like this in the root of the directory:  

    npm run watch

To write on the scss you can run

    npm run sass


## tests

To run the tests just do a  

    npm test


## Related projects:

- [github.com/yhatt/marp](https://github.com/yhatt/marp/)  
- [github.com/ogom/sublimetext-markdown-slideshow](https://github.com/ogom/sublimetext-markdown-slideshow)  
- [remarkjs.com](http://remarkjs.com/#1)  
- [slidify.org](http://slidify.org/)  
- [jdan.github.io/cleaver](http://jdan.github.io/cleaver/#2)   
- [decksetapp.com](http://www.decksetapp.com/)  
- [swipe.to/markdown](https://www.swipe.to/markdown/)  

So why writing another app for this task? Well on the one hand it is for learning application development with electron. On the other hand we started this because all the other options did have one or the other thing that we didn't like. (And because we can)
