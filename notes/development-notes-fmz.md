# development Notes

about my module:  
It exports 3 Things:

    parser.json(data)
    parser.md2json(data)
    parser.md2html(data) 

to use it in a es6 way (if you are in /src/main.js)

```js
    import * as parser from './controller/parser';
    // or like this (not verified)
    import {md2json} from './controller/parser';
```

