import {FETCH_USERDATA} from "../types";

export const userLocalDataReducer = (
  state = {
    userLocalData: JSON.parse(localStorage.getItem("userLocalData") || "[]"),
  },
  action
) => {
  switch (action.type) {
    case FETCH_USERDATA:
      return { userLocalData: action.payload.userLocalData };
    default:
      return state;
  }
};
