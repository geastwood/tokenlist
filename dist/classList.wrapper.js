/* global self */
if ("document" in self && !("classListFoo" in document.createElement("_"))) {

    (function(view) {

        'use strict';

        var descriptor,
            getter,
            property = 'className',
            method = 'classListFoo';

        if (!('Element' in view)) return;

        /* injector:js */
        /* endinjector */

        if (Object.defineProperty) {

            getter = function() {
                var that = this;
                var rtn = {
                    add: function(str) {
                        that[property] = tokenlist.add(that[property], str);
                        this.length += 1;
                    },
                    remove: function(str) {
                        that[property] = tokenlist.remove(that[property], str);
                        this.length -= 1;
                    },
                    toggle: function(str) {
                        that[property] = tokenlist.toggle(that[property], str);
                    },
                    contains: function(str) {
                        return tokenlist.contains(that[property], str);
                    },
                    item: function(index) {
                        return tokenlist.item(that[property], index);
                    }
                };
                Object.defineProperty(rtn, 'length', {
                    get: function() {
                        return that[property] ? that[property].split(' ').length : 0;
                    },
                    set: function() {}
                });
                return rtn;
            };
            descriptor = {
                get: getter,
                enumerable: true,
                configurable: true
            };

            try {
                Object.defineProperty(view.Element.prototype, method, descriptor);
            } catch (ex) {// IE 8 doesn't support enumerable:true
                if (ex.number === -0x7FF5EC54) {
                    descriptor.enumerable = false;
                    Object.defineProperty(view.Element.prototype, method, descriptor);
                }
            }
        } else if (Object.prototype.__defineGetter__) {
            view.Element.prototype.__defineGetter__('classListFoo', getter);
        }


    })(self);

}
