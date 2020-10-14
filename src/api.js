import axios from "axios";
import user from "./user";

export default () =>
  axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api/`,
    headers: { Authorization: `Bearer ${user("token") || ""}` },
  });
