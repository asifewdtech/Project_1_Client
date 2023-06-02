// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// SERVICES
import { AuthServicesCOM } from "../../Services/CompanyServices";
import { AuthServicesSP } from "../../Services/ServiceProviderServices";
// import SharedServices from "../../Services/SharedServices";
// import UserServices from "../../Services/UserServices";
import { Toast } from "bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

// ICONS
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {

  const ServicesSP = new AuthServicesSP();
  const ServicesCOM = new AuthServicesCOM();
  const navigate = useNavigate();

  // FORM
  const { register, handleSubmit, reset, getValues, watch } = useForm({ defaultValues: { email: "", password: "", confirmPassword: "", firstName: "", lastName: "", gender: "", role: "" } });

  useEffect(() => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    if (localStorage.getItem("userLoggedIn")) localStorage.removeItem("userLoggedIn");
    // if(localStorage.getItem("tempUser")) navigate("/sign-up-details");
  }, [])
  // SUBMIT FORM
  const submitForm = async (user) => {
    creatingNewUser(user);
  }

  // API CALL ACCORDING TO THE USER ROLE
  async function API_Call (user) {
    switch (user.role) {
      case "SP":
        let x = await ServicesSP.SignUp({
          ...user, 
          withFacebook: {
          isRegistered: false,
          accessToken: null
        },
        withGoogle: {
          isRegistered: false,
          accessToken: null
        }});
        return x;
    
      case "COM":
        let y = await ServicesCOM.SignUp({
          ...user, 
          withFacebook: {
          isRegistered: false,
          accessToken: null
        },
        withGoogle: {
          isRegistered: false,
          accessToken: null
        }});
        return y;
      default:
        break;
    }
  }

  // API CALL - CREATING USER
  const creatingNewUser = async (user) => {
    const { data } = await API_Call(user);

    // EMAIL IS REGISTERED ALREADY
    if (data.messageType === "warning") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").classList.add("bg-warning", "text-dark");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      return;
    }

    // IF ANY PROBLEM OCCURS
    if (data.messageType === "danger") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      return;
    }

    // RESET FORM IF NO ERROR OCCURED
    if (data.messageType === "success") {
      new Swal({
        title: "Request Sent",
        text: "Your request has been sent to Admin. Please wait while your request is being processed. Till then, you won't be able to login.",
        icon: "success",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay, I understand."
      });
      reset({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
        role: 0
      });
      navigate("/");
      return;
    }
  }

  async function google() {
    const googleLoginUrl = `http://localhost:3001/auth/google/callback`;
    const url = `http://localhost:3001/auth/login/success`;
    window.open(googleLoginUrl, "_self");
		const { data } = await axios.get(url, { withCredentials: true });
    localStorage.setItem("tempUser", JSON.stringify({firstName: data.user._json.given_name,
                                                      lastName: data.user._json.family_name,
                                                      email: data.user._json.email,
                                                      registeredWithGoogle: true,
                                                      registeredWithFacebook: {isRegistered: false, accessToken: null}}));
  };

  async function facebook() {
    const fbLoginUrl = `https://localhost:8080/auth/facebook/callback`;
    const url = `http://localhost:3001/auth/login/success`;
    window.open(fbLoginUrl, "_self");
		const { data } = await axios.get(url, { withCredentials: true });
    localStorage.setItem("tempUser", JSON.stringify({firstName: data.user.displayName,
                                                    registeredWithGoogle: false,
                                                    registeredWithFacebook: {isRegistered: true, accessToken: null}}));
  };

  useEffect(() => {
    if(localStorage.getItem("tempUser")) localStorage.removeItem("tempUser");
  }, [])

  const authStyle = {
    display: "grid",
    placeContent: "cneter"
  }

  return <>
    {/* CONTAINER */}
    <div className="row vh-100 justify-content-center align-items-center p-3 ">
      <div className="col-11 col-md-6 col-lg-6">
        <div className="card">
          <div className="card-header text-center text-light" style={{ background: "#88aaf3" }}>
            <h1 className="m-0">LOGO</h1>
          </div>

          {/* CARD */}
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 p-3">
                <h4 className="text-dark mb-3">Sign Up</h4>

                {/* FORM */}
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="row">
                    <div className="form-group col-md-6 mb-4">
                      <input type="text" className="form-control" placeholder="First Name"
                        {...register("firstName", { required: true, maxLength: 30 })} />
                    </div>

                    <div className="form-group col-md-6 mb-4">
                      <input type="text" className="form-control" placeholder="Last Name"
                        {...register("lastName", { required: true, maxLength: 30 })} />
                    </div>

                    <div className="form-group col-md-12 mb-4">
                      <input type="email" className="form-control" id="email" placeholder="Email"
                        {...register("email", { required: true, maxLength: 30 })} />
                    </div>

                    <div className="form-group col-md-12 ">
                      <input type="password" className="form-control" id="password" placeholder="Password"
                        {...register("password", { required: true, maxLength: 20 })} />
                    </div>

                    <div className="form-group col-md-12 ">
                      <input type="password" className="form-control" placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true, maxLength: 20 })} />
                      {getValues("password") === watch("confirmPassword") ? null : <p className="text-danger">Password doesn't match..</p>}
                    </div>

                    <div className="form-group col-md-6">
                      <select className="form-select" aria-label="Default select example"
                        {...register("role", { required: true })}>
                        <option value="" defaultValue disabled>Signup As</option>
                        <option value="SP">Service Provider</option>
                        <option value="COM">Company</option>
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <select className="form-select"
                        {...register("gender", { required: true })}>
                        <option value="" defaultValue disabled>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {watch("role") === "COM" ? <>
                      <div className="from-group col-md-12 mb-3">
                        <input className="form-control" type="text" placeholder="Company Title" 
                        {...register("companyTitle")} />
                      </div>
                    </> : null}

                    <div className="col-md-12">
                      <button type="submit" className="btn btn-block mb-4 text-light" style={{ background: "rgb(136, 170, 243)" }}>Sign Up</button>
                      <p className="sign-upp">Already have an account?&nbsp;
                        <span className="link-primary underline-on-hover" onClick={() => navigate("/")}>Sign in</span>
                      </p>
                    </div>

                  </div>
                </form>

              </div>

              {/* SIGN UP WITH GOOGLE / FACEBOOK */}
              <div style={authStyle} className="col-md-6 p-3 text-center border-start align-items-center">
                <div className="col-12 justify-content-center align-items-center">
                  <h4>Sign up with</h4>

                  <button className="btn btn-light col-sm-8 col-12 mt-3 border py-2 d-inline-flex align-items-center" onClick={() => google()}>
                    <FcGoogle style={{ width: "30px", height: "30px", }} />
                    <span className="m-0 p-2 w-100">Continue with Google</span>
                  </button>
                  <button className="btn btn-light col-sm-8 col-12 mt-3 border py-2 d-inline-flex align-items-center" onClick={facebook}>
                    <BsFacebook style={{ width: "30px", height: "30px", fill: "#0d6efd", }} />
                    <span className="m-0 p-2 w-100">Continue with Facebook</span>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default SignUp;

// SING UP DETAILS
export const SignUpDetails = () => {

  // const Shared = new SharedServices();
  // const navigate = useNavigate();
  // const tempUser = JSON.parse(localStorage.getItem("tempUser"));
  // // const tempUser = {email: "aliabbasadil910@gmail.com", firstName: "Ali", lastName: "Abbas"};

  // // FORM
  // const { register, handleSubmit, getValues, watch, setValue } = useForm({ defaultValues: { email: "", password: "", confirmPassword: "", firstName: "", lastName: "", gender: "", role: "" } });

  // // SUBMIT FORM
  // const submitForm = async (user) => {
  //   const { data } = await Shared.SignUp({...tempUser, ...user });
  //   console.log(data);

  //   // USER REGISTERED SUCCESSFULLY
  //   if (data.messageType === "success") {
  //     new Swal({
  //       title: "Request Sent",
  //       text: "Your request has been sent to Admin. Please wait while your request is being processed. Till then, you won't be able to login.",
  //       icon: "success",
  //       backdrop: true,
  //       allowOutsideClick: false,
  //       allowEnterKey: false,
  //       confirmButtonColor: "#88aaf3",
  //       confirmButtonText: "Okay, I understand."
  //     });
  //     navigate("/");
  //     return;
  //   }

  //   // EMAIL EXISTS ALREADY
  //   if (data.messageType === "warning") {
  //     let x = new Toast(".toast", { autohide: true, delay: 3000 });
  //     document.querySelector(".toast").className = "toast align-items-center m-2";
  //     document.querySelector(".toast").classList.add("bg-warning", "text-dark");
  //     document.querySelector(".toast-body").innerText = data.message;
  //     x.show();
  //     return;
  //   }
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("token")) localStorage.removeItem("token");
  //   if (localStorage.getItem("userLoggedIn")) localStorage.removeItem("userLoggedIn");
  //   if (!tempUser) navigate("/sign-up");
  //   if (tempUser) {
  //     setValue("firstName", tempUser.firstName);
  //     setValue("lastName", tempUser.lastName);
  //     setValue("email", tempUser.email);
  //     setValue("email", tempUser.email);
  //   }
  // }, [])

  return <>

  </>
};