describe('toggle', function() {
    it('should work', function() {
        expect(tokenlist.toggle('foo bar fb foobarfb', 'foo').status).toEqual(false);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'fei').status).toEqual(true);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'bar').status).toEqual(false);
        expect(tokenlist.toggle('foo bar fb foobarfb', 'foobarf2b').status).toEqual(true);
    });
    it('should work with force flag', function() {
        expect(tokenlist.toggle('bar fb foobarfb', 'foo', false).status).toBe(false);
        expect(tokenlist.toggle('bar fb foobarfb', 'foo', false).list).toEqual(['bar', 'fb', 'foobarfb']);
        expect(tokenlist.toggle('bar fb foobarfb', 'foo', true).status).toBe(true);
        expect(tokenlist.toggle('bar fb foobarfb', 'foo', true).list).toEqual(['bar', 'fb', 'foobarfb', 'foo']);
    });
});
