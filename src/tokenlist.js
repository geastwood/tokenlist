// TODO: duplicate loop
var tokenlist = (function() {

    var service = {
        clean: function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    };

    var factory = function(target, str, type) {

        // trim the input string
        target = service.clean(target);
        str = service.clean(str);

        var targetArr = target.split(/\s+/);

        var map = {
            add: function(target, str) {
                target.push(str);
                return service.clean(target.join(' '));
            },
            remove: function(target, str) {

                var i, len, rst = [];
                for (i = 0, len = target.length; i < len; i++) {
                    if (target[i] !== str) {
                        rst.push(target[i]);
                    }
                }
                return service.clean(rst.join(' '));
            },
            exsits: function(target, str) {
                var i, len;
                for (i = 0, len = target.length; i < len; i++) {
                    if (target[i] === str) {
                        return true;
                    }
                }
                return false;
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

        // return boolean
        contains: function(target, str) {
            return factory(target, str, 'exsits');
        },
        item: function(target, index) {
            throw new Error('not implemented yet');
        }
    };

}());
