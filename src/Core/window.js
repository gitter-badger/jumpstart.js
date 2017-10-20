'use strict';

/**
 * A reference to the browsers window object. Allows us to mock the window during testing.
 * @type {Window}
 */
var $window = util.valueFn(window)();
