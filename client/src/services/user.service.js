import axios from "axios";
function add(req) {
  return axios.post("auth/signup", req);
}
function login(req) {
  return axios.post("auth/login", req);
}

function get(req) {
  return axios.post("api/user", req);
}
export const UserService = { add, login };
