var polyfill = require('./polyfill');

if (typeof toolkit === "undefined") window.toolkit = {};
if (typeof window.define === "function" && window.define.amd) {
    define('bower_components/bskyb-polyfill/dist/js/polyfill', [], function() {
        'use strict';
        return polyfill;
    });
} else {
    toolkit.polyfill = polyfill;
}