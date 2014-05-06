describe('remove', function() {
    var orig = ' foo ';
    origArr = tokenlist.add(orig, 'bar');
    it('should work', function() {
        expect(origArr).toEqual(['foo', 'bar']);
        expect(tokenlist.remove('foo bar fb', 'fb')).toEqual(['foo', 'bar']);
    });
});
