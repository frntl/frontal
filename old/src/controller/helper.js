
export function helper (){
  // nothing her yet
}

/*
 * merging two objects
 * @param  destination{object} - object #1
 * @param  source{object} - object #2
 * @return {object}
 */
export function extend (destination, source) {
	var returnObj = {};
	for (var attrname in destination) {
		returnObj[attrname] = destination[attrname];
	}
	for (attrname in source) {
		returnObj[attrname] = source[attrname];
	}
	return returnObj;
}