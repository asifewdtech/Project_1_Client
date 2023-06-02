// HOOKS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormData from "form-data";

// EXTRA COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// SERVICES
import SharedServices from "../../Services/SharedServices";
// TOKEN
import { decodedToken } from "../../Utilities/AppUtilities";

const UserProfile = () => {

  const Serivces = new SharedServices();
  const userLoggedIn = decodedToken().user;
  const [avatar, setAvatar] = useState(userLoggedIn.dp);
  const [updatingAvatar, setUpdatingAvatar] = useState(null);
  const { register, handleSubmit, setValue, } = useForm();
  const { register: register1, handleSubmit: handleSubmit1, getValues, watch, reset } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();

  // MODAL HANDLERS - CHANGE PASSWORD
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // MODAL HANDLERS - CHANGE PROFILE PICTURE
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);

  // UPDATE THE USER - FUNCTION
  async function updateUser(user) {
    const { data } = await Serivces.UpdateProfile(userLoggedIn._id, user);

    // SUCCEFFULLY UPDATED
    if (data.messageType === "success") {
      localStorage.setItem("userLoggedIn", JSON.stringify(data.user));
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    // SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }
  }

  async function changePassword(updated) {
    const { data } = await Serivces.UpdateSingleUser(userLoggedIn._id, updated);

    // SUCCEFFULLY UPDATED
    if (data.messageType === "success") {
      handleClose();
      localStorage.setItem("userLoggedIn", JSON.stringify(data.user));
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      reset({ confirmPassword: "", password: "" });
      return x.show();
    }

    // SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      reset({ changePassword: "", password: "" });
      return x.show();
    }
  }

  // UPDATE THE PROFILE PICTURE
  async function updateProfilePicture (x) {
    const formData = new FormData();
    formData.append("avatar", x.avatar[0]);

    document.getElementById("save-profile").innerText = "Please wait..";
    const { data } = await Serivces.UpdateUserDP(userLoggedIn._id, formData);
    document.getElementById("save-profile").innerText = "Save Profile";
    console.log(data);

    // PROFILE PICTURE UPDATED SUCCESFFULLY
    if (data.messageType === "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      // return handleClose1();
    }

    // SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      // return handleClose1();
    }
  }

  // LIVE PRIVIEW - CHANGE PROFILE PICTURE
  function livePreview(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUpdatingAvatar(reader.result);
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  
  useEffect(() => {
    setValue("firstName", userLoggedIn.firstName);
    setValue("lastName", userLoggedIn.lastName);
    setValue("email", userLoggedIn.email);
    setValue("role", userLoggedIn.role);
    setValue("status", userLoggedIn.status);
    setAvatar(userLoggedIn.dp);
  }, []);

  return <>
    <div className="row p-2">
      <h3>User Profile</h3>

      <div className="col">
        <form onSubmit={handleSubmit(updateUser)}>
          <div className="row">

            <div className="col-6">
              <label htmlFor="first-name" className="form-label">First name</label>
              <input type="text" className="form-control" placeholder="First Name" name="first-name"
                {...register("firstName", { required: true, minLength: 3, maxLength: 20 })} />
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="last-name" className="form-label">Last name</label>
              <input type="text" className="form-control" placeholder="Last Name" name="last-name"
                {...register("lastName", { required: true, minLength: 3, maxLength: 20 })} />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Email" disabled name="email"
                {...register("email", { required: true })} />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input type="text" className="form-control" placeholder="Role" disabled name="role"
                {...register("role")} />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input type="text" className="form-control" placeholder="Status" disabled name="status"
                {...register("status")} />
            </div>

            <div className="col-12 mb-3 d-flex justify-content-end">
              <button className="btn btn-sm btn-primary" type="submit">Save Changes</button>
            </div>

            <hr />
            <div className="col-12 mb-3">
              <p className="text-primary underline-on-hover" onClick={() => handleShow()} >Change my password</p>
            </div>

          </div>
        </form>
      </div>
      <div className="col justify-content-center position-relative">
        <div className="d-flex flex-column align-items-center position-relative dp-wrapper" >
          {/* <img src={avatar} className="dp img-fluid rounded-circle" alt="" style={{ maxHeight: 200, maxWidth: 200 }} /> */}
          <div className="rounded-circle" style={{backgroundImage: `url("http://localhost:3020/uploads/users/${avatar}")`, height: 200, width: 200, backgroundSize: "cover", backgroundPosition: "center"}}></div>
          <button className="btn btn-outline-secondary btn-sm mt-3" onClick={() => handleShow1()}>Change Profile Picture</button>
        </div>
      </div>
    </div>

    {/* MODAL - CHANGE PASSWORD */}
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit1(changePassword)} >
        <Modal.Body className="pb-0">
          <div className="row">

            <div className="col-12 mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Your password goes here.." name="password"
                {...register1("password", { required: true, minLength: 4, maxLength: 20 })} />
            </div>

            <div className="col-12 mb-3">
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm your password.." name="confirm-password"
                {...register1("confirmPassword", { required: true, minLength: 4, maxLength: 20 })} />
              {getValues("password") === watch("confirmPassword") ? null : <p className="text-danger">Password doesn't match..</p>}
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" type="submit">Save Password</button>
        </Modal.Footer>
      </form>
    </Modal>

    {/* MODAL - CHANGE PROFILE PICTURE */}
    <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} size="sm" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Change Profile Picture</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form encType="multipart/form-data" onSubmit={handleSubmit2(updateProfilePicture)}>
        <Modal.Body className="pb-0">
          <div className="row">

            <div className="col-12 mb-3">
              <input type="file" className="form-control" name="avatar" 
                {...register2("avatar", {required: true})} onChange={(event) => livePreview(event)}/>
            </div>
            {updatingAvatar && <div className="col-12 mb-3 text-center">
              <img src={updatingAvatar} className="rounded-circle" style={{objectFit: "cover"}} width={200} height={200}/>
            </div>}

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary" type="submit" id="save-profile">Save Profile</button>
        </Modal.Footer>
      </form>
    </Modal>

  </>
}

export default UserProfile;