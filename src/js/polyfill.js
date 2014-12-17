require('./polyfills/Array')();
require('./polyfills/events')();
require('./polyfills/Function')();
require('./polyfills/hasOwnProperty')();
require('./polyfills/String')();
require('./polyfills/whichIE')();


if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents.polyfill = {

};