var tokenlist;
beforeEach(function() {
    tokenlist = new TokenList();
});
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
    it('should have "length" property', function() {
        expect(typeof tokenlist.length).toBeDefined();
    });
});

describe('add', function() {
    it('should work', function() {
        tokenlist.add('foo');
        expect(tokenlist.length).toBe(1);
        tokenlist.add('bar ', 'fb', 'bar ', 'foo');
        expect(tokenlist.length).toBe(3);
        expect(tokenlist.item(1)).toBe('bar');
    });
});

describe('remove', function() {
    it('should work', function() {
        tokenlist.add('foo', 'bar', 'fb');
        tokenlist.remove('bar');
        expect(tokenlist.item(1)).toBe('fb');
        tokenlist.remove('foo');
        expect(tokenlist.item(0)).toBe('fb');
    });
});
describe('toggle', function() {
    it('should work', function() {
        tokenlist.toggle('foo');
        expect(tokenlist.item(0)).toBe('foo');
        tokenlist.toggle('foo');
        expect(tokenlist.item(0)).toBe(undefined);
        tokenlist.toggle('bar');
        tokenlist.toggle('foo');
        expect(tokenlist.item(0)).toBe('bar');
        expect(tokenlist.item(1)).toBe('foo');
        expect(tokenlist.toggle('foo', true)).toBe(true);
        expect(tokenlist.item(1)).toBe('foo');
        expect(tokenlist.toggle('fb', false)).toBe(false);
        expect(tokenlist.item(2)).toBe(undefined);
        expect(tokenlist.length).toBe(2);
    });
});

describe('item', function() {
    it('should work', function() {
        tokenlist.add('foo', 'bar', 'fb');
        expect(tokenlist.length).toBe(3);
        expect(tokenlist.item(2)).toBe('fb');
        expect(tokenlist.item(0)).toBe('foo');
    });
});
