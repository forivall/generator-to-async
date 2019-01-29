
function generatorToAsync<T, A extends any[]>(
  fn: (...args: A) => generatorToAsync.IteratorForAsync<T>
): (...args: A) => PromiseLike<T>

namespace generatorToAsync {
  function resolve<T>(iterator: IteratorForAsync<T>): PromiseLike<T>

  type Resolvable<T> = T | PromiseLike<T>
  interface IteratorReturn<T> {
    done: true
    value: Resolvable<T>
  }
  interface IteratorForAsync<T> extends Iterator<any> {
    next(value?: any): IteratorReturn<T> | IteratorResult<any>
    return?(value?: any): IteratorReturn<T> | IteratorResult<any>
    throw?(e?: any): IteratorResult<any>
  }
}
