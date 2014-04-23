// TODO: duplicate loop
var tokenlist = (function() {

    'use strict';
    var service = {
        clean: function(str) {

            /* jshint eqnull: true */
            if (str == null) {
                return '';
            }
            return str.replace(/^\s+|\s+$/g, '');
        },
        join: function(arr) {
            return arr.join(' ');
        },
        buildListStr: function(arr) {
            return this.clean(this.join(arr));
        }
    };

    var factory = function(list, str, type) {

        // trim the input string
        list = service.clean(list);
        str = service.clean(str);

        // split to array
        var listArr = list.split(/\s+/);

        var map = {
            add: function(list, str) {
                list.push(str);
                return service.buildListStr(list);
            },
            remove: function(list, str) {

                var i, len, rst = [];

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] !== str) {
                        rst.push(list[i]);
                    }
                }

                return service.buildListStr(rst);
            },
            exsits: function(list, str) {

                var i, len;

                for (i = 0, len = list.length; i < len; i++) {

                    if (list[i] === str) {
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

        return map[type](listArr, str);
    };

    return {
        add: function(list, str) {
            return factory(list, str, 'add');
        },
        remove: function(list, str) {
            return factory(list, str, 'remove');
        },
        toggle: function(list, str) {
            return factory(list, str, this.contains(list, str) ? 'remove' : 'add');
        },
        contains: function(list, str) {
            return factory(list, str, 'exsits');
        },
        item: function(list, index) {
            return factory(list, null, 'item')(index);
        }
    };

}());
