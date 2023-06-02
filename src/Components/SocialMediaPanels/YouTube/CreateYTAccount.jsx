// CSS 
import '../../SocialMediaPanels/social.css'

// HOOKS
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";
import { getYTAccounts_SP } from "../../../Redux/Slices/SocialAccounts_SP/YTAccountsSlice_SP";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// UTILITES & SERVICES
import { YTAccountsServices } from "../../../Services/ServiceProviderServices";
import { decodedToken } from "../../../Utilities/AppUtilities";

const CreateYTAccount = ({ show, handleClose }) => {
  const Services = new YTAccountsServices();
  const dispatch = useDispatch();

  // LOGGED USER INFO
  const userLoggedIn = decodedToken().user;

  // FORM SUBMIT
  const { register, handleSubmit, reset } = useForm();

  // SUBMITING THE FORM
  const onSubmit = async (obj) => {
    const { data } = await Services.AddYTAccount({ ...obj, serviceProvider: userLoggedIn._id });

    // ACCOUNT CREATED SUCCESSFULLY
    if (data.messageType === "success") {
      handleClose();
      reset({
        channel: null,
        link: null,
        subscribers: null,
        videos: null,
        views: null
      });
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      dispatch(getYTAccounts_SP());
      return x.show();
    }

    // ACCOUNT ALREADY EXISTS
    if (data.messageType === "warning") {
      console.log(data.message)
    }

    // SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      console.log(data.message)
      handleClose();
      reset({
        channel: null,
        link: null,
        subscribers: null,
        videos: null,
        views: null
      });
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      dispatch(getYTAccounts_SP());
      return x.show();
    }
  };

  return (
    <>

      {/*FORM SUBMIT */}

      <Modal show={show} onHide={() => { handleClose(); reset({ channel: null, link: null, subscribers: null, videos: null, views: null })}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <input className="form-control" type="text" placeholder="Channel name" name="channel"
                {...register("channel", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Channel link" name="link"
                {...register("link", { required: true })} />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="Subscribers"
                name="subscribers"
                {...register("subscribers", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="No. of Videos"
                name="videos"
                {...register("videos", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
            <div className="mb-3">
              <input className="form-control"
                type="number"
                placeholder="No of total views on channel"
                name="views"
                {...register("views", {
                  required: true,
                  maxLength: 80,
                })}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => { handleClose(); reset({ channel: null, link: null, subscribers: null, videos: null, views: null }) }}>Close</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CreateYTAccount