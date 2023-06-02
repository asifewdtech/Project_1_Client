import axios from "axios";

const AppInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// APP INTERCEPTOR TACKLING WITH REQUEST
AppInstance.interceptors.request.use(async (request) => {
  const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : true;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
}, (error) => {
  console.log("ERR", error);
  throw error;
})

// APP INTERCEPTOR TACKLING WITH RESPONSE
AppInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log("ERR", error);
  throw error;
});

export default AppInstance;