import { combineReducers } from "redux";
import studentReducer from "./student-management";

const rootReducer = combineReducers({
  // key: value
  studentReducer,
});

export default rootReducer;
