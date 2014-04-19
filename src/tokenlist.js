var tokenlist = (function() {

    var factory = function(target, str, type) {

        // trim the target string
        target = target.replace(/^\s+|\s+$/g, '');

        var map = {
            add: function(target, str) {
                return target + ' ' + str;
            },
            remove: function(target, str) {

            },
            toggle: function(target, str) {

            }
        };

        return map[type](target, str);
    };
    return {
        add: function(target, str) {
            return factory(target, str, 'add');
        },
        remove: function(target, str) {},
        toggle: function(target, str) {},

        // return boolean
        contains: function(target, str) {},

        item: function(target, index) {}
    };

}());
