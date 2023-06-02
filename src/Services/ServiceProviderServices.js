// APP INSTANCE
import AppInstance from "../Config/global.axios";

/* ---- AUTH SERVICES ---- */

export class AuthServicesSP {
  // REGISTER USER
  async SignUp (user) {
    const response = await AppInstance({
      url: "/sign-up/sp",
      method: "POST",
      data: user
    });
    return response;
  }

  // SIGN IN USER
  async SignIn (user) {
    const response = await AppInstance({
      url: "/sign-in/sp",
      method: "POST",
      data: user
    });
    return response;
  }

  // FORGOT THE PASSWORD
  async ForgotPassword (obj) {
    const response = await AppInstance({
      url: "/forgot-password/sp",
      method: "POST",
      data: obj
    });
    return response;
  }

  // VALIDATE THE SECURITY QUESTION
  async ValidateQuestion (obj) {
    const response = await AppInstance({
      url: "/validate-question/sp",
      method: "POST",
      data: obj
    });
    return response;
  }
}

// SEVICES_SP

export default class ServiceProviderServices {

  /* SERVICES */

  // CREATE SINGLE SERVICE
  async CreateSingleService (service) {
    const response = await AppInstance({
      url: "/services/create",
      method: "POST",
      data: service
    });
    return response;
  }

  // GET ALL SERVICES OF A SINGLE SERVICE PROVIDER
  async GetAllServices_SP(id) {
    const response = await AppInstance({
      url: `/services/userId/${id}`,
      method: "GET"
    });
    return response;
  }

  // UPDATE SINGLE SERVICE
  async UpdateSingleService(id, service) {
    const response = await AppInstance({
      url: `/services/${id}`,
      method: "PUT",
      data: service
    });
    return response;
  }

  // DELETE SINGLE SERVICE (HARD DELETE)
  async DeleteSingleService(id) {
    const response = await AppInstance({
      url: `/services/${id}`,
      method: "DELETE"
    });
    return response;
  }
}

// YOUTUBE SERVICES

export class YTAccountsServices {
  // CREATE NEW YOUTUBE ACCOUNT
  async AddYTAccount (account) {
    console.log(account)
    const response = await AppInstance({
      url: "/yt-accounts/create",
      method: "POST",
      data: account
    });
    console.log(response);
    return response;
  }

  //  GET ALL YOUTUBE ACCOUNTS WITH DETAILS
  async GetAllYTAccountDetails () {
    const response = await AppInstance({
      url: `/yt-accounts`,
      method: "GET",
    });
    return response;
  }

  //  GET SINGLE YOUTUBE ACCOUNT WITH DETAILS
  async GetYTAccountDetails (id) {
    const response = await AppInstance({
      url: `/yt-accounts/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET ALL ACCOUNTS OF SPECIFIC USER (ID)
  async GetAllYTAccountsOfUser (id) {
    const response = await AppInstance({
      url: `/yt-accounts/userId/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE SINGLE YOUTUBE ACCOUNT
  async UpdateYTAccount (id, account) {
    console.log(id);
    const response = await AppInstance({
      url: `/yt-accounts/${id}`,
      method: "PUT",
      data: account
    });
    return response;
  }

    // DELETE SINGLE YOUTUBE ACCOUNT
    async DeleteYTAccount (id) {
      console.log(id)
      const response = await AppInstance({
        url: `/yt-accounts/${id}`,
        method: "DELETE",
      });
      return response;
    }
}

// INSTAGRAM SERVICES

export class IGAccountsServices {
  // CREATE NEW INSTAGRAM ACCOUNT
  async AddIGAccount (account) {
    const response = await AppInstance({
      url: "/ig-accounts/create",
      method: "POST",
      data: account
    });
    console.log(response);
    return response;
  }

  //  GET ALL INSTAGRAM ACCOUNTS
  async GetAllIGAccount () {
    const response = await AppInstance({
      url: `/ig-accounts`,
      method: "GET",
    });
    return response;
  }

  //  GET SINGLE INSTAGRAM ACCOUNT WITH DETAILS
  async GetIGAccountDetails (id) {
    const response = await AppInstance({
      url: `/ig-accounts/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET ALL ACCOUNTS OF SPECIFIC USER (ID)
  async GetAllIGAccountsOfUser (id) {
    const response = await AppInstance({
      url: `/ig-accounts/userId/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE SINGLE INSTAGRAM ACCOUNT
  async UpdateIGAccount (id, account) {
    const response = await AppInstance({
      url: `/ig-accounts/${id}`,
      method: "PUT",
      data: account
    });
    return response;
  }

    // DELETE SINGLE INSTAGRAM ACCOUNT
    async DeleteIGAccount (id) {
      const response = await AppInstance({
        url: `/ig-accounts/${id}`,
        method: "DELETE",
      });
      console.log(response)
      return response;
    }
}

// TIKTOK SERVICES

export class TTAccountsServices {
  // CREATE NEW TIKTOK ACCOUNT
  async AddTTAccount (account) {
    const response = await AppInstance({
      url: "/tt-accounts/create",
      method: "POST",
      data: account
    });
    console.log(response);
    return response;
  }

  //  GET ALL TIKTOK ACCOUNTS
  async GetAllTTAccount () {
    const response = await AppInstance({
      url: `/tt-accounts`,
      method: "GET",
    });
    return response;
  }

  //  GET SINGLE TIKTOK ACCOUNT WITH DETAILS
  async GetTTAccountDetails (id) {
    const response = await AppInstance({
      url: `/tt-accounts/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET ALL ACCOUNTS OF SPECIFIC USER (ID)
  async GetAllTTAccountsOfUser (id) {
    const response = await AppInstance({
      url: `/tt-accounts/userId/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE SINGLE TIKTOK ACCOUNT
  async UpdateTTAccount (id, account) {
    const response = await AppInstance({
      url: `/tt-accounts/${id}`,
      method: "PUT",
      data: account
    });
    return response;
  }

    // DELETE SINGLE TIKTOK ACCOUNT
    async DeleteTTAccount (id) {
      const response = await AppInstance({
        url: `/tt-accounts/${id}`,
        method: "DELETE",
      });
      return response;
    }
}