#!/usr/bin/env node

const fs = require('fs');
let pre = `<html>
<head>
<meta charset="UTF-8">
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
  border-bottom: 1px solid #d8dee9;
  color: ##131618;


}

code {
  padding: 2px 4px;
  vertical-align: text-bottom;

}

pre {
  padding: 1em;
  border-left: 2px solid #69c;
}
</style>
</head>
<body>
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
