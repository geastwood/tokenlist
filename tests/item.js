describe('item', function() {
    it('should work', function() {
        expect(tokenlist.item('foo bar fb foobarfb', 0)).toBe('foo');
        expect(tokenlist.item('foo bar fb foobarfb', 1)).toBe('bar');
        expect(tokenlist.item('foo bar fb foobarfb', 2)).toBe('fb');
        expect(tokenlist.item('foo ', 2)).toBe(undefined);
    });
});
