import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../../Contexts/counterSlice";
import userReducer from "../../Contexts/userSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});
