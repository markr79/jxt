'use strict';

var test = require('tape');
var jxt = require('../');
var Registry = jxt.createRegistry();


var Child = Registry.define({
    name: 'child',
    namespace: 'test',
    element: 'childel',
    tags: ['base-extension'],
    fields: {
        foo: jxt.attribute('foo', 'works')
    }
});

// Link Child to Base, before we define Base
Registry.withDefinition('baseel', 'test', function (Base) {
    Registry.extend(Base, Child);
});



test('withDefinition', function (t) {
    var Base = Registry.define({
        name: 'base',
        namespace: 'test',
        element: 'baseel'
    });

    var b = new Base();

    t.ok(b.child);
    t.equals(b.child.foo, 'works');
    t.end();
});


test('tagging', function (t) {
    var defs = Registry.tagged('base-extension');

    t.equals(defs.length, 1);
    t.equals(defs[0], Child);
    t.end();
});
