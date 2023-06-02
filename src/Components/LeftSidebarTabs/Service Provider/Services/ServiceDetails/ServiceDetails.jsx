// HOOKS
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesReducer } from "../../../../../Redux/Slices/CategoriesSlice";
import { tabServicesSP } from "../../../../../Redux/Slices/TabSlice";

// SERVICES
import UserServices from "../../../../../Services/UserServices";
import Swal from "sweetalert2";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// ICONS 
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const ServiceDetailsSP = () => {

  const Services = new UserServices();
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues: { title: "", description: "", category: "", subCategory: "" } });
  const { id } = useParams();
  const [service, setService] = useState(null);
  const { Categories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = watch();
  // console.log(service);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Karachi',
    hour12: true,
    weekday: 'long',
    formatMatcher: 'basic',
    language: 'en-US'
  };

  // MODAL HANDLERS - ADD NEW SERVICE
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const memoizedService = useMemo(() => {
    const Services = new UserServices();
    return Services.GetSingleService(id);
  }, [id]);

  useEffect(() => {
    function getSelectedCategory() {
      if (Categories) {
        setSelectedCategory(Categories.find((x) => x._id === data.category));
      }
    }
    getSelectedCategory();
  }, [Categories, data, selectedCategory]);

  useEffect(() => {
    dispatch(getAllCategoriesReducer());
  }, [])

  useEffect(() => {
    memoizedService.then((resp) => {
      setService(resp.data.service);
      setValue("title", resp.data.service.title);
      setValue("description", resp.data.service.description);
      setValue("category", resp.data.service.category);
      setSelectedCategory(resp.data.service.category);
    });
  }, [memoizedService]);

  async function submitForm(service) {
    console.log(service);
    const { data } = await Services.UpdateSingleService(id, service);

    // SERVICE UPDATED SUCCESSFULLY
    if (data.messageType === "success") {
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      setService(data.service);
      return x.show();
    }

    // IF SOMETHING WENT WRONG
    if (data.messageType !== "success") {
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      return x.show();
    }
  }

  async function deleteThis() {
    new Swal({
      title: "Delete service?",
      text: "Are you sure you want to delete this service?",
      icon: "question",
      backdrop: true,
      allowOutsideClick: false,
      allowEnterKey: false,
      confirmButtonColor: "#ec4a58",
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonColor: "#6c757d",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      // APPORVING THE REQUEST
      if (result.isConfirmed) {
        const { data } = await Services.UpdateSingleService(id, { isDeleted: true });

        // SUCCESSFULLLY DELETED THE SERVICE (SOFT DELETE)
        if (data.messageType === "success") {
          let x = new Toast(".toast", { autohide: true, delay: 3000 });
          document.querySelector(".toast").className = "toast align-items-center m-2";
          document.querySelector(".toast").classList.add("bg-success", "text-light");
          document.querySelector(".toast-body").innerText = "Service deleted successfully.";
          navigate("/dashboard");
          dispatch(tabServicesSP());
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
    });
  }

  return <>
    <div className="row p-2">
      <h3>Service Details</h3>
      <div className="row">
        <hr />
        <div className="col-7">
          <p>Created On: {service ? new Date(service.createdDate).toLocaleString("en-US", options) : null}</p>
          <h5>Title:</h5>
          <p>{service ? service.title : null}</p>
          <h5>Descripton:</h5>
          <p>{service ? service.description : null}</p>
          <h5>Current Status:
            <p className="d-inline ms-2">
              <span className={service && service.status === "APPROVED" ? "badge badge-success" :
                service && service.status === "PENDING" ? "badge badge-warning" :
                  service && service.status === "REJECTED" ? "badge badge-danger" : "badge badge-secondary"}>{service ? service.status : null}</span>
            </p>
          </h5>

          <div className="row">
            <div className="col">
              <button className="btn btn-sm btn-primary me-1" onClick={handleShow}>
                <AiFillEdit style={{ width: 25, height: 25 }} />
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteThis()}>
                <MdDeleteForever style={{ width: 25, height: 25 }} />
              </button>
            </div>
          </div>
        </div>

        <div className="col-5">
          <img src="https://picsum.photos/500" alt="" className="w-100 rounded" />
        </div>
      </div>
    </div>

    {/* EDIT MODAL */}
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <Modal.Body className="pb-0">
          <div className="row">

            <div className="col-12">
              <p>Created On: {service ? new Date(service.createdDate).toLocaleString("en-US", options) : null}</p>
            </div>

            <div className="form-group col-12">
              <input type="text" className="form-control" placeholder="Title"
                {...register("title", { required: true, maxLength: 100 })} />
            </div>

            <div className="col-12">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                {...register("description", { required: true })} />
            </div>

            {/* <div className="row m-0 p-0">
              <div className="col">
                <div className="mt-3">
                  <input className="form-control" type="file" accept=".png, .jpg, .jpeg" name="images" multiple
                    {...register("images", { required: true, max: 3, min: 1 })} />
                    {watch("images").length > 3 && <p className="text-danger m-0">*You can upload upto three image & atleast one. (Allowed files: .jpg .jpeg .png) </p>}
                  <label htmlFor="images m-0 p-0" style={{ display: "none" }}></label>
                </div>
              </div>
            </div> */}

            <div className="form-group col-6 mt-3">
              <select className="form-select"
                {...register("category", { required: true })}>
                <option value="" defaultValue disabled>Category</option>
                {Categories ? Categories.map((item, i) => {
                  return <option value={item._id} key={i}>{item.category}</option>
                }) : null}
              </select>
            </div>

            <div className="form-group col-6 mt-3">
              <select className="form-select"
                {...register("subCategory", { required: true })}>
                <option value="" defaultValue disabled>Sub-category</option>
                {selectedCategory && selectedCategory.subCategories ? selectedCategory.subCategories.map((obj, i) => {
                  return <option value={obj._id} key={i}>{obj.subCategory}</option>
                }) : null}
              </select>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" type="submit">Save Changes</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default ServiceDetailsSP;