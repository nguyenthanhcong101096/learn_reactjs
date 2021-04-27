# Redux
![](https://miro.medium.com/max/2880/1*T0kjwacFHNZ_p8AC2lv-iA.jpeg)

- Store gồm có:
  - State: là dữ liệu hiện tại được lưu trên state.
  - Reducer: là hàm biến đổi state cũ sang state mới.
- Dispatcher: quản lý middlewares và chuyển dữ liệu xuống reducer.
  - Action = plain javascript object mô tả hành động.

## Setup
### Cài đặt package react-redux và redux
```
npm install --save redux react-redux
```

### Tổ chức folder theo nhóm
```
src
|__ reducers
| |__ hobby.js
| |__ todo.js
| |__ ... (one reducer per file)
| |__ index.js (root reducer)
|
|__ actions
| |__ hobby.js
| |__ todo.js
| |__ ...
|
|__ pages
| |__ HomePage/index.jsx (connect to redux)
|
|__ store.js (reducers, init state, middlewares)
|__ index.js (setup Store Provider)
```

- Setup reducers và root reducer

```js
// reducers/hobby.js

const initialState = {
  list: ["Listening to music"],
  selectId: null,
}

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [...state.list];
      newList.push(action.payload);
    }
    default:
      return state;
  }
}

export default hobbyReducer;
```

```js
// reducers/index.js (ROOT)
const rootReducer = combineReducers({
  hobby: hobbyReducer,
})

export default rootReducer;
```

- setup store

```js
// src/store.js
  const store = createStore(rootReducer);
  export default store;
```

- Setup Store Provider cho toàn app src/index.js

```js
// src/index.js
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
```

- Connect vào redux từ reactjs component
  - Với class component: dùng HOC connect()
  - Với functional component: dùng hooks useSelector() và useDispatch()

```js
function HomePage(props) {
  const hobbyList = useSelector(state => state.hobby.list);
  const dispatch = useDispatch();
  const handleAddHobbyClick = () => {
    const newHobby = 'Coding';
    dispatch({
      type: 'ADD_HOBBY',
      payload: newHobby,
    });
  }
  return (
    <div className="home-page">
      <HobbyList data={hobbyList} />
      <button onClick={handleAddHobbyClick}>Add new hobby</button>
    </div>
  );
}
export default HomePage;
```

## Tham khảo
- [getting-started](https://redux.js.org/introduction/getting-started)
- [how-does-redux-work](https://daveceddia.com/how-does-redux-work/)
- [redux-and-react-an-introduction](https://jakesidsmith.com/blog/post/2017-11-18-redux-and-react-an-introduction/)