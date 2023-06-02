import axios from "axios";
import AppInstance from "../Config/global.axios";

export default class UserServices {

  // HANDLE USER INFO

  // Login User
  async LoginUser(user) {
    // return await axios.post("http://localhost:3020/users/login", user);
    const response = await AppInstance({
      url: `/users/login?token=${true}`,
      method: "POST",
      data: user
    });
    console.log(response);
    return response;
  }

  // Create User
  async CreateNewUser(user) {
    return await axios.post("http://localhost:3020/users/sign-up", user);
  }

  // Create User
  async CreateNewUserWithGoogle(user) {
    return await axios.post("http://localhost:3020/users/sign-up/google", user);
  }

  // LOGIN USER WITH GOOGLE
  async LoginUserWithGoogle(user) {
    return await axios.post("http://localhost:3020/users/login/google", user);
  }

  // Get All Users
  async GetAllUsers() {
    const response = await axios.get("http://localhost:3020/users");
    return response;
  }

  // GET SINGLE USER
  async GetSingleUser(id) {
    return await axios.get(`http://localhost:3020/users/${id}`);
  }

  // Update Single User
  async UpdateSingleUser(id, user) {
    console.log(id, user);
    return await axios.put(`http://localhost:3020/users/${id}`, user);
  }

  // Delete Single User
  async DeleteSingleUser(id) {
    return await axios.delete(`http://localhost:3020/users/${id}`);
  }

  // HANDLE USER SERVICES

  // CREATE SINGLE SERVICE
  async CreateSingleService(service) {
    return await axios.post("http://localhost:3020/services/create", service);
  }

  // GET ALL SERVICES
  async GetAllServices() {
    return await axios.get("http://localhost:3020/services");
  }

  // GET ALL SERVICES OF LOGGED IN USER
  async GetAllServices_SP(id) {
    return await axios.get(`http://localhost:3020/services/by-user/${id}`);
  }

  // GET FILTERED SERVICES ON CATEGORY BASIS
  async FilterServices(data) {
    return await axios.post("http://localhost:3020/services/filtered", data);
  }

  // UPDATE SINGLE SERVICE
  async UpdateSingleService(id, service) {
    return await axios.put(`http://localhost:3020/services/${id}`, service);
  }

  // GET SINGLE SERVICE
  async GetSingleService(id) {
    return await axios.get(`http://localhost:3020/services/${id}`);
  }

  // SEDNING MAIL
  async SendMail(data) {
    return await axios.post("http://localhost:3020/send-mail", data);
  }
}