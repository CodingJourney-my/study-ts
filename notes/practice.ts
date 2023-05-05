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

// 2-2 ユニオン型
type Speed = 'slow' | 'medium' | 'fast'

function getSpeed(speed: Speed): number {
  switch (speed) {
    case 'slow':
      return 10
    case 'medium':
      return 50
    case 'fast':
      return 200
  }
}

// 使用例
const slowSpeed = getSpeed('slow')
const mediumSpeed = getSpeed('medium')
const fastSpeed = getSpeed('fast')

// エラー例
// getSpeed('veryfast')

// 2-3
type OptionsObj = { capture?: boolean; once?: boolean; passive?: boolean }
declare function addEventListener(
  str: string,
  func: () => void,
  boolOrObj?: boolean | OptionsObj
): void

// 使用例
addEventListener('foobar', () => {})
addEventListener('event', () => {}, true)
addEventListener('event2', () => {}, {})
addEventListener('event3', () => {}, {
  capture: true,
  once: false,
})

// エラー例
// addEventListener('foobar', () => {}, 'string')
// addEventListener('hoge', () => {}, {
//   capture: true,
//   once: false,
//   excess: true,
// })

// 2-4 インターセクション型
const giveId = <T>(obj: T): T & { id: string } => {
  const id = '本当はランダムがいいけどここではただの文字列'
  return {
    ...obj,
    id,
  }
}

// 使用例
const obj1: {
  id: string
  foo: number
} = giveId({ foo: 123 })
const obj2: {
  id: string
  num: number
  hoge: boolean
} = giveId({
  num: 0,
  hoge: true,
})

// エラー例
// const obj3: {
//   id: string
//   piyo: string
// } = giveId({
//   foo: 'bar',
// })

// 2-5 タプル型
// 使用例
// number型のステートを宣言 (numStateはnumber型)
type UpdateArg<T> = T | ((oldState: T) => void)
declare function useState<T>(state: T): [T, (arg: UpdateArg<T>) => void]

// eslint-disable-next-line react-hooks/rules-of-hooks
const [numState, setNumState] = useState(0)
// setNumStateは新しい値で呼び出せる
setNumState(3)
// setNumStateは古いステートを新しいステートに変換する関数を渡すこともできる
setNumState((state) => state + 10)

// 型引数を明示することも可能
// eslint-disable-next-line react-hooks/rules-of-hooks
const [anotherState, setAnotherState] = useState<number | null>(null)
setAnotherState(100)

// エラー例
// setNumState('foobar')
