(function() {

    'use strict';
    /* injector:js */
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

    var factory = function(target, str, type) {

        // trim the input string
        target = service.clean(target);
        str = service.clean(str);

        // split to array
        var targetArr = target.split(/\s+/);

        var map = {
            add: function(target, str) {
                target.push(str);
                return service.buildListStr(target);
            },
            remove: function(target, str) {

                var i, len, rst = [];

                for (i = 0, len = target.length; i < len; i++) {

                    if (target[i] !== str) {
                        rst.push(target[i]);
                    }
                }

                return service.buildListStr(rst);
            },
            exsits: function(target, str) {

                var i, len;

                for (i = 0, len = target.length; i < len; i++) {

                    if (target[i] === str) {
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

        return map[type](targetArr, str);
    };

    return {
        add: function(target, str) {
            return factory(target, str, 'add');
        },
        remove: function(target, str) {
            return factory(target, str, 'remove');
        },
        toggle: function(target, str) {
            return factory(target, str, this.contains(target, str) ? 'remove' : 'add');
        },
        contains: function(target, str) {
            return factory(target, str, 'exsits');
        },
        item: function(target, index) {
            return factory(target, null, 'item')(index);
        }
    };

}());

    /* endinjector */
    var foo = 'bar';
})();

