if ("document" in self && !("classList" in document.createElement("_"))) {

    (function(view) {

        'use strict';
        var descriptor, getter;

        if (!('Element' in view)) return;

        /* injector:js */
        /* endinjector */

        if (Object.defineProperty) {

            getter = function() {
                var that = this;
                return {
                    add: function(str) {
                        that.className = tokenlist.add(that.className, str);
                    },
                    remove: function(str) {
                        that.className = tokenlist.remove(that.className, str);
                    },
                    toggle: function(str) {
                        that.className = tokenlist.toggle(that.className, str);
                    },
                    contains: function(str) {
                        return tokenlist.contains(that.className, str);
                    },
                    item: function(index) {
                        return tokenlist.item(that.className, index);
                    }
                };
            };
            descriptor = {
                get: getter,
                enumerable: true,
                configurable: true
            };

            try {
                Object.defineProperty(view.Element.prototype, 'classList', descriptor);
            } catch (ex) {// IE 8 doesn't support enumerable:true
                if (ex.number === -0x7FF5EC54) {
                    descriptor.enumerable = false;
                    Object.defineProperty(view.Element.prototype, 'classList', descriptor);
                }
            }
        } else if (Object.prototype.__defineGetter__) {
            view.Element.prototype.__defineGetter__('classList', getter);
        }


    })(self);

}
