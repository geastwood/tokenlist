var TokenList;
(function() {

    'use strict';

    var clean = function(token) {

        /* jshint eqnull: true */
        if (token == null) {
            return '';
        }
        return token.replace(/^\s+|\s+$/g, '');
    };
    var callback = {};

    TokenList = function() {};
    TokenList.prototype = [];
    TokenList.prototype.add = function(/* multiple tokens */) {

        var i,
            j,
            len,
            token,
            callback,
            tokens = Array.prototype.slice.call(arguments);

        for (i = 0, len = tokens.length; i < len; i++) {

            token = clean(tokens[i]);

            if (!this.contains(token)) {
                this.push(token);
            }
        }


        callback.fn.call(callback.context, this);

    };
    TokenList.prototype.remove = function(token) {

        var i, len;

        token = clean(token);

        for (i = 0, len = this.length; i < len; i++) {

            if (this[i] === token) {
                this.splice(i, 1);
            }
        }
    };
    TokenList.prototype.toggle = function(token, force) {

        token = clean(token);

        var type = (typeof force === 'undefined') ? !this.contains(token) : force;
        var method = type ? 'add' : 'remove';

        this[method].call(this, token);
        return method === 'add' ? true : false;
    };
    TokenList.prototype.contains = function(token) {

        var i, len;

        token = clean(token);

        for (i = 0, len = this.length; i < len; i++) {

            if (this[i] === token) {
                return true;
            }
        }

        return false;

    };
    TokenList.prototype.item = function(index) {
        return this[index];
    };
    TokenList.prototype.registerCallback = function(fn, context) {
        callback.fn = fn;
        callback.context = context;
    };

}());
