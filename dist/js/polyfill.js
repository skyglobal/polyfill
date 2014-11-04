
// ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fun /*, thisp */) {
    if (this === void 0 || this === null) { throw TypeError(); }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function") { throw TypeError(); }

    var thisp = arguments[1], i;
    for (i = 0; i < len; i++) {
      if (i in t) {
        fun.call(thisp, t[i], i, t);
      }
    }
  };
}


if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0){
            from += len;
        }
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}

function functionBind(){
    if (typeof Function.prototype.bind !=='undefined') { return; }
    Function.prototype.bind = function (oThis) {
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            FNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof FNOP && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        FNOP.prototype = this.prototype;
        fBound.prototype = new FNOP();
        return fBound;
    };
}

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}



// from Jonathan Neal's Gist https://gist.github.com/jonathantneal/3748027
!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
	WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
		var target = this;
 
        if (type === 'DOMContentLoaded') {
            type = 'readystatechange';
        }
                    
		registry.unshift([target, type, listener, function (event) {
			event.currentTarget = target;
			event.preventDefault = function () { event.returnValue = false };
			event.stopPropagation = function () { event.cancelBubble = true };
			event.target = event.srcElement || target;
 
			listener.call(target, event);
		}]);
 
		this.attachEvent("on" + type, registry[0][3]);
	};
 
	WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
		for (var index = 0, register; register = registry[index]; ++index) {
			if (register[0] == this && register[1] == type && register[2] == listener) {
				return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
			}
		}
	};
 
	WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
		return this.fireEvent("on" + eventObject.type, eventObject);
	};
})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);


window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty;

(function(exports) {

    var whichIE = exports.whichIE = (function() {
        var nav = navigator.appName,
            version = navigator.appVersion,
            ie = (nav == 'Microsoft Internet Explorer');
        if (ie) {
            var match = navigator.userAgent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
            version = match ? parseFloat(match[1]) : 0;
        }
        return {
            name:       nav,
            version:    version,
            ie:         ie,
            ie10:       (ie && version >= 10),
            ie9:        (ie && version >= 9 && version < 10),
            ie8:        (ie && version >= 8 && version < 9),
            ie7:        (ie && version >= 7 && version < 8),
            ie6:        (ie && version >= 6 && version < 7)
        };
    })();

})(this);