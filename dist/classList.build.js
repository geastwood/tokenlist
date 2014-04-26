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

    var factory = function(list, token, type) {

        // trim the input
        list = service.clean(list);
        token = service.clean(token);

        // split to array
        var listArr = list ? list.split(/\s+/): [];

        var map = {
            add: function(list, token) {

                var status = false;

                if (!this.exists(list, token)) {
                    list.push(token);
                    status = true;
                }

                return {
                    status: status,
                    list: list
                };
            },
            remove: function(list, token) {

                var i, len, status = false;

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] === token) {
                        list.splice(i, 1);
                        status = true;
                    }
                }

                return {
                    status: !status,
                    list: list
                };
            },
            exists: function(list, token) {

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

        return map[type](listArr, token);
    };

    return {

        add: function(list, token) {
            return factory(list, token, 'add').list;
        },
        remove: function(list, token) {
            return factory(list, token, 'remove').list;
        },
        toggle: function(list, token) {
            return factory(list, token, this.contains(list, token) ? 'remove' : 'add').status;
        },
        contains: function(list, token) {
            return factory(list, token, 'exists');
        },
        item: function(list, index) {
            return factory(list, null, 'item')(index);
        }
    };

}());

        /* endinjector */

        function clean(list) {
            return list ? list.split(' ') : [];
        }
        var ClassList = function(element) {
            this.element  = element;
        };
        ClassList.prototype = [];
        ClassList.prototype.add = function(token) {
            this.element[property] = tokenlist.add(this.element[property], token).join(' ');
        };
        ClassList.prototype.remove = function(token) {
            this.element[property] = tokenlist.remove(this.element[property], token).join(' ');
        };
        ClassList.prototype.toggle = function(token) {
            var rst = tokenlist.toggle(this.element[property], token);
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
            view.Element.prototype.__defineGetter__('classListFoo', getter);
        }

    })(self);

}
