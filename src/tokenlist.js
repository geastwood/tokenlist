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
            return factory(list, token, this.contains(list, token) ? 'remove' : 'add');
        },
        contains: function(list, token) {
            return factory(list, token, 'exists');
        },
        item: function(list, index) {
            return factory(list, null, 'item')(index);
        }
    };

}());
