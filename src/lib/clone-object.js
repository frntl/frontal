/**
 * clones an object
 * @param  {Object} o the object to clone
 * @return {Object}   the cloned object
 */
export function clone (o) {
  return JSON.parse(JSON.stringify(o));
}
