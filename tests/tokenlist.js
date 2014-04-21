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
        expect(tokenlist.add(orig, 'bar')).toBe('foo bar');
    });
});
describe('remove', function() {
    var orig = ' foo ';
    orig = tokenlist.add(orig, 'bar');
    orig = tokenlist.add(orig, 'fb');
    it('should work', function() {
        expect(orig).toBe('foo bar fb');
        expect(tokenlist.remove(orig, 'fb')).toBe('foo bar');
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
        expect(tokenlist.toggle('foo bar fb foobarfb', 'foo')).toBe('bar fb foobarfb');
        expect(tokenlist.toggle('foo bar fb foobarfb', 'fei')).toBe('foo bar fb foobarfb fei');
        expect(tokenlist.toggle('foo bar fb foobarfb fei', 'fei')).toBe('foo bar fb foobarfb');
        expect(tokenlist.toggle('', 'foo')).toBe('foo');
        expect(tokenlist.toggle('foo', 'foo')).toBe('');
        expect(tokenlist.toggle(' foo ', ' bar')).toBe('foo bar');
        expect(tokenlist.toggle('foo ', 'bar')).toBe('foo bar');
    });
});
