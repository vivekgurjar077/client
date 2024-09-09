import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://91.108.104.25:8800/",
  withCredentials: true,
  
});

export default newRequest;
