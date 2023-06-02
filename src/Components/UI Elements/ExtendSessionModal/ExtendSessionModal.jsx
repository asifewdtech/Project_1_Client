// HOOKS
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// SERVICES & UTILITIES
import SharedServices from "../../../Services/SharedServices";
import { isLoggedIn } from "../../../Utilities/AppUtilities";

// BOOTSTRAP
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

const ExtendSessionModal = () => {

  const Services = new SharedServices();
  const navigate = useNavigate();
  const location = useLocation();
  const { tab } = useSelector((state) => state);

  // MODAL HANDLERS - SESSION EXTENDER
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    let x = isLoggedIn();
    function extendSession() {
      switch (x) {
        case true:
          handleClose();
          break;

        case false:
          handleShow();
          break;

        default:
          break;
      }
    }
    extendSession();
  }, [tab, location]);

  async function extendSession() {
    const { data } = await Services.GetRefreshToken();

    // SESSION EXTENDED SUCCESSFULLY
    if (data.messageType === "success") {
      handleClose();
      localStorage.setItem("token", JSON.stringify(data.token));
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = "Session extended successfully.";
      return x.show();
    }

    // IF SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = "Coudn't extend the session.";
      x.show();
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("token");
      return navigate("/");
    }
  }

  function SignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLoggedIn");
    handleClose(); 
    return navigate("/");
  }

  return <>
    <Modal show={show} onHide={() => {SignOut(); }} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <Modal.Body className="pb-0">
        <div className="row">
          <div className="col">
            <p>Your session has been expired, do you want to extend it?</p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={() => SignOut()}>No, Signout</button>
            <button className="btn btn-primary" onClick={() => extendSession()}>Extend Sesssion</button>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  </>
}

export default ExtendSessionModal;