import { createStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";
export const store = createStore(reducer);
