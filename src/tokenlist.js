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
