if (!Element.prototype.addEventListener) {
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
    Element.prototype.addEventListener = function(eventName, handler) {
        this.attachEvent('on' + eventName, handler);
    };
    Element.prototype.removeEventListener = function(eventName, handler) {
        this.detachEvent('on' + eventName, handler);
    };
}
