describe('api', function() {
    it('it should have "item" function', function() {
        expect(typeof tokenlist.item).toBe('function');
    });
    it('it should have "add" function', function() {
        expect(typeof tokenlist.add).toBe('function');
    });
    it('it should have "remove" function', function() {
        expect(typeof tokenlist.remove).toBe('function');
    });
    it('it should have "toggle" function', function() {
        expect(typeof tokenlist.toggle).toBe('function');
    });
    it('it should have "contains" function', function() {
        expect(typeof tokenlist.contains).toBe('function');
    });
});

describe('add should work', function() {
    var orig = ' foo ';


    it('should add correctly', function() {
        expect(tokenlist.add(orig, 'bar')).toBe('foo bar');
    });
});
