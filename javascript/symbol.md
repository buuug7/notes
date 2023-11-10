# symbol

Symbols are a new, special kind of object that can be used as a unique property name in objects. Using symbols instead of a strings allows different modules to create properties that don’t conflict with one another. Symbols can also be made effectively private, so that their properties can’t be accessed by anyone who doesn’t already have direct access to the symbol.

Symbols are a new **primitive**, just like the number, string, and boolean primitives. Unlike the other primitives, symbols do not have a literal syntax (e.g. how `string` has '') — the only way to create them is with the Symbol constructor in the following way:

```javascript
let symbol = Symbol();
```

In reality, symbols are just a slightly different way to attach properties to an object — you could easily provide the well-known symbols as standard methods, just like `Object.prototype.hasOwnProperty`, which appears in everything that inherits from `Object`.

Here are some of the benefits of the `Symbol` primitive type.

## Symbols have debuggability built in

Symbols can be given a description, which is really just used for debugging to make life a little easier when logging them to a console.

## Symbols can be used as object keys

This is where symbols get really interesting. They are heavily intertwined with objects. Symbols can be assigned as keys to objects, meaning you can assign an unlimited number of unique symbols to an object and be guaranteed that these will never conflict with string keys, or other unique symbols.

## Symbols can be used as unique values

Let’s assume you have a logging library, which includes multiple log levels such as `logger.levels.DEBUG`, `logger.levels.INFO`, `logger.levels.WARN` and so on. In ES5 code you’d like make these strings (so `logger.levels.DEBUG === 'debug'`), or numbers (`logger.levels.DEBUG === 10`). Both of these aren’t ideal as those values aren’t unique values, but symbols are! So `logger.levels` simply becomes:

````javascript
log.levels = {
DEBUG: Symbol('debug'),
INFO: Symbol('info'),
WARN: Symbol('warn'),
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');```
````

## what-is-the-motivation-for-bringing-symbols-to-es6

The original motivation for introducing symbols to Javascript was to enable private properties.

Unfortunately, they ended up being severely downgraded. They are no longer private, since you can find them via reflection, for example, using Object.getOwnPropertySymbols or proxies.

They are now known as unique symbols and their only intended use is to avoid name clashes between properties. For example, ECMAScript itself can now introduce extension hooks via certain methods that you can put on objects (e.g. to define their iteration protocol) without risking them to clash with user names.

Whether that is strong enough a motivation to add symbols to the language is debatable.
