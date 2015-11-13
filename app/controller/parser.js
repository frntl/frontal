'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parser = parser;
exports.json = json;
exports.md = md;
function parser() {}

function json(data) {
	return JSON.parse(data);
}

function md(data) {
	var slides = data.split('\n---\n');

	return slides;
}

/*
	1. The parser receives the content of a text-file either json or markdown the switch between parser is determined by file-extension.
	var parser_md = function(){
		var parser = function(){
		//init
	}
		parser();
		parser.start = function(file_content){
		var slides = [
			{
				template: "title.html", //If this is not set it defaults to "index.html"
				title: "<h1>title content</h1>",
				content: "<ul><li>this</li><li>is one example of</li><li>markdown turned to html</li></ul>",
				img: '<img src="" />'
			}
		];
			return slides;
	}
		return parser;
};
	*/