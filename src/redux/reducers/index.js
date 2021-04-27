import countReducer from "./count";
import hobbyReducer from "./hobby";

const rootReducers = combineReducers({
  hobby: hobbyReducer,
  count: countReducer
});

export default rootReducers;