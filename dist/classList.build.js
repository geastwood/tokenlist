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
        },
        join: function(arr) {
            return arr.join(' ');
        },
        buildTokenList: function(arr) {
            return this.clean(this.join(arr));
        }
    };

    var factory = function(list, token, type) {

        // trim the input
        list = service.clean(list);
        token = service.clean(token);

        // split to array
        var listArr = list.split(/\s+/);

        var map = {
            add: function(list, token) {
                list.push(token);
                return service.buildTokenList(list);
            },
            remove: function(list, token) {

                var i, len, rst = [];

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] !== token) {
                        rst.push(list[i]);
                    }
                }

                return service.buildTokenList(rst);
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

        return map[type](listArr, token);
    };

    return {
        add: function(list, token) {
            return factory.call(this, list, token, 'add');
        },
        remove: function(list, token) {
            return factory(list, token, 'remove');
        },
        toggle: function(list, token) {
            return factory(list, token, this.contains(list, token) ? 'remove' : 'add');
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
                        //console.log(that[property]);
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
