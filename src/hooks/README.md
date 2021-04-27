# React Hooks
## 1 useState()
- Là 1 hook cơ bản
- Giúp mình sử dụng state trong functional component

```
input: initialState(giá trị hoặc function)
output: mảng 2 phần tử state và setState
example: const [name, setName] = useState("myName");
```

## Array destructoring syntax
```js
// You know before
const array = ['Easy', 'Frontend'];
const a = array[0]; // Easy
const b = array[1]; // Frontend
// Now we use array destructoring
const [a, b] = ['Easy', 'Frontend'];
// a = 'Easy'
// b = 'Frontend'
```

## So sánh state giữa class & functional compoents
CLASS COMPONENT

```js
class ColorBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shape: 'square',
      color: 'deeppink',
    };
  }
  handleBoxClick() {
    this.setState({ color: 'green' });
  };
  render() {
    const { color } = this.state;
    return (
      <div
        className="color-box"
        style={{ backgroundColor: color }}
        onClick={this.handleBoxClick}
      ></div>
    )
  }
}
```

FUNCTIONAL COMPONENT

```js
function ColorBox() {
  const [share, setShape] = useState('square');
  const [color, setColor] = useState('deeppink');
  function handleBoxClick() {
    setColor('green');
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    ></div>
  );
}
```

## Note
1. useState() use REPLACING instead of MERGING.

```js
// setState() in class component: MERGING
this.state = { name: 'Hau', color: 'red' };
this.setState({ color: 'green' });
// --> { name: 'Hau', color: 'green' }

// useState() in functional component: REPLACING
const [person, setPerson] = useState({ name: 'Hau', color: 'red' });
setPerson({ color: 'green' });
// --> { color: 'green' }
```

- Solution

```js
// useState() in functional component: REPLACING
const [person, setPerson] = useState({ name: 'Hau', color: 'red' });
setPerson({ ...person, color: 'green' });
// --> { name: 'Hau', color: 'green' }
```

2. initialState chỉ sử dụng cho lần Render đầu tiên

```js
function ColorBox() {
  const [color, setColor] = useState(() => {
    // You're safe here
    // This function will be called once
    const initColor = getComplicatedColor();
    return initColor;
  }));
  function handleBoxClick() {
    setColor('green');
  }

  return (
    <div
      className="color-box"
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
    ></div>
  );
}
```

## Tổng Kết
- useState() giúp functional component có thể dùng state.
- useState() trả về một mảng 2 phần tử [name, setName].
- useState() áp dụng replacing thay vì merging như bên class component.
- Initial state callback chỉ thực thi 1 lần đầu.

## 2 useEffect()
[ref](https://reactjs.org/docs/hooks-effect.html)
[ref](https://www.youtube.com/watch?v=zjUC_W7IOIc&list=PLeS7aZkL6GOsHNoyeEpeL8B1PnbKoQD9m&index=7)

- useEffect là 1 hooks cơ bản
- Sử dụng cho functional component
- Được thự thi sau mỗi lần render
- mỗi hook gồm `side effect` và `clean up (optional)`

example
```js
function useEffect(callback, dependences) {}

function App() {
  // executed before each render
  const [color, setColor] = useState('deeppink');
  // executed after each render
  useEffect(() => {
    // do your side effect here ...
    return () => {
      // Clean up here ...
      // Executed before the next render or unmount
    };
  }, dependences);
  // rendering
  return <h1>Easy Frontend</h1>;
}

dependences = null   -> luôn được chạy với mỗi lần render
dependences = []     -> chạy đúng 1 lần so với lần render đầu tiên
dependences = [demo] -> nếu demo thay đổi thì nó sẽ chạy sau lần render
```

```
MOUNTING
- rendering
- run useEffect()
UPDATING
- rendering
- run `useEffect() cleanup` nếu dependencies thay đổi.
- run `useEffect()` nếu dependencies thay đổi.
UNMOUNTING
- run `useEffect() cleanup`.
```

## useCallback()
> Là 1 react hookhook giúp tạo ra 1 `memoized callback` và chỉ tạo ra callback khi có dependences thay đổi

- Nhận vào 2 tham số: 1 là function, 2 là dependencies.
- Return memoized callback
- Chỉ tạo ra function mới khi dependencies thay đổi.
- Nếu dùng empty dependencies thì không bao giờ tạo ra function mới.

```js
// Mỗi lần App re-render
// --> tạo ra một function mới
// --> Chart bị re-render
function App() {
  const handleChartTypeChange = (type) => {}
  return <Chart onTypeChange={handleChartTypeChange} />;
}
```

```js
// Mỗi lần App re-render
// --> nhờ có useCallback() nó chỉ tạo function một lần đầu
// --> Nên Chart ko bị re-render.
function App() {
  const handleChartTypeChange = useCallback((type) => {}, [])
  return <Chart onTypeChange={handleChartTypeChange} />;
}
```

## useMemo()
> Là một react hooks giúp mình tạo ra một memoized value và chỉ tính toán ra value mới khi
> dependencies thay đổi.

- Nhận vào 2 tham số: 1 là function, 2 là dependencies.
- Return memoized value
- Chỉ tính toán value mới khi dependencies thay đổi.
- Nếu dùng empty dependencies thì không bao giờ tính toán lại value mới.

```js
// Mỗi lần App re-render
// --> tạo ra một mảng mới
// --> Chart bị re-render do props thay đổi
function App() {
  const data = [{}, {}, {}];
  return <Chart data={data} />;
}
```

```js
// Mỗi lần App re-render
// --> nhờ có useMemo() nó chỉ tạo ra cái mảng 1 lần đầu
// --> Nên Chart ko bị re-render.
function App() {
  const data = useMemo(() => [{}, {}, {}], [])
  return <Chart data={data} />;
}
```

###  So sánh useCallback() vs useMemo()
GIỐNG NHAU
- Đều áp dụng kĩ thuật memoization.
- Đều nhận vào 2 tham số: function và dependencies.
- Đều là react hooks, dùng cho functional component.
- Dùng để hạn chế những lần re-render dư thừa (micro improvements).

KHÁC NHAU
- useCallback return memoized callback
- useMemo return memoized value