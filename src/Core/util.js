'use strict';

/**
 * Utility functions module.
 * @module core
 *
 * Private module. Various utility functions.
 *
 */
var util = (function() {

  var uid = 1;

  return {

    /**
     * A function that performs no operations.
     */
    noop: function() {
    },

    /**
     * Returns a pre-instantiated object as a function.
     * @returns {*}
     */
    valueFn: function(value) {
      return function valueRef() {
        return value;
      };
    },

    /**
     * Get the next unique id.
     * @returns {number}
     */
    nextID: function() {
      return uid++;
    },

    /**
     * Check for HTML5 compatability.
     * @returns {boolean}
     */
    html5Check: function() {
      return $window.document.addEventListener;
    },

    /**
     * Check is the current display is mobile sized. Requires JQuery.
     * @returns {boolean}
     */
    isMobileDisplay: function() {
      return $($window).width() <= 650;
    },

    /**
     * Format a string.
     * @param {string} str - String to format.
     * @param {...*} args - Values to add to formatted string.
     * @returns {string}
     */
    formatString: function(str, args) {
      var a = arguments;
      return str.replace(/{(\d+)}/g, function(match, number) {
        return typeof a[+number + 1] !== 'undefined'
          ? a[+number + 1] : match;
      });
    },

    /**
     * Extend an object with another object.
     * @param {*} me - Object to extend.
     * @param {*} withthis - Object to extend with.
     * @returns {*}
     */
    extend: function(me, withthis) {
      if (withthis && me)
        for (var i in withthis) {
          if (typeof withthis[i] === 'object') {
            util.extend(me[i], withthis[i]);
          } else {
            me[i] = withthis[i];
          }
        }
      return me;
    },

    /**
     * Iterate through an array or object.
     * @param {*} obj - Object to iterate through.
     * @param {function} iterator - Iterator function to call.
     * @param {*} context - Context to run the iterator function.
     * @returns {*}
     */
    forEach: function(obj, iterator, context) {
      var key, length;
      if (obj) {
        if (Array.isArray(obj)) {
          var isPrimitive = typeof obj !== 'object';
          for (key = 0, length = obj.length; key < length; key++) {
            if (isPrimitive || key in obj) {
              iterator.call(context, obj[key], key, obj);
            }
          }
        } else if (obj.forEach && obj.forEach !== util.forEach) {
          obj.forEach(iterator, context, obj);
        } else if (typeof obj.hasOwnProperty === 'function') {
          for (key in obj)
            if (obj.hasOwnProperty(key))
              iterator.call(context, obj[key], key, obj);
        } else {
          for (key in obj)
            if (Object.prototype.hasOwnProperty.call(obj, key))
              iterator.call(context, obj[key], key, obj);
        }
      }
      return obj;
    },

    /**
     * Run a function and silence any errors.
     * @param {function} func - Function to run.
     */
    noThrow: function(func) {
      try {
        return func && func();
      } catch (e) { /* empty */ }
    },

    /**
     * Add an element (native).
     * @param {string} type - Element type to create.
     * @param {*} attributes - Attributes to add to the element.
     * @param {*} parentElement - Parent element to append to.
     * @returns {*}
     */
    addElement: function(type, attributes, parentElement) {

      var element = $window.document.createElement(type);

      if (attributes)
        for (var i in attributes)
          element.setAttribute(i, attributes[i]);

      parentElement.appendChild(element);
      return element;
    },

    /**
     * Show an alert dialog.
     * @param {string} msg - Message to display.
     * @param {Function} [callbackFn] - Callback function to execute after the dialog is dismissed.
     * @param {string} [title="Application Message"] - Title of the dialog.
     */
    message: function(msg, callbackFn, title) {
      
      // If there is no gui, just run the callback.
      if (!$js.guiAllowed) {
        if (callbackFn)
          $code.setZeroTimeout(callbackFn);
        return;
      }
      
      title = title || 'Application Message';
      
      // Fire the event.
      $event.fire('js.message', msg, callbackFn, title);
    },

    /**
     * Show a confirmation dialog.
     * @param {string} msg - Message to display.
     * @param {Function} [callbackFn] - Callback function to execute after the dialog is dismissed.
     * @param {string} [title="Application Confirmation"] - Title of the dialog.
     * @param {string} [yescaption="OK"] - Caption of the "yes" button.
     * @param {string} [nocaption="Cancel"] - Caption of the "no" button.
     */
    confirm: function(msg, callbackFn, title, yescaption, nocaption) {
        
      // If there is no gui, just run the callback.
      if (!$js.guiAllowed) {
        if (callbackFn)
          $code.setZeroTimeout(callbackFn);
        return;
      }
      
      title = title || 'Application Confirmation';
      
      // Fire the event.
      $event.fire('js.confirm', msg, callbackFn, title, yescaption, nocaption)
    },

    /**
     * Display an error and kill the current execution.
     * @param {*} msg - Message to display.
     * @param {...*} [args] - Arguments to merge into message.
     */
    error: function(msg, args) {

      msg = msg.message || msg;

      // Merge string.
      if (typeof msg === 'string') {
        var arr = [msg];
        util.forEach(arguments, function(a, i) {
          if (i > 0)
            arr.push(a);
        });
        msg = util.formatString.apply(null, arr);
      }

      browserProgress.hide();

      $log.error('Application Error: ' + msg);
      $event.fire('on.error', msg);
      $code.onerror();

      // Run error handling.
      if (!$js.suppressNextError) {

        // Run the event.
        $event.fire('js.error', msg);

        // Kill execution.
        throw new Error('ERROR_HANDLED');
      }

      $js.suppressNextError = false;
    },

    mergeTemplate: function(template, obj) {
      template = template.replace(/{{(.*?)}}/g, function(match, prop) {
        return typeof obj[prop] !== 'undefined'
          ? obj[prop] : match;
      });
      return $(template);
    }

  };

})();
