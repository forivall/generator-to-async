import test from 'ava'

import generatorToAsync from './index'

test('it works', async (t) => {
  t.is(await generatorToAsync(function * passthrough(v) {
    return yield v
  })(42), 42)
})

test('it catches errors', async (t) => {
  await t.throws(generatorToAsync.resolve((function * errorOut() {
    // eslint-disable-next-line no-undef
    yield throwReferenceError
  })()), 42)
})

test('it catches rejections', async (t) => {
  await t.throws(await generatorToAsync.resolve((function * passthrough(v) {
    return yield v
  })(require('any-promise').reject(new Error('foo')))))
})
