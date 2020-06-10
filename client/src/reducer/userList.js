import { USER_LIST, USER_UPDATE, USER_REMOVE } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case USER_LIST:
      state = [...state, ...action.payload];
      return state;

    case USER_REMOVE:
      state = [...state.filter((user) => user._id != action.payload._id)];
      return state;

    case USER_UPDATE:
      state = [
        ...state.filter((user) => user._id != action.payload._id),
        action.payload,
      ];
      return state;

    default:
      return state;
  }
}
