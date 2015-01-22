document.body.innerHTML = __html__['_site/index.html'];

var polyfill = skyComponents['polyfill'];

//{{ component }}.init(); //live events don't init for karma, so init them here if you need to

describe('polyfill module can ', function () {

    it('sum an array of numbers', function () {

        //expect(polyfill.sum([1,2,3])).toBe(6);

    });

});