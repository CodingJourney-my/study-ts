type Foo = {
  bar: string
  baz: string
}

type FooReadonly = Readonly<Foo>

export default function Home() {
  const obj: { readonly foo: number } = { foo: 1 }
  let foo: FooReadonly = { bar: 'bar', baz: 'baz' }
  // Cannot assign to 'bar' because it is a read-only property.
  // foo.bar = 'bas'
  // ok
  foo = { bar: 'aaa', baz: 'ieeeeee' }

  // numeric separator 100,000,000のように読みやすく表現できる
  const number = 100_000_000

  typeof undefined
  // => "undefined"
  typeof null
  // => "object"

  type Step = 'input' | 'confirm' | 'complete'

  type ErrorCode = 400 | 401 | 402 | 403 | 404 | 405

  const pikachu = {
    name: 'pikachu',
    no: 25,
    genre: 'mouse pokémon',
    height: 0.4,
    weight: 6.0,
  } as const

  return (
    <>
      <div>
        {obj.foo}
        {number}
      </div>
      <div>
        {foo.bar}
        {foo.baz}
      </div>
    </>
  )
}
