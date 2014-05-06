var object = {},
    classList;

beforeEach(function() {

    var property = 'className',
        method = 'classList';

    var getter = function() {
        return new ClassList(this);
    };

    var descriptor = {
        get: getter,
        enumerable: true,
        configurable: true
    };

    ClassList = function(element) {
        this.element  = element;
    };
    ClassList.prototype = [];
    ClassList.prototype.add = function() {
        var token = Array.prototype.slice.call(arguments);
        this.element[property] = tokenlist.add.apply(null, [this.element[property]].concat(token)).join(' ');
    };
    ClassList.prototype.remove = function(token) {
        this.element[property] = tokenlist.remove(this.element[property], token).join(' ');
    };
    ClassList.prototype.toggle = function(token, force) {
        var rst = tokenlist.toggle(this.element[property], token, force);
        this.element[property] = rst.list.join(' ');
        return rst.status;
    };
    ClassList.prototype.contains = function(str) {
        return tokenlist.contains(this.element[property], str);
    };
    ClassList.prototype.item = function(index) {
        return tokenlist.item(this.element[property], index);
    };

    classList = new ClassList(object);
    Object.defineProperty(object, method, descriptor);
});

describe('classList', function() {
    beforeEach(function() {
        object.className = '';
    });

    it('should have all methods', function() {
        expect(object.classList.add).toBeDefined();
        expect(object.classList.remove).toBeDefined();
        expect(object.classList.toggle).toBeDefined();
        expect(object.classList.contains).toBeDefined();
        expect(object.classList.toggle).toBeDefined();
    });
    it('should have length property', function() {
        expect(classList.length).toBeDefined();
    });

    describe('simple add', function() {

        it('should work', function() {
            object.classList.add('foo');
            expect(object.className).toBe('foo');
            object.classList.add('bar');
            expect(object.className).toBe('foo bar');
            object.classList.add('fb');
            expect(object.className).toBe('foo bar fb');
            object.classList.add('foo');
            expect(object.className).toBe('foo bar fb');
        });

    });

    describe('multiple add', function() {

        it('should work', function() {
            object.classList.add('foo', 'bar', 'fb');
            expect(object.className).toBe('foo bar fb');

            object.classList.add('foo', 'bar', 'fb', 'bf');
            expect(object.className).toBe('foo bar fb bf');
        });

    });

    describe('remove', function() {
        it('should work', function() {
            object.classList.add('foo', 'bar');
            object.classList.remove('bar');
            expect(object.className).toBe('foo');
        });
    });
});
