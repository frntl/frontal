#!/usr/bin/env node

const fs = require('fs');
let pre = `<html>
<head>
<meta charset="UTF-8">
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
