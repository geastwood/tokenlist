describe('api', function() {
    it('should have "item" function', function() {
        expect(typeof tokenlist.item).toBe('function');
    });
    it('should have "add" function', function() {
        expect(typeof tokenlist.add).toBe('function');
    });
    it('should have "remove" function', function() {
        expect(typeof tokenlist.remove).toBe('function');
    });
    it('should have "toggle" function', function() {
        expect(typeof tokenlist.toggle).toBe('function');
    });
    it('should have "contains" function', function() {
        expect(typeof tokenlist.contains).toBe('function');
    });
});

describe('add', function() {
    var orig = ' foo ';

    it('should work', function() {
        expect(tokenlist.add(orig, 'bar')).toEqual(['foo', 'bar']);
    });
    it('should trim the input', function() {
        expect(tokenlist.add(orig, ' bar  ')).toEqual(['foo', 'bar']);
    });
    it('should not add, if same token is in the list', function() {
        orig = tokenlist.add(orig, 'bar').join(' ');
        expect(tokenlist.add(orig, 'bar')).toEqual(['foo', 'bar']);
    });
});
describe('remove', function() {
    var orig = ' foo ';
    origArr = tokenlist.add(orig, 'bar');
    it('should work', function() {
        expect(origArr).toEqual(['foo', 'bar']);
        expect(tokenlist.remove('foo bar fb', 'fb')).toEqual(['foo', 'bar']);
    });
});
xdescribe('length', function() {
    var orig = 'foo bar';
    beforeEach(function() {
        orig = tokenlist.add(orig, 'fb');
    });

    it('should work', function() {

    });
});
describe('contains', function() {
    var orig = 'foo bar fb foobarfb';
    it('should work', function() {
        expect(tokenlist.contains(orig, 'foo')).toBe(true);
        expect(tokenlist.contains(orig, 'foo1')).toBe(false);
        expect(tokenlist.contains(orig, 'foobar')).toBe(false);
        expect(tokenlist.contains(orig, 'foobarfb')).toBe(true);
        expect(tokenlist.contains(orig, 'fb')).toBe(true);
    });
});
describe('toggle', function() {
    it('should work', function() {
        expect(tokenlist.toggle('foo bar fb foobarfb', 'foo').status).toEqual(false);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'fei').status).toEqual(true);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'bar').status).toEqual(false);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'foobarf2b').status).toEqual(true);
    });
});
describe('item', function() {
    it('should work', function() {
        expect(tokenlist.item('foo bar fb foobarfb', 0)).toBe('foo');
        expect(tokenlist.item('foo bar fb foobarfb', 1)).toBe('bar');
        expect(tokenlist.item('foo bar fb foobarfb', 2)).toBe('fb');
        expect(tokenlist.item('foo ', 2)).toBe(undefined);
    });
});
