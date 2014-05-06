/* global self */
if ("document" in self && !("classList" in document.createElement("_"))) {

    (function(view) {

        'use strict';

        var descriptor,
            getter,
            property = 'className',
            method = 'classList';

        if (!('Element' in view)) return;

        /* injector:js */
        /* endinjector */

        getter = function() {
            var tokenlist = new TokenList();
            tokenlist.registerCallback(function(list) {
                this[property] = list.join(' ');
            }, this);
            return tokenlist;
        };

        if (Object.defineProperty) {

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
            view.Element.prototype.__defineGetter__('classList', getter);
        }

    })(self);

}
