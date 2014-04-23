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

        var ClassList = function(element) {
            this.element  = element;
        };
        ClassList.prototype = [];
        ClassList.prototype.add = function(token) {
            this.element[property] = tokenlist.add(this.element[property], token, ClassList.prototype).join(' ');
        };
        ClassList.prototype.remove = function(token) {
            this.element[property] = tokenlist.remove(this.element[property], token, ClassList.prototype).join(' ');
        };
        ClassList.prototype.toggle = function(token) {
            this.element[property] = tokenlist.toggle(this.element[property], token, ClassList.prototype).join(' ');
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
            view.Element.prototype.__defineGetter__('classListFoo', getter);
        }

    })(self);

}
