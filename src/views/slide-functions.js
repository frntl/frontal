// some slide specific functions
import {
  imagesLeft
} from './utils/images';
const $ = require('jquery');
$('#slides').bind('DOMSubtreeModified', imagesLeft);
