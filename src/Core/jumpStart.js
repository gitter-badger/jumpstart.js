'strict'

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
	
		mobile: false,

		suppressNextError: false,

		guiAllowed: true,

		// Utility Functions.
		noop: util.noop,
		forEach: util.forEach,

		// Public modules.
		log: $log,
		event: $event,
		window: $window
	}

})();

// Expose JumpStart to the browser window.
if ( typeof window === "object" && typeof window.document === "object" ) {
	window['js'] = $js;
}
