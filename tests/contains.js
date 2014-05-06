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
