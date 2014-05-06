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
describe('add multiple', function() {
    var orig = ' foo ';
    it('should work', function() {
        expect(tokenlist.add(orig, 'bar', ' fb ', 'fei ', ' liu')).toEqual(['foo', 'bar', 'fb', 'fei', 'liu']);
        expect(tokenlist.add(orig)).toEqual(['foo']);
    });
});
