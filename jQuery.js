(function jQuery_IIFE(global, factory) {

    // Some checks on the global context and then call actual library code
    factory(global);

})(window, function(window) {

    // Intialize the base jQuery object which just a constructor function of the 'jQuery.fn.init'
    var jQuery = function(selector) {
        return new jQuery.fn.init(selector);
    };

    // Initiliaze the jQuery.fn which is just refers to jQuery prototype
    // jQuery.fn can be used as a shortcut for jQuery.prototype
    jQuery.fn = jQuery.prototype = {
        // jQuery puts always the version number in 'jquery' property in the prototype
        jquery: "3.5.1",

        // Why adding a length property ?
        // The length property gives you the length of the selected DOM elements in the jQuery object
        // So when we do $('li').length we call actually this property 
        length: 0,

        // Redefine the constructor function allowing construnctor name to be the same as function name
        constructor: jQuery,

        each: function(clb) {
            // Trigger the actuall jQuery.each function and returns the its result
            return jQuery.each(this, clb);
        },

        text: function(string) {   
            this[0].textContent = string;
        },

        // The method returns a specific element by index, and if no index giving then all selected 
        // DOM elements will returned in a clean array 
        get: function(i) {
            if (typeof i !== 'number') {
                return Array.prototype.slice.call(this);
            }

            return this.length > 0 ? this[i] : null; 
        },

        // Define the splice function
        // The splice function let the jQuery selector $ to be logged as an array in the console
        splice: Array.prototype.splice,
        // ...
    };

    var init = jQuery.fn.init = function(selector) {
        // Sizzle now take it turn and handles the selector string and returns an array 
        // of the isolated DOM elements
        // for the demonstration purposes i will use just the native document.querySelectorAll
        if (typeof selector === 'string') {
            var eles = document.querySelectorAll(selector), 
                i = this.length = eles.length;

            while(i--) {
                this[i] = eles[i];
            }
        } 

        if (selector instanceof Node) {
            this[0] = selector;
            this.length = 1;
        }
    };

    // Is array or array-like object ?
    var isArray = jQuery.isArray = function(arr) {
        return arr.constructor.name === 'Array' || arr.length && typeof arr.length === 'number';
    };

    // Intilialize the '$.function' functions
    jQuery.each = function(obj, clb) {
        if (isArray(obj)) {
            var i = obj.length;
            while(i--) {
                if (!clb.call(obj[i])) break; 
            }
        } else {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (typeof prop === 'number') 
                        if (!clb.call(obj[prop])) break;;
                }
            }
            return obj;
        }
    };

    jQuery.noop = function() {};
    //..    

    // Assign the jQuery.fn.init prototype to jQuery prototype that contains the API methods
    init.prototype = jQuery.prototype;

    // Expose the jQuery object to the global object
    window.jQuery = window.$ = jQuery;
});