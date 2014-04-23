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
            return factory(list, token, 'add');
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
