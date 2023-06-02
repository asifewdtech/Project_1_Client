// HOOKS
import { useState } from 'react';
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch } from 'react-redux';
import { getAllUsersReducer } from "../../../../Redux/Slices/UsersSlice";

// SERVICES 
import UserServices from '../../../../Services/UserServices';
import Swal from 'sweetalert2';

// BOOTSTRAP COMPONENTS
import Modal from 'react-bootstrap/Modal';
import Alert from "react-bootstrap/Alert";

const AddNewUser = ({show, handleClose}) => {

  const { register, handleSubmit, getValues, watch, reset } = useForm({ defaultValues: { email: "", password: "", confirmPassword: "", firstName: "", lastName: "", gender: "", role: "", status: "" } });
  const [msg, showMsg] = useState(null);
  const dispatch = useDispatch();
  const Services = new UserServices();

  // SUBMIT FORM
  const submitForm = (user) => {
    creatingNewUser(user);
  }

  // API CALL - CREATING USER
  const creatingNewUser = async (user) => {
    const { firstName, lastName, email, password, role, dp, status } = user;
    const response = await Services.CreateNewUser(
      {
        firstName, lastName,
        email, password,
        role, dp, registeredWithGoogle: false, status,
        registeredWithFacebook: {
          isRegistered: false,
          accessToken: null
        }
      });

    // EMAIL IS REGISTERED ALREADY
    if (response.data.message === "This email is already registered.") {
      return showMsg(response.data);
    }

    // RESET FORM IF NO ERROR OCCURED
    if (response.data.messageType === "success") {
      new Swal({
        title: "New User",
        text: `New user has been added in ${status} category.`,
        icon: "success",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Okay"
      });
      reset({
        firstName: null, lastName: null, email: null, password: null,
        confirmPassword: null, role: "", status: "", gender: "",
      });
      handleClose();
      dispatch(getAllUsersReducer());
    }
  }

  return <>
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)}>
        {msg ? <Alert variant="danger" className="m-2 mb-0">{msg.message}</Alert> : null}
        <Modal.Body className="pb-0">
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

            <div className="form-group col-4">
              <select className="form-select" aria-label="Default select example"
                {...register("role", { required: true })}>
                <option value="" defaultValue disabled>Signup As</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div className="form-group col-4">
              <select className="form-select"
                {...register("gender", { required: true })}>
                <option value="" defaultValue disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group col-4">
              <select className="form-select"
                {...register("status", { required: true })}>
                <option value="" defaultValue disabled>Status</option>
                <option value="APPROVED">APPROVED</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" type="submit">Save User</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default AddNewUser;