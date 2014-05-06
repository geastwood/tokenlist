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

        if (typeof token === 'string') {
            token = service.clean(token);
        }

        // split to array
        var listArr = list ? list.split(/\s+/): [];

        var map = {
            addOne: function(list, token) {

                var status = false;

                if (!this.exists(list, token)) {
                    list.push(token);
                    status = true;
                }

                return {
                    status: true,
                    list: list
                };
            },
            addMultiple: function(list, token) {

                var i, len;

                for (i = 0, len = token.length; i < len; i++) {
                    if (!this.exists(list, token[i])) {
                        list.push(service.clean(token[i]));
                    }
                }

                return list;
            },
            remove: function(list, token) {

                var i, len;

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] === token) {
                        list.splice(i, 1);
                    }
                }

                return {
                    status: false,
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

        add: function(list) {
            var token = Array.prototype.slice.call(arguments, 1);
            return factory(list, token, 'addMultiple');
        },
        remove: function(list, token) {
            return factory(list, token, 'remove').list;
        },
        toggle: function(list, token, force) {
            var type = (typeof force === 'undefined') ? !this.contains(list, token) : force;
            return factory(list, token, type ? 'addOne' : 'remove');
        },
        contains: function(list, token) {
            return factory(list, token, 'exists');
        },
        item: function(list, index) {
            return factory(list, null, 'item')(index);
        }
    };

}());
