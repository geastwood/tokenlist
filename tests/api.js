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
