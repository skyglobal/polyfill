if (document.getElementsByClassName  === 'undefined') {

    document.getElementsByClassName = function (search) {
        var d = document, elements, pattern, i, results = [];
        if (d.querySelectorAll) { // IE8
            return d.querySelectorAll("." + search);
        }
        if (d.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = d.evaluate(pattern, d, null, 0, null);
            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = d.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
            for (i = 0; i < elements.length; i++) {
                if (pattern.test(elements[i].className)) {
                    results.push(elements[i]);
                }
            }
        }
        return results;
    }
};

if(typeof document.querySelector === 'undefined') {

        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };

        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };

};
if (!document.addEventListener) {
    document.addEventListener = function(eventName, handler) {
        if (eventName === 'DOMContentLoaded') {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState === 'interactive' || document.readyState === 'complete') {
                    handler();
                 }
            });
        } else {
            document.attachEvent('on' + eventName, handler);
        }
    };
}

if (window.Element && !Element.prototype.addEventListener) {
    Element.prototype.addEventListener = function(eventName, handler) {
        this.attachEvent('on' + eventName, handler);
    };
}

if (window.Element && !Element.prototype.removeEventListener) {
    Element.prototype.removeEventListener = function(eventName, handler) {
        this.detachEvent('on' + eventName, handler);
    };
}

if (!window.Element) {
    // IE8 and below
    var createElement = document.createElement;
    document.createElement = function(tagName) {
        var el = createElement(tagName);
        el.addEventListener = function(eventName, handler) {
            this.attachEvent('on' + eventName, handler);
        }
        el.removeEventListener = function(eventName, handler) {
            this.detachEvent('on' + eventName, handler);
        }
        return el;
    }
    var getElementById = document.getElementById;
    document.getElementById = function(id) {
        var el = getElementById(id);
        el.addEventListener = function(eventName, handler) {
            this.attachEvent('on' + eventName, handler);
        }
        el.removeEventListener = function(eventName, handler) {
            this.detachEvent('on' + eventName, handler);
        }
        return el;
    }
    var getElementByTagName = document.getElementByTagName;
    document.getElementByTagName = function(tagName) {
        var el = getElementByTagName(tagName);
        el.addEventListener = function(eventName, handler) {
            this.attachEvent('on' + eventName, handler);
        }
        el.removeEventListener = function(eventName, handler) {
            this.detachEvent('on' + eventName, handler);
        }
        return el;
    }
}
// Adding trim to string
if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}



