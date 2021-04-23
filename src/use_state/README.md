## useState()
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