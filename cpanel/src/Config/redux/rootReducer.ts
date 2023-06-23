import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../../Contexts/counterSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
});
