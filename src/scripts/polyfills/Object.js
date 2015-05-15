// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
module.exports = function() {
    if (!Object.keys) {
        Object.keys = ( function() {
                'use strict';
                var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !( {
                    toString : null
                }).propertyIsEnumerable('toString'), dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'], dontEnumsLength = dontEnums.length;

                return function(obj) {
                    if ( typeof obj !== 'object' && ( typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }

                    var result = [], prop, i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }

                    if (hasDontEnumBug) {
                        for ( i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                };
            }());
    }

    //
    // ES5 15.2.3.9
    // http://es5.github.com/#x15.2.3.9
    if (!Object.freeze) {
        Object.freeze = function freeze(object) {
            if (Object(object) !== object) {
                throw new TypeError('Object.freeze can only be called on Objects.');
            }
            // this is misleading and breaks feature-detection, but
            // allows "securable" code to "gracefully" degrade to working
            // but insecure code.
            return object;
        };
    }

    // detect a Rhino bug and patch it
    try {
        Object.freeze(function() {
        });
    } catch (exception) {
        Object.freeze = ( function freeze(freezeObject) {
                return function freeze(object) {
                    if ( typeof object === 'function') {
                        return object;
                    } else {
                        return freezeObject(object);
                    }
                };
            }(Object.freeze));
    }
    //
    // ES5 15.2.3.5
    // http://es5.github.com/#x15.2.3.5
    if (!Object.create) {

        // Contributed by Brandon Benvie, October, 2012
        var createEmpty;
        var supportsProto = !( {
            __proto__ : null
        } instanceof Object);
        // the following produces false positives
        // in Opera Mini => not a reliable check
        // Object.prototype.__proto__ === null
        /*global document */
        if (supportsProto || typeof document === 'undefined') {
            createEmpty = function() {
                return {
                    __proto__ : null
                };
            };
        } else {
            // In old IE __proto__ can't be used to manually set `null`, nor does
            // any other method exist to make an object that inherits from nothing,
            // aside from Object.prototype itself. Instead, create a new global
            // object and *steal* its Object.prototype and strip it bare. This is
            // used as the prototype to create nullary objects.
            createEmpty = function() {
                var iframe = document.createElement('iframe');
                var parent = document.body || document.documentElement;
                iframe.style.display = 'none';
                parent.appendChild(iframe);
                /*eslint-disable no-script-url */
                iframe.src = 'javascript:';
                /*eslint-enable no-script-url */
                var empty = iframe.contentWindow.Object.prototype;
                parent.removeChild(iframe);
                iframe = null;
                delete empty.constructor;
                delete empty.hasOwnProperty;
                delete empty.propertyIsEnumerable;
                delete empty.isPrototypeOf;
                delete empty.toLocaleString;
                delete empty.toString;
                delete empty.valueOf;
                /*eslint-disable no-proto */
                empty.__proto__ = null;
                /*eslint-enable no-proto */

                var Empty = function Empty() {
                };
                Empty.prototype = empty;
                // short-circuit future calls
                createEmpty = function() {
                    return new Empty();
                };
                return new Empty();
            };
        }

        Object.create = function create(prototype, properties) {

            var object;
            var Type = function Type() {
            };
            // An empty constructor.

            if (prototype === null) {
                object = createEmpty();
            } else {
                if ( typeof prototype !== 'object' && typeof prototype !== 'function') {
                    // In the native implementation `parent` can be `null`
                    // OR *any* `instanceof Object`  (Object|Function|Array|RegExp|etc)
                    // Use `typeof` tho, b/c in old IE, DOM elements are not `instanceof Object`
                    // like they are in modern browsers. Using `Object.create` on DOM elements
                    // is...err...probably inappropriate, but the native version allows for it.
                    throw new TypeError('Object prototype may only be an Object or null');
                    // same msg as Chrome
                }
                Type.prototype = prototype;
                object = new Type();
                // IE has no built-in implementation of `Object.getPrototypeOf`
                // neither `__proto__`, but this manually setting `__proto__` will
                // guarantee that `Object.getPrototypeOf` will work as expected with
                // objects created using `Object.create`
                /*eslint-disable no-proto */
                object.__proto__ = prototype;
                /*eslint-enable no-proto */
            }

            if (properties !==
            void 0) {
                Object.defineProperties(object, properties);
            }

            return object;
        };
    }
}; 