/* global self */
if ("document" in self && !("classList" in document.createElement("_"))) {

    (function(view) {

        'use strict';

        var descriptor,
            getter,
            property = 'className',
            method = 'classList';

        if (!('Element' in view)) return;

        /* injector:js */
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
            len,
            token,
            tokens = Array.prototype.slice.call(arguments);

        for (i = 0, len = tokens.length; i < len; i++) {

            token = clean(tokens[i]);

            if (!this.contains(token)) {
                this.push(token);
            }
        }

        if (callback.fn) {
            callback.fn.call(callback.context, this);
        }

    };
    TokenList.prototype.remove = function(token) {

        var i, len;

        token = clean(token);

        for (i = 0, len = this.length; i < len; i++) {

            if (this[i] === token) {
                this.splice(i, 1);
            }
        }

        if (callback.fn) {
            callback.fn.call(callback.context, this);
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

        /* endinjector */

        //bind(tokenlist, list)
        getter = function() {
            var list = this[property] ? this[property].split(' ') : [];
            var tokenlist = new TokenList();
            var methods = ['add', 'remove', 'toggle', 'contains', 'item', 'registerCallback'];
            for (var i = 0, len = methods.length; i < len; i++) {
                list[methods[i]] = tokenlist[methods[i]];
            }
            list.registerCallback(function(list) {
                this[property] = list.join(' ');
            }, this);

            return list;
        };

        if (Object.defineProperty) {

            descriptor = {
                get: getter,
                enumerable: true,
                configurable: true
            };

            try {
                Object.defineProperty(view.Element.prototype, method, descriptor);
            } catch (ex) {// IE 8 doesn't support enumerable:true
                if (ex.number === -0x7FF5EC54) {
                    descriptor.enumerable = false;
                    Object.defineProperty(view.Element.prototype, method, descriptor);
                }
            }
        } else if (Object.prototype.__defineGetter__) {
            view.Element.prototype.__defineGetter__('classList', getter);
        }

    })(self);

}
