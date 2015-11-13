import * as parser from "./parser";

// let res = parser.md("## test");
let res = parser.json('{"one":"two"}');
console.log(res);