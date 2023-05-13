// extendsについて
// 1. Conditional Typeとしてのextends
// Genericsで受け取った型を条件分岐できる
type A<T> = T extends string ? string : number

type B = A<string> // string
type C = A<boolean> // number
type D = A<'hello'> // string
type E = A<123> // numbe

// Conditional Typeとしてのextendsの中でinferを使う
type UserA = {
  name: string
  role: 'admin' | 'user' // ここの型を抽出できる
}
type UserB = {
  name: string
  age: number
}

type F<T> = T extends { role: infer U } ? U : null

type G = F<UserA> // "admin" | "user"
type H = F<UserB> // null

// type A<T> = T extends { key: infer U } ? U : V
// => Tにkeyが存在するか確認し、あればTのkeyをなければVを返す
