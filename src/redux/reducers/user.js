const initialState = {
  number: 0
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export default userReducer;