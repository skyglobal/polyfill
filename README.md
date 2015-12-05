# Polyfill [![Build Status](https://snap-ci.com/skyglobal/polyfill/branch/master/build_image)](https://snap-ci.com/skyglobal/polyfill/branch/master)

> "Provides facilities that are not built into a web browser. It implements technology that a developer expects the browser to provide natively providing a more uniform API landscape." -- Unknown

Goal: You should code using standard JavaScript as normal as you would on any non-IE browser, and this polyfill should fill in the rest for you by magic! :)

## Quick-Start

Include the Polyfill assets in your project either as **Static Resources**

```html
<script src="https://web-toolkit.global.sky.com/components/polyfill/0.4.1/polyfill.min.js"></script>
```

or via **NPM** (recommended)

```sh
npm install --save-dev git+ssh://git@github.com:skyglobal/polyfill.git#v0.4.1
```

you can then require it inside of your modules if you use a tool such as browserify or webpack

```js
require('polyfill/src/scripts/polyfill');
```

## Contribution

Components depends on collaboration between developers. Contributions of any size are actively encouraged.

To see how to build this component locally, read the [contribution guidelines](CONTRIBUTING.md).
