# Polyfill

"Provides facilities that are not built into a web browser. It implements technology that a developer expects the browser to provide natively providing a more uniform API landscape." -- Unknown

## Usage

If you'd like all the polyfill, you can just include the `polyfill.js` (all the individual `.js` files in the `src` folder are concatenated into this one `.js` file).  Otherwise, you can cherrypick from the individual files/functions in `src`.

## Bower

You can also pull in the polyfill code using Bower:

`$ bower install --save-dev skyglobal-toolkit-polyfill`

then include `bower_components/skyglobal-toolkit-polyfill/polyfill.js` in your project's build/deploy script.

## Contribution

Add code to `/src` and then just run `Make` to generate the all-accompanying `polyfill.js`.
