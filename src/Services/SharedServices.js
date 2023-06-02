// AXIOS APP INSTANCE
import AppInstance from "../Config/global.axios";

export default class SharedServices {

  // USER SIGNING IN
  async SignIn(user) {
    const response = await AppInstance({
      url: `/sign-in/admin`,
      method: "POST",
      data: user
    });
    return response;
  }

  // USER SIGNING UP
  async SignUp(user) {
    const response = await AppInstance({
      url: "/users/sign-up",
      method: "POST",
      data: user
    });
    return response;
  }

  // SIGN IN USER WITH GOOGLE
  async SignInWithGoogle() {
    const response = await AppInstance({
      url: "/auth/google/callback",
      method: "GET",
    });
    console.log(response, "SERVICE");
    return response;
  }

  // SIGN IN WITH FACEBOOK
  async SignInWithFacebook(user) {
    const response = await AppInstance({
      url: "",
      method: "GET",
      data: user
    });
    return response;
  }

  async SendMail(data) {
    const response = await AppInstance({
      url: "/send-mail",
      method: "POST",
      data
    });
    return response;
  }

  async UpdateProfile(id, profile) {
    const response = await AppInstance({
      url: `/users/${id}`,
      method: "PUT",
      data: profile
    });
    return response;
  }

  // UPDATE USER PROFILE PICTURE
  async UpdateUserDP (id, x) {
    const response = await AppInstance({
      url: `/users/${id}/profile`,
      method: "PUT",
      data: x
    });
    return response;
  }

  // GET REFRESH TOKEN
  async GetRefreshToken () {
    const response = await AppInstance({
      url: "/refresh",
      method: "GET",
    });
    return response;
  }
}