#!/usr/bin/env node
const fs = require('fs');
let pre = `<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
    body {
  margin: 0 auto;
  max-width: 50em;
  font-family: mono;
  line-height: 1.5;
  padding: 4em 1em;
  color: #555;
  }
  code,
pre {
   background: #f5f7f9;
  border-bottom: 1px solid #642428;
  color: ##131618;


}

code {
  padding: 2px 4px;
  vertical-align: text-bottom;

}

pre {
  padding: 1em;
  border-left: 2px solid #E96368;
}
header{
  min-height:10em;
  background-image:url('./images/icon_256x256.png');
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
</head>
<body id="body">
<header id="header"></header>
<script>require('./help-renderer.js');</script>
<pre style="word-wrap: break-word; white-space: pre-wrap;">`;
let post = `</pre>
</body>
</html>`;
fs.readFile('./src/help/help.md', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    fs.writeFile('./src/help/help.html', pre + data + post, 'utf8', (error) => {
      if (error) {
        throw error;
      }
    });
  }
});
