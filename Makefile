build:
	rm -f .dist/polyfill.js
	cat ./src/*.js > ./dist/polyfill.js