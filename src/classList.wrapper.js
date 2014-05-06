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

        function clean(list) {
            return list ? list.split(' ') : [];
        }
        var ClassList = function(element) {
            this.element  = element;
        };
        ClassList.prototype = [];
        ClassList.prototype.add = function() {
            var token = Array.prototype.slice.call(arguments);
            this.element[property] = tokenlist.apply(null, [this.element[property]].concat(token)).join(' ');
        };
        ClassList.prototype.remove = function(token) {
            this.element[property] = tokenlist.remove(this.element[property], token).join(' ');
        };
        ClassList.prototype.toggle = function(token, force) {
            var rst = tokenlist.toggle(this.element[property], token, force);
            this.element[property] = rst.list.join(' ');
            return rst.status;
        };
        ClassList.prototype.contains = function(str) {
            return tokenlist.contains(this.element[property], str);
        };
        ClassList.prototype.item = function(index) {
            return tokenlist.item(this.element[property], index);
        };
        getter = function() {
            return new ClassList(this);
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
