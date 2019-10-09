# get-valu

---

<p>
  <a href="https://travis-ci.org/EliFuzz/get-valu" target="_blank">
    <img src="https://travis-ci.org/EliFuzz/get-valu.svg?branch=master" alt="travis-ci">
  </a>
  <a href="https://codecov.io/gh/EliFuzz/get-valu" target="_blank">
    <img src="https://codecov.io/gh/EliFuzz/get-valu/branch/master/graph/badge.svg" alt="codecov"/>
  </a>
</p>

---

Why you should consider using this project:
- VanillaJS
- no dependencies
- lightweight and fast
- supports all browsers and systems
- simplicity
- returns only 2 options: either `undefined` or desired value
- second parameter (`path`) works as simple as `copy-paste`

## How to use
1. Write the path to desired value: `a['b.c'][0].d.e`
2. Cut path: `['b.c'][0].d.e`
3. Paste as a second argument: `get(a, "['b.c'][0].d.e")`

## Install

Install with [npm](https://www.npmjs.com/):
```sh
npm install get-valu
```
or with [yarn](https://yarnpkg.com/):
```sh
yarn add get-valu
```

## Usage

### Supports object nesting

```javascript
const get = require('get-valu');

const obj = { a: { b: { c: { d: 'e' } } } };

console.log(get(obj));            //=> { a: { b: { c: { d: 'e' } } } }
console.log(get(obj, 'a'));       //=> { b: { c: { d: 'e' } } }
console.log(get(obj, 'a.b'));     //=> { c: { d: 'e' } }
console.log(get(obj, 'a.b.c'));   //=> { d: 'e' }
console.log(get(obj, 'a.b.c.d')); //=> 'e'
```

### Supports complex keys with dots
```javascript
console.log(get({ "a.b": "c" }, "['a.b']")); //=> 'c'
``` 

### Supports array
```javascript
console.log(get([{ a: "b" }], "[0]"));           //=> { a: "b" }
console.log(get({ a: [{ b: "c" }] }, "a[0]"));   //=> { b: "c" }
console.log(get({ a: [{ b: "c" }] }, "a[0].b")); //=> "c"
console.log(get({ a: { b: ["c"] } }, "a.b[0]")); //=> "c"
```

### Supports functions
```javascript
const a = () => {};
a.b = { c: "d" };

console.log(get(a, ""));    //=> [Function a]
console.log(get(a, "b"));   //=> { c: "d" }
console.log(get(a, "b.c")); //=> "d"
```

For more examples look [unit tests](index.test.js).

## Benchmarks

[JS Benchmark](https://jsbench.me/34k1fmd0r2)

## LICENSE

[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/EliFuzz/get-valu/blob/master/LICENSE)