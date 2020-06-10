import { USER_AUTH_LOGIN, USER_AUTH_LOGOUT } from "../actions/types";

export default function (
  state = { loading: true, user: null, isAuthenticated: false },
  action
) {
  switch (action.type) {
    case USER_AUTH_LOGIN:
      return {
        loading: false,
        user: action.payload || null,
        isAuthenticated: action.payload && true,
      };
    case USER_AUTH_LOGOUT:
      debugger;
      return { loading: false, user: null, isAuthenticated: false };

    default:
      return state;
  }
}
