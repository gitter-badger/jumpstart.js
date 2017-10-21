'use strict';

/**
 * Style module.
 * @module core
 *
 * Private module. Loads a style object into the browser as a style tag. Requires JQuery.
 *
 */
var style = (function() {

    function mergeSettings(val, settings) {

        util.forEach(settings.colors, function(item, key) {
            if (val.indexOf('%colors:' + key + '%') !== -1)
                val = val.replace('%colors:' + key + '%', item);
        });

        util.forEach(settings.font, function(item, key) {
            if (val.indexOf('%font:' + key + '%') !== -1)
                val = val.replace('%font:' + key + '%', item);
        });

        util.forEach(settings.images, function(item, key) {
            if (val.indexOf('%images:' + key + '%') !== -1)
                val = val.replace('%images:' + key + '%', item);
        });

        return val;
    }

    return {

        load: function(obj, settings) {

            // Create style tag.
            var style = $('<style>');

            // Loop through css classes.
            util.forEach(obj, function(cls, className) {

                var css = className + '{';
                var othercss = '';

                // Loop through styles in the class.
                util.forEach(cls, function(style, styleName) {

                    // Check for a multi style.
                    if (Array.isArray(style)) {
                        util.forEach(style, function(multistyle, msName) {
                            css += styleName + ': ' + mergeSettings(multistyle, settings) + ';';
                        });
                    } else if (styleName.indexOf && styleName.indexOf('@media') === 0) {
                        othercss += styleName + '{' + className + '{';
                        util.forEach(style, function(otherstyle, osName) {
                            othercss += osName + ': ' + mergeSettings(otherstyle, settings) + ';';
                        });
                        othercss += '}}';
                    } else {
                        css += styleName + ': ' + mergeSettings(style, settings) + ';';
                    }
                });

                css += '}' + othercss;
                style.append(css);
            });

            // Add the style tag to head.
            style.appendTo($('head'));
        }
    };

})();
