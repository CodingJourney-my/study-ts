// TypeScriptの型演習
// https://qiita.com/uhyo/items/e4f54ef3b87afdd65546

// 1-1
function isPositive(num: number): boolean {
  return num >= 0
}

// 使用例
isPositive(3)

// エラー例
// isPositive('123')
// const numVar: number = isPositive(-5)

// 1-2 オブジェクト
type User = {
  name: string
  age: number
  private: boolean
}
function showUserInfo(user: User) {
  // 省略
}

// 使用例
showUserInfo({
  name: 'John Smith',
  age: 16,
  private: false,
})

// エラー例
// showUserInfo({
//   name: 'Mary Sue',
//   private: false,
// })
// const usr: User = {
//   name: 'Gombe Nanashino',
//   age: 100,
// }

// 1-3 関数
type IsPositiveFunc = (num: number) => boolean
const isPositive2: IsPositiveFunc = (num) => num >= 0

// 使用例
isPositive2(5)

// エラー例
// isPositive2('foo')
// const res: number = isPositive2(123)

// 1-4 配列
function sumOfPos(arr: number[]): number {
  return arr.filter((num) => num >= 0).reduce((acc, num) => acc + num, 0)
}

// 使用例
const sum: number = sumOfPos([1, 3, -2, 0])

// エラー例
// sumOfPos(123, 456)
// sumOfPos([123, 'foobar'])

// 2-1 ジェネリクス
function myFilter<T>(arr: T[], predicate: (elm: T) => boolean): T[] {
  const result = []
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm)
    }
  }
  return result
}

// 使用例
const res = myFilter([1, 2, 3, 4, 5], (num) => num % 2 === 0)
const res2 = myFilter(['foo', 'hoge', 'bar'], (str) => str.length >= 4)

// エラー例
// myFilter([1, 2, 3, 4, 5], (str) => str.length >= 4)
