import { FORGOT_EMAIL, REFRESHER } from "./action";

const initState = {
  forgotEmail: "",
  refresher: false,
};

export function Reducer(state=initState, action) {
  switch (action.type) {
    case FORGOT_EMAIL:
      return { ...state, forgotEmail: action.payload };
    case REFRESHER:
      return {...state, refresher: action.payload };
    default:
      return state;
  }
}
