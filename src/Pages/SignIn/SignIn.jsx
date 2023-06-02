// HOOKS
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// COMPONENTS & OTHERS
import "./SignIn.css";

// SERVICES
import { AuthServicesSP } from "../../Services/ServiceProviderServices";
import { AuthServicesCOM } from "../../Services/CompanyServices";
// import CompanySignIn from "../SignInRoles/CompanySignIn/CompanySignIn";

// REACT-BOOTSTRAP
import { Toast } from "bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Swal from "sweetalert2";

const SignIn = () => {
  localStorage.clear();

  return (
    <>
      {/* CONTAINER */}
      <div className="container d-flex align-items-center justify-content-center form-height-login pt-24px pb-24px">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card">
              {/* CARD */}
              <div className="card-header" style={{ background: "#88aaf3" }}>
                <div className="ec-brand text-center text-light">
                  <h1 className="m-0">LOGO</h1>
                </div>
              </div>

              <div className="card-body">
                <Tabs
                  defaultActiveKey="SP"
                  id="justify-tab-example"
                  className="mb-5"
                  justify
                // onSelect={handleTabSelect}
                >
                  <Tab eventKey="SP" title="Service Provider">
                    <SPSignIn />
                  </Tab>

                  <Tab eventKey="Company" title="Company">
                    <CompanySignIn />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

/* ---- SIGN IN - SERVICE PROVIDER ---- */
const SPSignIn = () => {
  const navigate = useNavigate();
  const Services = new AuthServicesSP();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // Getting Login Form & API call to validate
  const formSubmit = async (user) => {
    document.querySelector(".sign-in").innerText = "Please wait..";
    const { data } = await Services.SignIn(user);

    // SUCCESFULL LOGIN - USER APPROVED
    if (data.messageType === "success" && data.status === "APPROVED") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      if (localStorage.getItem("tempUser")) localStorage.removeItem("tempUser");
      localStorage.setItem("token", JSON.stringify(data.token));
      return navigate("/dashboard");
    }

    // USER PENDING
    if (data.messageType === "success" && data.status === "PENDING") {
      document.querySelector(".sign-in").innerText = "Sign In";
      return new Swal({
        title: "Request on Pending",
        text: "Please wait, your request is being processed. Till then, you won't be able to login.",
        icon: "info",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay, I understand.",
      });
    }

    // USER REJECTED
    if (data.messageType === "success" && data.status === "REJECTED") {
      document.querySelector(".sign-in").innerText = "Sign In";
      return new Swal({
        title: "Request is Rejected",
        text: "Your request is rejected by Admin. You won't be able to login.",
        icon: "error",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay, I understand.",
      });
    }

    // INVALID CREDENTIALS
    if (data.messageType === "error") {
      document.querySelector(".sign-in").innerText = "Sign In";
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    return document.querySelector(".sign-in").innerText = "Sign In";
  };

  return (
    <>
      {/* FORM */}
      <div className="px-5">
        <h4 className="text-dark mb-3">Sign In</h4>
        {/* FORM */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="form-group col-md-12 mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", { required: true, maxLength: 30 })}
              />
              {formState.isSubmitted && formState.errors.email ? (
                <span className="text-danger">*required</span>
              ) : null}
            </div>

            <div className="form-group col-md-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register("password", { required: true, maxLength: 20 })}
              />
              {formState.isSubmitted && formState.errors.password ? (
                <span className="text-danger">*required</span>
              ) : null}
            </div>

            <div className="col-md-12">
              <div className="d-flex my-2 justify-content-end">
                <p>
                  <span className="underline-on-hover">Forgot Password?</span>
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 sign-in"
              >
                Sign In
              </button>
              <p className="sign-upp">
                Don't have an account yet?{" "}
                <span
                  className="underline-on-hover link-primary"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

/* ---- SIGN IN - COMPANY ---- */
const CompanySignIn = () => {
  const navigate = useNavigate();
  const Services = new AuthServicesCOM();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // Getting Login Form & API call to validate
  const formSubmit = async (user) => {
    document.querySelector(".sign-in").innerText = "Please wait..";
    const { data } = await Services.SignIn(user);

    // // SUCCESFULL LOGIN - USER APPROVED
    if (data.messageType === "success" && data.status === "APPROVED") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      if (localStorage.getItem("tempUser")) localStorage.removeItem("tempUser");
      localStorage.setItem("token", JSON.stringify(data.token));
      return navigate("/dashboard");
    }

    // // USER PENDING
    if (data.messageType === "success" && data.status === "PENDING") {
      document.querySelector(".sign-in").innerText = "Sign In";
      return new Swal({
        title: "Request on Pending",
        text: "Please wait, your request is being processed. Till then, you won't be able to login.",
        icon: "info",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay, I understand.",
      });
    }

    // // USER REJECTED
    if (data.messageType === "success" && data.status === "REJECTED") {
      document.querySelector(".sign-in").innerText = "Sign In";
      return new Swal({
        title: "Request is Rejected",
        text: "Your request is rejected by Admin. You won't be able to login.",
        icon: "error",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay, I understand.",
      });
    }

    // // INVALID CREDENTIALS
    if (data.messageType === "error") {
      document.querySelector(".sign-in").innerText = "Sign In";
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    return (document.querySelector(".sign-in").innerText = "Sign In");
  };

  return (
    <>
      <div className="px-5">
        <h4 className="text-dark mb-3">Sign In</h4>
        {/* FORM */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="row">
            <div className="form-group col-md-12 mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", { required: true, maxLength: 30 })}
              />
              {formState.isSubmitted && formState.errors.email ? (
                <span className="text-danger">*required</span>
              ) : null}
            </div>

            <div className="form-group col-md-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register("password", { required: true, maxLength: 20 })}
              />
              {formState.isSubmitted && formState.errors.password ? (
                <span className="text-danger">*required</span>
              ) : null}
            </div>

            <div className="col-md-12">
              <div className="d-flex my-2 justify-content-end">
                <p>
                  <span className="underline-on-hover">Forgot Password?</span>
                </p>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                id="sign-in"
              >
                Sign In
              </button>
              <p className="sign-upp">
                Don't have an account yet?{" "}
                <span
                  className="underline-on-hover link-primary"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
