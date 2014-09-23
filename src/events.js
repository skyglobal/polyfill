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
