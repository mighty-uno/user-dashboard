import { notification } from "antd";
import axios from "axios";
import {
  USER_AUTH_LOGIN,
  USER_LIST,
  USER_UPDATE,
  USER_REMOVE,
  USER_AUTH_LOGOUT,
} from "./types";
import { message } from "antd";

export const login = (req) => async (dispatch) => {
  try {
    const payload = await axios.post("auth/login", req);

    if (payload.data.error) {
      notification.error({
        message: "Sign in",
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_AUTH_LOGIN,
        payload: payload.data,
      });
      notification.success({
        message: "Sign in successfull",
      });
    }
  } catch (e) {
    notification.error({
      message: "Sign in",
      description: "Server Error!",
    });
  }
};
export const logout = (req) => async (dispatch) => {
  try {
    await axios.post("auth/logout", req);
    dispatch({
      type: USER_AUTH_LOGOUT,
      payload: [],
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const fetchUserList = (req = {}) => async (dispatch) => {
  try {
    const payload = await axios.get("api/user/list", req);

    if (payload.data.error) {
      notification.error({
        message: "User List",
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_LIST,
        payload: payload.data,
      });

      return true;
    }
  } catch (e) {
    return false;
  }
};

export const updateUser = (id, req = {}) => async (dispatch) => {
  try {
    const payload = await axios.put(`api/user/${id}`, req);

    if (payload.data.error) {
      notification.error({
        message: "User List",
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_UPDATE,
        payload: payload.data,
      });

      return true;
    }
  } catch (e) {
    return false;
  }
};

export const deleteUser = (id, req = {}) => async (dispatch) => {
  try {
    const payload = await axios.delete(`api/user/${id}`, req);

    if (payload.data.error) {
      notification.error({
        message: "User List",
        description: payload.data.error,
      });
    } else if (payload.data) {
      dispatch({
        type: USER_REMOVE,
        payload: { _id: id },
      });

      return true;
    }
  } catch (e) {
    return false;
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const payload = await axios.get("api/user");

    if (payload.data.error) {
    } else if (payload.data) {
      dispatch({
        type: USER_AUTH_LOGIN,
        payload: payload.data,
      });
    }
  } catch (e) {}
};

export const signup = (req) => async (dispatch) => {
  try {
    const payload = await axios.post("auth/signup", req);
    debugger;
    if (payload.data.error) {
      notification.error({
        message: "Sign-up error",
        description: payload.data.error,
      });
      return false;
    } else if (payload.data.name) {
      notification.success({
        message: "Sign up successfull",
      });
      return true;
    }
  } catch (e) {
    notification.error({
      message: "Sign up",
      description: "Server Error!",
    });
    return false;
  }
};
