import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userList from "./userList";

export default combineReducers({
  auth: authReducer,
  userList,
});
