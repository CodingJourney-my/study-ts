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

// 3-1
function mapFromArray<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T> {
  const result = new Map()
  for (const obj of arr) {
    result.set(obj[key], obj)
  }
  return result
}

// 使用例
const data = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Mary Sue' },
  { id: 100, name: 'Taro Yamada' },
]
const dataMap = mapFromArray(data, 'id')
/*
dataMapは
Map {
  1 => { id: 1, name: 'John Smith' },
  2 => { id: 2, name: 'Mary Sue' },
  100 => { id: 100, name: 'Taro Yamada' }
}
というMapになる
*/

// エラー例
// mapFromArray(data, 'age')

// 3-2 Partial
type MyPartial<T> = { [K in keyof T]?: T[K] }
// 使用例
/*
 * T1は { foo?: number; bar?: string; } となる
 */
type T1 = MyPartial<{
  foo: number
  bar: string
}>
/*
 * T2は { hoge?: { piyo: number; } } となる
 */
type T2 = MyPartial<{
  hoge: {
    piyo: number
  }
}>

// 3-3 まだクラスの扱いが理解できていないため省略

// 3-4 reducer
// 現在のレベルで思いついた回答 要件を満たせない
// type ActionType = {
//   type: 'increment' | 'decrement' | 'reset'
//   amount?: number
//   value?: number
// }

// オブジェクトごとパーシャルにすることでより正確な型設定ができる。
type Action =
  | {
      type: 'increment'
      amount: number
    }
  | {
      type: 'decrement'
      amount: number
    }
  | {
      type: 'reset'
      value: number
    }

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case 'increment':
      return state + action.amount
    case 'decrement':
      return state - action.amount
    case 'reset':
      return action.value
  }
}

// 使用例
reducer(100, {
  type: 'increment',
  amount: 10,
}) === 110
reducer(100, {
  type: 'decrement',
  amount: 55,
}) === 45
reducer(500, {
  type: 'reset',
  value: 0,
}) === 0

// エラー例
// reducer(0, {
//   type: 'increment',
//   value: 100,
// })

// 3-5 undefinedな引数
// type Func<A, R> = (arg: A) => R
// f2のようにAがundefined型のときは引数無しで呼べる
// v3のように明示的にundefinedを渡して呼び出すのもOK
// v4のように、引数がundefined以外のときは引数の省略は許しません

// undefined extends Aで、A内にundefinedが含まれるかどうかを確認できる
type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R

// 使用例
const f1: Func<number, number> = (num) => num + 10
const v1: number = f1(10)

const f2: Func<undefined, number> = () => 0
const v2: number = f2()
const v3: number = f2(undefined)

const f3: Func<number | undefined, number> = (num) => (num || 0) + 10
const v4: number = f3(123)
const v5: number = f3()

// エラー例
// const v6: number = f1()

// 4-1 ない場合はunknown
function getFoo<T extends object>( // object型ではいものはエラーにする
  obj: T
): T extends { foo: infer U } ? U : unknown {
  return (obj as any).foo // conditional typeが関わっている場合は型推論が頼りにならないため、anyをつける
}

// 使用例
// numはnumber型
const num = getFoo({
  foo: 123,
})
// strはstring型
const str = getFoo({
  foo: 'hoge',
  bar: 0,
})
// unkはunknown型
const unk = getFoo({
  hoge: true,
})

// エラー例
// getFoo(123)
// getFoo(null)
