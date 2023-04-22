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

  // numeric separator
  const number = 100_000_000

  typeof undefined
  // => "undefined"
  typeof null
  // => "object"

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
