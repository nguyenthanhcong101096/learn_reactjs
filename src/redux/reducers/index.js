import userReducer from "./user";
import hobbyReducer from "./hobby";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  hobby: hobbyReducer,
  count: userReducer,
});

export default rootReducers;