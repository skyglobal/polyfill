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

if (!Element.prototype.addEventListener) {
    Element.prototype.addEventListener = function(eventName, handler) {
        this.attachEvent('on' + eventName, handler);
    };
}

if (!Element.prototype.removeEventListener) {
    Element.prototype.removeEventListener = function(eventName, handler) {
        this.detachEvent('on' + eventName, handler);
    };
}
