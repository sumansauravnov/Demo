import { FORGOT_EMAIL } from "./action";

const initState = {
  forgotEmail: "",
};

export function Reducer(state, action) {
  switch (action.type) {
    case FORGOT_EMAIL:
      return { ...state, forgotEmail: action.payload };
    default:
      return state;
  }
}
