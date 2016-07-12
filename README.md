# frontal  

Markdown powered presentation tool build on Electron / Node.js  

## dependencies  

- [https://github.com/creationix/nvm](https://github.com/creationix/nvm)  

## installation 
Init the project by running:  

```bash
#install nodejs
nvm install 4.2.2  
# or using homebrew 
brew install homebrew/versions/node4-lts
git@github.com:frntl/frontal.git && cd frontal
nvm use
npm install --global babel-cli mocha
npm install

```
## execute

    npm start

## development  

To write nice ES2015 style we use babel. Therefore we need to watch the whole `src` and compiel it to `app`. Run it like this in the root of the directory:  

    npm run watch

## tests

To run the tests {3 :-)} just do a  

    npm test


@Todo: Add gulp build and watch process for restarting the app as well.