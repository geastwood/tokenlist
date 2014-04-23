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
        // TODO: duplicate loop
var tokenlist = (function() {

    'use strict';

    var service = {
        clean: function(token) {

            /* jshint eqnull: true */
            if (token == null) {
                return '';
            }
            return token.replace(/^\s+|\s+$/g, '');
        }
    };

    var factory = function(list, token, type, refArr) {

        // trim the input
        list = service.clean(list);
        token = service.clean(token);

        // split to array
        var listArr = list ? list.split(/\s+/): [];

        var map = {
            add: function(list, token) {
                list.push(token);
                return list;
            },
            remove: function(list, token) {

                var i, len;

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] === token) {
                        list.splice(i, 1);
                    }
                }

                return list;
            },
            exsits: function(list, token) {

                var i, len;

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] === token) {
                        return true;
                    }
                }

                return false;
            },
            item: function(t) {

                return function(index) {
                    return t[index];
                };
            }
        };

        return map[type](refArr || listArr, token);
    };

    return {

        add: function(list, token, refArr) {
            return factory(list, token, 'add', refArr);
        },
        remove: function(list, token, refArr) {
            return factory(list, token, 'remove', refArr);
        },
        toggle: function(list, token, refArr) {
            return factory(list, token, this.contains(list, token) ? 'remove' : 'add', refArr);
        },
        contains: function(list, token) {
            return factory(list, token, 'exsits');
        },
        item: function(list, index) {
            return factory(list, null, 'item')(index);
        }
    };

}());

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
