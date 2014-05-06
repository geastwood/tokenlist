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

        //bind(tokenlist, list)
        getter = function() {
            var list = this[property] ? this[property].split(' ') : [];
            var tokenlist = new TokenList();
            var methods = ['add', 'remove', 'toggle', 'contains', 'item', 'registerCallback'];
            for (var i = 0, len = methods.length; i < len; i++) {
                list[methods[i]] = tokenlist[methods[i]];
            }
            list.registerCallback(function(list) {
                this[property] = list.join(' ');
            }, this);

            return list;
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
