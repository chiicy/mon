## 理解类型断言和类型声明, 并在合适的时候使用

- 类型断言 const some = {} as Some
- 类型声明 const some: Some = {}

**原则**: 优先使用类型声明

优先使用类型声明不代表不使用类型断言, (否则也没必要有这个特性)

以下场景推荐使用类型断言:

### 绕过多余属性检查

```typescript
interface Point {
  x: number;
  y: number;
}
const point : Point = {
  x: 1,
  y: 2,
  z: 3 // 报错，多余的属性
}

// 这种情况不符合 ts 的结构化类型, 我们可以使用类型断言绕过
const point = {
  x: 1,
  y: 2,
  z: 3
} as Point
```

### 隔离外部传入的类型

这种模式在模块中应用较多, 将暴露的接口的类型修饰为内部类型.

```typescript
interface InternalListener{
  _next: () => void
}
interface Listener{
  next: () => void
}

class  EventBus {
  protected _il: InternalListener;

  listen(listener: Listener){
    const _listener = listener as unknown as InternalListener
    _listener._next = listener.next
    this._il =  _listener
  }

  emit() {
    this._il._next()
  }
}

const listener: Listener = {
  next: () => {console.log('next0')}
}

const bus = new EventBus()

bus.listen(listener)

listener.next = () => console.log('next1')

bus.emit()
```

上例展示了修改外部类型的一种情形, 优点在于, 不会当外部传入的内容被修改时, 不会影响到内部, 上例中, 即使我们后续修改了 `listener` 的 `next` 也不会产生什么影响.

### 取代 null

有些配置下, ts 会强制我们提前声明 `null`, 这时我们可以用 `{} as SomeType` 来取代 `null`.

```typescript
const NO = {}
interface InternalListener {
  _next: () => void
}
interface Listener {
  next: () => void
}

class EventBus {
  protected _il: InternalListener
  // protected _debug : InternalListener | null = null
  protected _debug = NO as InternalListener

  listen(listener: Listener) {
    const _listener = (listener as unknown) as InternalListener
    _listener._next = listener.next
    this._il = _listener
  }

  debug() {
    this._debug = {
      _next() {
        console.log('debug')
      },
    }
  }

  emit() {
    this._il._next()
    // if (this._debug !== null) {
    if (this._debug !== NO) {
      this._debug._next()
    }
  }
}

const listener: Listener = {
  next: () => {
    console.log('next0')
  },
}

const bus = new EventBus()

bus.listen(listener)
```

还有某些场景, 比如请求接口返回值, 后端字段可能为 `null`, 这时我们取值可能会比较麻烦, 尤其是在 `null` 情况下解构出默认值, 写法可能会很复杂, 这是可以将 `{} as Some` 来绕过.

``` typescript
interface Value {
  value: string
}
// 理想的 response
// const response: Value = {
//    value: 'a string'
// }
// 实际的 response
const response = null
// 不使用 as
// const { value } = response || { value: '' }
const { value = '' } = (response || {}) as Value
```

## 充分使用泛型

泛型在使用时可以加上约束, 这样在使用 `Select > onChange`  时, 能够获取到 `value` 实际类型提示和检查, 比如 `value` 为 `{zip: 1001, local: '上海}`, 可以获得 `value.zip` 提示和检查.

```typescript
function Select<O extends { label: string | number; value: any }>({
  options,
  onChange,
}: {
  options: O[];
  onChange: (value: O) => void;
}) {
  return (
    <select
      onChange={(e) => {
        onChange(options.find((option) => option.label === e.target.value));
      }}
    >
      {options.map(({ label, value }) => (
        <option key={label} value={label}>
          {label}
        </option>
      ))}
    </select>
  );
}
```
