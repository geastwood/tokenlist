var div, span;
beforeEach(function() {
    div = document.createElement('div');
    span = document.createElement('span');
    _ = document.createElement('_');
});

describe('should inject "classList" property', function() {
    it('should pass', function() {
        expect(div.classList).toBeDefined();
        expect(span.classList).toBeDefined();
        expect(_.classList).toBeDefined();
    });
});

describe('api', function() {
    it('should be correct', function() {
        expect(div.classList.add).toBeDefined();
        expect(div.classList.remove).toBeDefined();
        expect(div.classList.toggle).toBeDefined();
        expect(div.classList.contains).toBeDefined();
        expect(div.classList.item).toBeDefined();
    });
});

describe('add', function() {

    beforeEach(function() {
        div.classList.add('foo');
        div.classList.add('bar');
    });

    it('should work', function() {
        expect(div.className).toBe('foo bar');
        div.classList.add('fb');
        expect(div.className).toBe('foo bar fb');
        div.classList.add('bf');
        expect(div.className).toBe('foo bar fb bf');
    });
    it('should work with multiple add', function() {
        div.classList.add('fb', 'bf', 'ffb', 'bbf');
        expect(div.className).toBe('foo bar fb bf ffb bbf');
    });
});

describe('remove', function() {

    beforeEach(function() {
        div.classList.add('foo');
        div.classList.add('bar');
        div.classList.add('fb');
        div.classList.add('bf');
    });

    it('should work', function() {
        div.classList.remove('bar');
        expect(div.className).toBe('foo fb bf');
        div.classList.remove('fb');
        expect(div.className).toBe('foo bf');
    });
});

describe('toggle', function() {

    beforeEach(function() {
        div.classList.add('foo');
        div.classList.add('bar');
        div.classList.add('fb');
        div.classList.add('bf');
    });

    it('should work', function() {
        expect(div.classList.toggle('bar')).toBe(false);
        expect(div.className).toBe('foo fb bf');
        expect(div.classList.toggle('bar')).toBe(true);
        expect(div.className).toBe('foo fb bf bar');
        expect(div.classList.toggle('fb')).toBe(false);
        expect(div.className).toBe('foo bf bar');
    });

    it('should work with special names', function() {
        div.classList.toggle('add');
        div.classList.toggle('remove');
        div.classList.toggle('length');
        expect(div.className).toBe('foo bar fb bf add remove length');
    });

    it('should work force flag', function() {
        div.classList.toggle('foo', true);
        expect(div.className).toBe('foo bar fb bf');
        div.classList.toggle('foo', false);
        expect(div.className).toBe('bar fb bf');
        div.classList.toggle('add', false);
        expect(div.className).toBe('bar fb bf');
        div.classList.toggle('bf', true);
        expect(div.className).toBe('bar fb bf');
        div.classList.toggle('bar', false);
        expect(div.className).toBe('fb bf');
    });
});
