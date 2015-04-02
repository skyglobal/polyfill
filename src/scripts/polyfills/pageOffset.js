module.exports = function() {
    if (window.pageYOffset === undefined) {
        Object.defineProperty(window, "pageYOffset", {
            get : function () { return this.document.documentElement.scrollTop; }
        });
    }

    if (window.pageXOffset === undefined) {
        Object.defineProperty(window, "pageXOffset", {
            get : function () { return this.document.documentElement.scrollLeft; }
        });
    }
};
