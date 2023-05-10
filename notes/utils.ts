// https://qiita.com/ryo2132/items/ce9e13899e45dcfaff9b
// const isString = (test: unknown): boolean => {
//   return typeof test === 'string'
// }

// typeofでの型絞り込みは、関数スコープで完結してしまう。
// そのため、fooはunknownとして推論される。
// const example = (foo: unknown) => {
//   if (isString(foo)) {
//     console.log(foo.length) // Error fooはまだunknownとして推論される
//   }
// }

// isを使うことで、判定がtrueの場合に返り値がstring型であることを伝えられる
const isString = (test: unknown): test is string => {
  return typeof test === 'string'
}

const example = (foo: unknown) => {
  if (isString(foo)) {
    console.log(foo.length) // fooはstringとして推論される
  }
}
