import * as fs from 'fs';

//Presentation object
export var presentation = {
	type:'md|json',
	path:null,
	file:null,
	slides:null
};

//Validate folder and open it
export function open (path) {
	//Validate if selected folder contains all required elements for a frontal slide folder
	/*
		We accept:
			xyz.md
			xyz.json
			folder/xyz.md
			folder/xyz.json
		we do not accept:
			folder/package.json
	*/

	//Test if path is a folder
	var extension;
	if(fs.lstatSync(path).isDirectory()){
		//Loop through the folder
		var presentation_file = null;
		fs.readdirSync(path).forEach(function(file){
			//Ignore sub-folders
			if(!fs.lstatSync(path+'/'+file).isDirectory()){
				//Ignore package and readme files (npm/git support)
				if((file.toLowerCase() !== 'package.json')&&(file.toLowerCase() !== 'readme.md')){
					extension = file.substring(file.lastIndexOf(".")+1).toLowerCase();
					if((extension === 'md')||(extension === 'json')){
						presentation_file = file;
					}
				}
			}
		});

		if(presentation_file !== null){
			path = path+'/'+presentation_file;
		}else{
			global.error("No presentation file found in: ",path);
		}

	}

	if(fs.existsSync(path)&&(!fs.lstatSync(path).isDirectory())){

		presentation.type = path.substring(path.lastIndexOf(".")+1).toLowerCase();
		presentation.file = path.substring(path.lastIndexOf('/')+1);
		presentation.path = path.substring(0, (path.length-presentation.file.length));
		var presentation_data = fs.readFileSync(path);

		if(presentation.type === 'md'){
			presentation.slides = parser.md(presentation_data);

		}else if(presentation.type === 'json'){
			presentation.slides = parser.json(presentation_data);

		}else{
			global.error("Unsupported file type: ",path);
		}
	}

	console.log(presentation);

	//Set current slideshow path to this path
	//Switch to presentation mode if not already in presentation mode
};