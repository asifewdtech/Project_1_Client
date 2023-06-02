// HOOKS
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS & OTHERS
import "../SignIn/SignIn.css";
import { Toast } from "bootstrap";
import SharedServices from "../../Services/SharedServices";
import Swal from "sweetalert2";
// import { isLoggedIn } from "../../Utilities/AppUtilities";

const SignIn = () => {
  const navigate = useNavigate();
  const Shared = new SharedServices();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
  });

  // Getting Login Form & API call to validate
  const formSubmit = async (user) => {
    document.getElementById("sign-in").innerText = "Please wait..";
    const { data } = await Shared.SignIn(user);

    // INVALID CREDENTIALS
    if (
      data.message === "Invalid email or Password." &&
      data.messageType === "danger"
    ) {
      document.getElementById("sign-in").innerText = "Sign In";
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className =
        "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    // LOGGED IN SUCCESSFULLY - NAVIGATE TO DASHBOARD
    if (data.messageType === "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className =
        "toast align-items-center m-2";
      document
        .querySelector(".toast")
        .classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      if (localStorage.getItem("tempUser")) localStorage.removeItem("tempUser");
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userLoggedIn", JSON.stringify(data.user));
      return navigate("/dashboard");
    }

    // REQUEST ON PENDING
    if (data.messageType === "warning") {
      document.getElementById("sign-in").innerText = "Sign In";
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

    // REQUEST ON PENDING
    if (data.messageType === "danger") {
      document.getElementById("sign-in").innerText = "Sign In";
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

    return (document.getElementById("sign-in").innerText = "Sign In");
  };

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

              <div className="card-body p-5">
                <h4 className="text-dark mb-3">Sign In - Admin</h4>

                {/* FORM */}
                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="row">
                    <div className="form-group col-md-12 mb-4">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        {...register("email", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      {formState.isSubmitted && formState.errors.email ? (
                        <span className="text-danger">*required</span>
                      ) : null}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        {...register("password", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                      {formState.isSubmitted && formState.errors.password ? (
                        <span className="text-danger">*required</span>
                      ) : null}
                    </div>

                    <div className="col-md-12">
                      <div className="d-flex my-2 justify-content-end">
                        <p>
                          <span className="underline-on-hover">
                            Forgot Password?
                          </span>
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

                {/* OR SOCIALS */}
                {/* <div className="row">
                <span className="text-center h3 or-social">OR</span>
                <div className="text-center p-0">
                  <GoogleLogin className="btn btn-light col-sm-8 col-8 mt-3 border py-2 d-inline-flex align-items-center"
                    clientId="722288971048-2uokcp8odkimde6r3625gl7k30e9pc6k.apps.googleusercontent.com"
                    buttonText="Continue with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false} />
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
