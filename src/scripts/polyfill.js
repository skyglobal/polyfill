require('./polyfills/Array')();
require('./polyfills/Element')();
require('./polyfills/events')();
require('./polyfills/Function')();
require('./polyfills/hasOwnProperty')();
require('./polyfills/Object')();
require('./polyfills/String')();
require('./polyfills/whichIE')();
require('./polyfills/pageOffset.js')();
require('./polyfills/rAF.js')();
require('./polyfills/Date.js')();

module.exports = {};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents.polyfill = module.exports;
