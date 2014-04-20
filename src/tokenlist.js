// TODO: duplicate loop
var tokenlist = (function() {

    var service = {
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

    var factory = function(target, str, type) {

        // trim the target string
        target = target.replace(/^\s+|\s+$/g, '');

        targetArr = target.split(/\s+/);

        var map = {
            add: function(target, str) {
                target.push(str);
                // TODO: refactor
                return target.join(' ').replace(/^\s+|\s+$/g, '');
            },
            remove: function(target, str) {

                var i, len, rst = [];
                for (i = 0, len = target.length; i < len; i++) {
                    if (target[i] !== str) {
                        rst.push(target[i]);
                    }
                }
                // TODO: refactor
                return rst.join(' ').replace(/^\s+|\s+$/g, '');
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

        item: function(target, index) {}
    };

}());
