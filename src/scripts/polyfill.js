require('./polyfills/Element')();
require('./polyfills/events')();
require('./polyfills/hasOwnProperty')();
require('./polyfills/String')();
require('./polyfills/whichIE')();
require('./polyfills/pageOffset.js')();
require('./polyfills/rAF.js')();

if (typeof define === 'function' && define.amd && typeof exports === 'object') {
    var oldAmd = define.amd;
    delete define.amd;

    require('es5-shim/es5-shim');
    require('es5-shim/es5-sham');

    define.amd = oldAmd;
} else {
    require('es5-shim/es5-shim');
    require('es5-shim/es5-sham');
}

module.exports = {};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents.polyfill = module.exports;
