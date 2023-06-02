// CSS 
import '../../SocialMediaPanels/social.css'

// HOOKS
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";
import { getIGAccounts_SP } from "../../../Redux/Slices/SocialAccounts_SP/IGAccountsSlice_SP";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// UTILITES & SERVICES
import { IGAccountsServices } from "../../../Services/ServiceProviderServices";
import { decodedToken } from "../../../Utilities/AppUtilities";

const CreateIGAccount = ({ show, handleClose }) => {
  const Services = new IGAccountsServices();
  const dispatch = useDispatch();

  // LOGGED USER INFO
  const userLoggedIn = decodedToken().user;

  // FORM SUBMIT
  const { register, handleSubmit, reset } = useForm();

  // SUBMITING THE FORM
  const onSubmit = async (obj) => {
    const { data } = await Services.AddIGAccount({ ...obj, serviceProvider: userLoggedIn._id });

    // ACCOUNT CREATED SUCCESSFULLY
    if (data.messageType === "success") {
      handleClose();
      reset({
        userName: null,
        link: null,
        posts: null,
        followers: null
      });
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      dispatch(getIGAccounts_SP());
      return x.show();
    }

    // ACCOUNT ALREADY EXISTS
    if (data.messageType === "warning") {
      console.log(data.message)
    }

    // SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      console.log(data.message)
      reset({
        userName: null,
        link: null,
        posts: null,
        followers: null
      });
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      dispatch(getIGAccounts_SP());
      return x.show();
    }
  };

  return (
    <>

      {/*FORM SUBMIT */}

      <Modal show={show} onHide={() => { handleClose(); reset({ userName: null, link: null, posts: null, followers: null })}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <input className="form-control" type="text" placeholder="User Name" name="userName"
                {...register("userName", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Profile link" name="link"
                {...register("link", { required: true })} />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="Posts"
                name="posts"
                {...register("posts", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="Followers"
                name="followers"
                {...register("followers", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => { handleClose(); reset({ userName: null, link: null, posts: null, followers: null }) }}>Close</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CreateIGAccount;