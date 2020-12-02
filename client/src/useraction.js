import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {userLocalDataReducer} from './reducers/userDataReaducer';
/*
import { productsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { cartStateReducer } from "./reducers/cartStateReducer";
*/
const initialState = {};

const userActionStore = createStore(
  combineReducers({
    userLocalData: userLocalDataReducer,
  }),
  initialState,
  applyMiddleware(thunk)
);

export default userActionStore;
