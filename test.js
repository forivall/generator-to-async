import Promise from 'any-promise'
import test from 'ava'

import generatorToAsync from '.'

test('it works', async (t) => {
  const fn = generatorToAsync(function* passthrough(v) {
    const ret = yield v
    return ret
  })
  t.is(await fn(Promise.resolve(42)), 42)
})

test('resolve works', async (t) => {
  const iterator = (function* passthrough(v) {
    const ret = yield v
    return ret
  })(42)
  t.is(await generatorToAsync.resolve(iterator), 42)
})

test('it catches errors', async (t) => {
  await t.throwsAsync(
    generatorToAsync.resolve(
      (function* errorOut() {
        // eslint-disable-next-line no-undef
        yield throwReferenceError
      })(),
    ),
  )
})

test('it catches rejections', async (t) => {
  await t.throwsAsync(
    generatorToAsync.resolve(
      (function* passthrough(v) {
        return yield v
      })(require('any-promise').reject(new Error('foo'))),
    ),
  )
})
