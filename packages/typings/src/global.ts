declare global {
  // T | null 包装
  type Nullable<T> = T | null
  // T | Not null 包装
  type NotNullable<T> = T extends null | undefined ? never : T

  // 字符串类型对象
  type Recordable<T = any> = Record<string, T>
  // 只读字符串类型对象
  interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T
  }

  // 任意类型的异步函数
  type AnyPromiseFunction<T extends any[] = any[], R = void> = (...arg: T) => PromiseLike<R>
  //任意类型的普通函数
  type AnyNormalFunction<T extends any[] = any[], R = void> = (...arg: T) => R
  // 任意类型的函数
  type AnyFunction<T extends any[] = any[], R = void> = AnyNormalFunction<T, R> | AnyPromiseFunction<T, R>
}

export {}
