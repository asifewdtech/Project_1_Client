// APP INSTANCE
import AppInstance from "../Config/global.axios";


/* ---- AUTH SERVICES ---- */
export class AuthServicesCOM {
  // REGISTER USER
  async SignUp (user) {
    const response = await AppInstance({
      url: "/sign-up/company",
      method: "POST",
      data: user
    });
    return response;
  }

  // SIGN IN USER
  async SignIn (user) {
    const response = await AppInstance({
      url: "/sign-in/company",
      method: "POST",
      data: user
    });
    return response;
  }

  // FORGOT THE PASSWORD
  async ForgotPassword (obj) {
    const response = await AppInstance({
      url: "/forgot-password/company",
      method: "POST",
      data: obj
    });
    return response;
  }

  // VALIDATE THE SECURITY QUESTION
  async ValidateQuestion (obj) {
    const response = await AppInstance({
      url: "/validate-question/company",
      method: "POST",
      data: obj
    });
    return response;
  }
}


export default class CompanyServices {

  // GET ALL SERVICE PROVIDERS
  async GetAllServiceProviders() {
    const response = await AppInstance({
      url: "/service-providers",
      method: "GET",
    });
    return response;
  }

  // GET DETAILS OF A PARTICULAR SERVICE PROVIDER
  async GetServiceProviderDetails(id) {
    const response = await AppInstance({
      url: `/service-provider/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET SERVICES OF A PARTICULAR SERVICE PROVIDER
  async GetAllServicesOfServiceProvider(id) {
    const response = await AppInstance({
      url: `/services/userId/${id}`,
      method: "GET"
    });
    return response;
  }
}

export class Companies {

  // GET ALL COMPANIES
  async GetAllCompanies() {
    const response = await AppInstance({
      url: "/companies",
      method: "GET",
    });
    return response;
  }

  // GET SINGLE COMPANY WITH DETAILS
  async GetSingleCompanyWithDetails(id) {
    const response = await AppInstance({
      url: `/companies/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET ALL APPROVED COMPANIES
  async GetAllApprovedCompanies() {
    const response = await AppInstance({
      url: "/companies/approved",
      method: "GET",
    });
    return response;
  }

  // GET ALL PENDING COMPANIES
  async GetAllPendingCompanies() {
    const response = await AppInstance({
      url: "/companies/pending",
      method: "GET",
    });
    return response;
  }

  // GET ALL REJECTED COMPANIES
  async GetAllRejectedCompanies() {
    const response = await AppInstance({
      url: "/companies/rejected",
      method: "GET",
    });
    return response;
  }

  // UPDATE SINGLE COMPANY
  async UpdateSingleCompany(id, company) {
    const response = await AppInstance({
      url: `/companies/${id}`,
      method: "PUT",
      data: company
    });
    return response;
  }

  // GET SERVICES OF A PARTICULAR SERVICE PROVIDER
  // async GetAllServicesOfServiceProvider(id) {
  //   const response = await AppInstance({
  //     url: `/services/by-user/${id}`,
  //     method: "GET"
  //   });
  //   return response;
  // }


}