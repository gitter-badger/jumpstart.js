'use strict';

/**
 * Jump Start Module
 * @module core
 *
 * Global module that exposes all other modules and utility functions.
 *
 */
var $js = (function() {
	
	return {

		/**
		 * Version info for JumpStart.
		 * @type {object}
		 */
		version: {
			// These placeholder strings will be replaced by grunt's `build` task.
			full: '"JS_VERSION_FULL"'
		},
	
	    /**
	     * Puts the app in mobile mode.
	     */
		mobile: false,

        /**
         * Suppress the next error thrown.
         */
		suppressNextError: false,

        /**
         * Hide UI events.
         */
		guiAllowed: true,

		// Utility Functions.
		noop: util.noop,
		valueFn: util.valueFn,
		nextID: util.nextID,
		html5Check: util.html5Check,
		isMobileDisplay: util.isMobileDisplay,
		formatString: util.formatString,
		extend: util.extend,
		forEach: util.forEach,
		noThrow: util.noThrow,
		addElement: util.addElement,
		message: util.message,
		confirm: util.confirm,
		error: util.error,

		// Public modules.
		log: $log,
		event: $event,
		window: $window
	}

})();

// Expose JumpStart to the browser window.
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.$js = $js;
}
