// HOOKS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getIGAccounts_SP } from "../../../Redux/Slices/SocialAccounts_SP/IGAccountsSlice_SP";

// COMPONENTS
import CreateIGAccount from './CreateIGAccount';

// SERVICES & UTILITES
import { IGAccountsServices } from "../../../Services/ServiceProviderServices";
import Swal from "sweetalert2";

// BOOTSTRAP COMPONENTS & REACT-ICONS
import { Card, Modal, Alert } from "react-bootstrap";
import { Toast } from "bootstrap";
import { BsInstagram,BsImages } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';
import { FaLink } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

// CSS 
import '../../SocialMediaPanels/social.css'

const Instagram = () => {

  const { register, handleSubmit, reset, setValue } = useForm();
  const { IGAccounts_SP } = useSelector((state) => state);
  const Services = new IGAccountsServices();
  const [editId, setEditId] = useState(null);
  console.log(IGAccounts_SP);


  const dispatch = useDispatch();
  

  // MODAL HANDLERS - ADD NEW YT ACCOUNT
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // MODAL HANDLERS - EDIT YT ACCOUNT
  const [editShow, setEditShow] = useState(false);
  const handleShowEdit = () => setEditShow(true);
  const handleCloseEdit = () => setEditShow(false);

  // EDIT ACCOUNT
  const editThisIGAccount = (id, obj) => {
    setValue("userName", obj.userName);
    setValue("link", obj.link);
    setValue("posts", obj.posts);
    setValue("followers", obj.followers);
    setEditId(id);
    handleShowEdit();
  }


  // SUBMIT FORM FOR EDIT ACCOUNT
  const onSubmit = async (obj) => {
    const { data } = await Services.UpdateIGAccount(editId, obj);

    // ACCOUNT UPDATED SUCCESSFULLY
    if (data.messageType === "success") {
      dispatch(getIGAccounts_SP());
      handleCloseEdit();
      setEditId(null);
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }

    // IF SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }
  };

  // DELETE CATEGORY
  async function deleteThisIGAccount(id) {
    new Swal({
      title: "Delete Account?",
      text: "Are you sure you want to delete this account?",
      icon: "question",
      backdrop: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      confirmButtonColor: "#ec4a58",
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonColor: "#6c757d",
      denyButtonText: "Cancel",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await Services.DeleteIGAccount(id);
          // ACCOUNT DELETED SUCCESSFULLY
          if (data.messageType === "success") {
            dispatch(getIGAccounts_SP());
            let x = new Toast(".toast", { autohide: true, delay: 3000 });
            document.querySelector(".toast").className = "toast align-items-center m-2";
            document.querySelector(".toast").classList.add("bg-success", "text-light");
            document.querySelector(".toast-body").innerText = data.message;
            return x.show();
          }

          // IF SOMETHING WENT WRONG
          if (data.messageType !== "success") {
            let x = new Toast(".toast", { autohide: true, delay: 3000 });
            document.querySelector(".toast").className = "toast align-items-center m-2";
            document.querySelector(".toast").classList.add("bg-danger", "text-light");
            document.querySelector(".toast-body").innerText = data.message;
            return x.show();
          }
        }
      })

  }

  useEffect(() => {
    dispatch(getIGAccounts_SP());
  }, [dispatch])

  return (
    <>

      {/* FORM SUBMIT COMPONENT */}

      <CreateIGAccount show={show} handleClose={handleClose} />

      {/* YOUTUBE ACCOUNTS */}

      <div className="container-fluid">
        <div className="row no-gutters mt-5">
          <div className="col-12 d-flex justify-content-between">
            <h4 className="st-margin ml-2">Instagram</h4>
            <button className="btn btn-primary sb-margin mr-2" onClick={handleShow}>Add New Account</button>
          </div>
          {IGAccounts_SP ? IGAccounts_SP.map((account, i) => {
            return <div key={i} className="col-md-6 my-2 px-2">
              <Card className='shadow-1 h-100'>
                <Card.Body className="position-relative">
                  <Card.Title>Account Info:</Card.Title>
                  <div className="row py-3">
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <BsInstagram style={{ width: 24, height: 24, marginTop: '-5px' }} className="me-2" />
                        UserName: <span className="fw-semibold fst-italic ms-3">{account.userName}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <BsImages style={{ width: 24, height: 24, marginTop: '-5px' }} className="me-2" />
                        Posts: <span className="fw-semibold fst-italic ms-3">{account.posts}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder">
                        <MdGroups style={{ width: 24, height: 24, marginTop: '-5px' }} className="me-2" />
                        Followers: <span className="fw-semibold fst-italic ms-3">{account.followers}</span></p>
                    </div>
                    <div className="col-md-12">
                      <p className="fw-bolder text-truncate w-75">
                        <FaLink style={{ width: 22, height: 22, marginTop: '-5px' }} className="me-2" />
                        Link: <span className="fw-semibold fst-italic ms-3 l-ht"><a href={account.link} target="blank">{account.link}</a></span></p>
                    </div>
                  </div>
                  <div className="text-end mb-2 btn-place">
                    <button className="btn btn-sm btn-primary me-1" onClick={() => editThisIGAccount(account._id, account)}>
                      <AiFillEdit style={{ width: 20, height: 20 }} /> <span className='exp-btn'>Edit</span>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteThisIGAccount(account._id)} >
                      <MdDeleteForever style={{ width: 20, height: 20 }} /> Delete
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          }) :
            <Alert variant="secondary" style={{marginTop: "1rem", textAlign: "center"}}>
              <Alert.Heading>Go and Add / Create Account First</Alert.Heading>
            </Alert>
          }
        </div>
      </div>

      {/* EDIT FORM */}

      <Modal show={editShow} onHide={() => { handleCloseEdit(); reset({ channel: null, link: null, posts: null, followers: null }) }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className="mb-3">
              <input className="form-control" type="text" placeholder="User name" name="userName"
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
            <button className="btn btn-secondary" onClick={() => { handleCloseEdit(); reset({ userName: null, link: null, posts: null, followers: null}) }} >Close</button>
            <button className="btn btn-primary" type="submit">Save</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Instagram;