// HOOKS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// DATA TABLE STUFF
import DataTables from "datatables.net-dt";

// SERVICES
import { ServicesService } from "../../../../../Services/AdminServices";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { updateSingleServiceReducer, getAllServicesReducer } from "../../../../../Redux/Slices/ServicesSlice_Admin";

// INCONS
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ApprovedServices = () => {

  const Services = new ServicesService();
  const [editId, setEditId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // EDIT SERVICE FORM
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      images: ""
    }
  });

  // MODAL HANDLERS FOR EDIT FORM
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // HOOKS HANDLE
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Approved } = useSelector((state) => state.Services_Admin);
  const { Categories } = useSelector((state) => state);

  // UPDATING STATUS
  function updateThis(updateTo, service) {
    switch (updateTo) {

      // APPORVING THE REQUEST
      case "PENDING":
        new Swal({
          title: "Service on Pending?",
          text: "Are you sure you want to put this service in pending?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#ffc107",
          confirmButtonText: updateTo,
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(updateSingleServiceReducer({ updateTo, service }));

              return new Swal({
                title: "Service On Pending",
                confirmButtonColor: "#88aaf3",
                icon: "success",
                backdrop: true,
              })
            }
          });
        break;

      // DECLINING THE REQUEST
      case "REJECTED":
        new Swal({
          title: "Reject service?",
          text: "Are you sure you want to reject this service?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#ec4a58",
          confirmButtonText: updateTo,
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            // APPORVING THE REQUEST
            if (result.isConfirmed) {
              dispatch(updateSingleServiceReducer({ updateTo, service }));

              return new Swal({
                title: "Service Rejected",
                confirmButtonColor: "#88aaf3",
                icon: "success",
                backdrop: true,
              })
            }
          });
        break;

      default:
        break;
    }
  }

  // EDIT ANY SERVICE
  async function editThis(id) {
    const { data } = await Services.GetSingleServiceDetails(id);
    setEditId(id);

    // SET DATA INTO FORM
    setValue("title", data.service.title);
    setValue("description", data.service.description);
    setValue("category", data.service.category);
    setValue("subCategory", data.service.subCategory);
    handleShow();
  }

  async function submitForm(service) {
    handleClose();

    const response = await Services.UpdateSingleService(editId, service);
    dispatch(getAllServicesReducer());

    // UPDATED SUCCESSFULLY
    if (response.data.messageType === "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = response.data.message;
      return x.show();
    }

    // FAILDED TO UPDATE FOR SOME REASON
    if (response.data.messageType !== "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = response.data.message;
      return x.show();
    }
    console.log(response);
  }

  // DELETE ANY SERVICE WITH ID
  async function deleteThis(id) {
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
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await Services.UpdateSingleService(id, { isDeleted: true });
          dispatch(getAllServicesReducer());

          // DELETED SUCCESSFULLY (SOFT DELETION)
          if (data.messageType === "success") {
            let x = new Toast(".toast", { autohide: true, delay: 3000 });
            document.querySelector(".toast").className = "toast align-items-center m-2";
            document.querySelector(".toast").classList.add("bg-success", "text-light");
            document.querySelector(".toast-body").innerText = "Service deleted successfully.";
            return x.show();
          }

          // COULDN'T DELETE FOR SOME REASON
          if (data.messageType !== "success") {
            let x = new Toast(".toast", { autohide: true, delay: 3000 });
            document.querySelector(".toast").className = "toast align-items-center m-2";
            document.querySelector(".toast").classList.add("bg-success", "text-light");
            document.querySelector(".toast-body").innerText = data.message;
            return x.show();
          }
        }
      });


  }

  useEffect(() => {
    dispatch(getAllServicesReducer());

    new DataTables("#table-service-approved");
  }, [dispatch])

  return <>
    <table id="table-service-approved" style={{ width: "100%" }}>

      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {Approved ? Approved.map((service, i) => {
          return <tr key={i}>
            {/* <th scope="row">{i + 1}</th> */}
            <td>
              <div className="card my-2 position-relative" key={i}>
                <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-5px" }}>{service.status}</span>
                <div className="row g-0">

                  <div className="col-3">
                    <img src="https://picsum.photos/300/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col-7">
                    <div className="card-body">
                      <h5 className="card-title">{service.title}</h5>
                      <p className="card-text description-truncate">{service.description}</p>
                    </div>
                    <div className="d-flex">
                      <button className="btn btn-sm btn-primary ms-3" onClick={() => navigate(`/dashboard/admin/service-details/${service._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-outline-primary ms-1" onClick={() => editThis(service._id)}><AiFillEdit style={{ width: 20, height: 20 }} /></button>
                      <button className="btn btn-sm btn-outline-danger ms-1 me-auto" onClick={() => deleteThis(service._id)}><MdDeleteForever style={{ width: 20, height: 20 }} /></button>
                      <button className="btn btn-sm btn-danger ms-1" onClick={() => updateThis("REJECTED", service)}>Mark as Rejected</button>
                    </div>
                  </div>

                  <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                    {/* <img src="https://picsum.photos/50" className="rounded-circle mt-3" width={50} height={50} alt="" /> */}
                    <div className="d-flex flex-column mt-2">
                      {/* <h5 className="underline-on-hover">{service.serviceProviderId.firstName} {service.serviceProviderId.lastName}</h5> */}
                      {/* <p className="text-center">
                        <span className={service.status === "APPROVED" ? "badge badge-success" :
                                        service.status === "PENDING" ? "badge badge-warning" :
                                        service.status === "REJECTED" ? "badge badge-danger" : "badge badge-secondary"}>{service.status}</span>
                                        </p> */}
                                      
                    </div>
                  </div>

                </div>
              </div>
            </td>
          </tr>
        }) : null}

      </tbody>
    </table>

    {/* EDIT SERVICE */}
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <Modal.Body className="pb-0">
          <div className="row">
            <div className="form-group col-12">
              <input type="text" className="form-control" placeholder="Title"
                {...register("title", { required: true, maxLength: 100 })} />
            </div>

            <div className="col-12">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                {...register("description", { required: true })} />
            </div>

            <div className="row m-0 p-0">
              <div className="col">
                <div className="mt-3">
                  <input className="form-control" type="file" accept=".png, .jpg, .jpeg" name="images" multiple
                    {...register("images", { required: true, max: 3, min: 1 })} />
                  {watch("images").length > 3 && <p className="text-danger m-0">*You can upload upto three image & atleast one. (Allowed files: .jpg .jpeg .png) </p>}
                  <label htmlFor="images m-0 p-0" style={{ display: "none" }}></label>
                </div>
              </div>

            </div>

            <div className="form-group col-6 mt-3">
              <select id="category" className="form-select" aria-label="Default select example"
                {...register("category")}>
                <option value="" defaultValue disabled>Category</option>
                {Categories ? Categories.map((item, i) => {
                  return <option value={item._id} key={i}>{item.category}</option>
                }) : null}
              </select>
            </div>

            <div className="form-group col-6 mt-3">
              <select className="form-select"
                {...register("subCategory")}>
                <option value="" defaultValue disabled>Sub Category</option>
                {selectedCategory ? selectedCategory.subCategories.map((obj, i) => {
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

export default ApprovedServices;