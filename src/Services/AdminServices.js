import AppInstance from "../Config/global.axios";

/* ---- AUTH SERVICES ---- */
export class AuthServices {
  // REGISTER USER
  async SignUp(user) {
    const response = await AppInstance({
      url: "/sign-up/admin",
      method: "POST",
      data: user,
    });
    return response;
  }

  // SIGN IN USER
  async SignIn(user) {
    const response = await AppInstance({
      url: "/sign-in/admin",
      method: "POST",
      data: user,
    });
    console.log(response)
    return response;
  }

  // FORGOT THE PASSWORD
  async ForgotPassword(obj) {
    const response = await AppInstance({
      url: "/forgot-password/admin",
      method: "POST",
      data: obj,
    });
    return response;
  }

  // VALIDATE THE SECURITY QUESTION
  async ValidateQuestion(obj) {
    const response = await AppInstance({
      url: "/validate-question/admin",
      method: "POST",
      data: obj,
    });
    return response;
  }
}

/* ---- CATEGORIES ---- */
export class CategoriesServices {
  // CREATE NEW CATEGORY
  async CreateSingleCategory(category) {
    const response = await AppInstance({
      url: "/categories/create",
      method: "POST",
      data: category,
    });
    return response;
  }

  // GET ALL CATEGORIES
  async GetAllCategories() {
    const response = await AppInstance({
      url: "/categories",
      method: "GET",
    });
    return response;
  }

  // GET SINGLE CATEGORY
  async GetSingleCategory(id) {
    const response = await AppInstance({
      url: `/categories/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE EXISTING CATEGORY
  async UpdateSingleCategory(id, category) {
    console.log(category)
    const response = await AppInstance({
      url: `/categories/${id}`,
      method: "PUT",
    });
    console.log(response)
    return response;
  }

  // DELETE SINGLE CATEGORY
  async DeleteSingleCategory(id) {
    const response = await AppInstance({
      url: `/categories/${id}`,
      method: "DELETE",
    });
    console.log(response)
    return response;
  }
}

/* ---- SUB-CATEGORIES ---- */
export class SubCategoriesServices {

  // ADD SUB-CATEGORY TO AN EXISTING CATEGORY
  async AddSubCategory(subCategory) {
    const response = await AppInstance({
      url: "/sub-categories/create",
      method: "POST",
      data: subCategory
    });
    console.log(response)
    return response;
  }

  // GET ALL SUB-CATEGORY

  async GetAllSubCategory() {
    const response = await AppInstance({
      url: "/sub-categories",
      method: "GET"
    });
    return response;
  }

  // GET SINGLE SUB-CATEGORY
  async GetSingleSubCategory(id) {
    const response = await AppInstance({
      url: `/sub-categories/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE EXISTING SUB-CATEGORY
  async UpdateSingleSubCategory(id, subCategory) {
    const response = await AppInstance({
      url: `/sub-categories/${id}`,
      method: "PUT",
      data: subCategory
    });
    console.log(response)
    return response;
  }

  // DELETE EXISTING SUB-CATEGORY
  async DeleteSubCategory(id) {
    const response = await AppInstance({
      url: `/sub-categories/${id}`,
      method: "DELETE",
    });
    return response;
  }
}
/* ---- USERS ---- */
export class UsersServices {
  // GET ALL SERVICE PROVIDER
  async GetAllUsers() {
    const response = await AppInstance({
      url: "/service-providers",
      method: "GET",
    });
    return response;
  }

  // GET SINGLE SERVICE PROVIDER
  async GetSingleUser(id) {
    const response = await AppInstance({
      url: `/service-providers/${id}`,
      method: "GET",
    });
    return response;
  }

  // UPDATE SINGLE SERVICE PROVIDER
  async UpdateSingleUser(id, user) {
    const response = await AppInstance({
      url: `/service-providers/${id}`,
      method: "PUT",
      data: user,
    });
    return response;
  }

  // DELETE SINGLE SERVICE PROVIDER
  async DeleteSingleUser(id) {
    const response = await AppInstance({
      url: `/service-providers/${id}`,
      method: "DELETE",
    });
    return response;
  }
}

/* ---- SERVICES ---- */
export class ServicesService {
  // GET ALL SERVICES
  async GetAllServices() {
    const response = await AppInstance({
      url: `/services`,
      method: "GET",
    });
    return response;
  }

  // GET SINGLE SERVICE
  async GetSingleServiceDetails(id) {
    const response = await AppInstance({
      url: `/services/${id}`,
      method: "GET",
    });
    return response;
  }

  // GET FILTERED SERVICES
  async GetFilteredServices(x) {
    const response = await AppInstance({
      url: "/services/filtered",
      method: "POST",
      data: x,
    });
    return response;
  }

  // UPDATE SINGLE SERVICE
  async UpdateSingleService(id, service) {
    const response = await AppInstance({
      url: `/services/${id}`,
      method: "PUT",
      data: service,
    });
    return response;
  }
}