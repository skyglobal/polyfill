module.exports = function() {

    if ( typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    if ( typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    
    // ES5 15.2.3.9
    // http://es5.github.com/#x15.2.3.9
    if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {( function() {
                var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined';
                // NPCG: nonparticipating capturing group

                StringPrototype.split = function(separator, limit) {
                    var string = this;
                    if ( typeof separator === 'undefined' && limit === 0) {
                        return [];
                    }

                    // If `separator` is not a regex, use native split
                    if (!isRegex(separator)) {
                        return string_split.call(this, separator, limit);
                    }

                    var output = [];
                    var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + // Proposed for ES6
                    (separator.sticky ? 'y' : ''), // Firefox 3+
                    lastLastIndex = 0,
                    // Make `global` and avoid `lastIndex` issues by working with a copy
                    separator2, match, lastIndex, lastLength;
                    var separatorCopy = new RegExp(separator.source, flags + 'g');
                    string += '';
                    // Type-convert
                    if (!compliantExecNpcg) {
                        // Doesn't need flags gy, but they don't hurt
                        separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
                    }
                    /* Values for `limit`, per the spec:
                     * If undefined: 4294967295 // Math.pow(2, 32) - 1
                     * If 0, Infinity, or NaN: 0
                     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
                     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
                     * If other: Type-convert, then use the above rules
                     */
                    var splitLimit = typeof limit === 'undefined' ? -1 >>> 0 : // Math.pow(2, 32) - 1
                    ES.ToUint32(limit);
                    match = separatorCopy.exec(string);
                    while (match) {
                        // `separatorCopy.lastIndex` is not reliable cross-browser
                        lastIndex = match.index + match[0].length;
                        if (lastIndex > lastLastIndex) {
                            output.push(string.slice(lastLastIndex, match.index));
                            // Fix browsers whose `exec` methods don't consistently return `undefined` for
                            // nonparticipating capturing groups
                            if (!compliantExecNpcg && match.length > 1) {
                                /*eslint-disable no-loop-func */
                                match[0].replace(separator2, function() {
                                    for (var i = 1; i < arguments.length - 2; i++) {
                                        if ( typeof arguments[i] === 'undefined') {
                                            match[i] =
                                            void 0;
                                        }
                                    }
                                });
                                /*eslint-enable no-loop-func */
                            }
                            if (match.length > 1 && match.index < string.length) {
                                array_push.apply(output, match.slice(1));
                            }
                            lastLength = match[0].length;
                            lastLastIndex = lastIndex;
                            if (output.length >= splitLimit) {
                                break;
                            }
                        }
                        if (separatorCopy.lastIndex === match.index) {
                            separatorCopy.lastIndex++;
                            // Avoid an infinite loop
                        }
                        match = separatorCopy.exec(string);
                    }
                    if (lastLastIndex === string.length) {
                        if (lastLength || !separatorCopy.test('')) {
                            output.push('');
                        }
                    } else {
                        output.push(string.slice(lastLastIndex));
                    }
                    return output.length > splitLimit ? output.slice(0, splitLimit) : output;
                };
            }());

        // [bugfix, chrome]
        // If separator is undefined, then the result array contains just one String,
        // which is the this value (converted to a String). If limit is not undefined,
        // then the output array is truncated so that it contains no more than limit
        // elements.
        // "0".split(undefined, 0) -> []
    } else if ('0'.split(void 0, 0).length) {
        StringPrototype.split = function split(separator, limit) {
            if ( typeof separator === 'undefined' && limit === 0) {
                return [];
            }
            return string_split.call(this, separator, limit);
        };
    }

};
