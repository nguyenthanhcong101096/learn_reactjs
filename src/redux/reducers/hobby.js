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