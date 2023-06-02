// HOOKS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import FormData from "form-data";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesReducer } from "../../../../../Redux/Slices/CategoriesSlice";
import { getAllServicesReducer_SP } from "../../../../../Redux/Slices/ServicesSlice_SP";

// SERVICES
// import ServiceProviderServices from "../../../../../Services/ServiceProviderServices";
// TOKEN
import { decodedToken } from "../../../../../Utilities/AppUtilities";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";
import axios from "axios";

const AddNewService = ({ show, handleClose }) => {

  // const [editingService, setEditingService] = useState(null);
  const userLoggedIn = decodedToken().user;
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      images: ""
    }
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const Services = new ServiceProviderServices();
  const { Categories } = useSelector((state) => state);
  const dispatch = useDispatch();
  const data = watch();
  console.log(data._id);

  // SUBMIT FORM
  function submitForm(service) {
    // const formData = new FormData();
    // formData.append("title", service.title);
    // formData.append("description", service.description);
    // formData.append("category", service.category);
    // formData.append("subCategory", service.subCategory);
    // for(let i=0; i<=service.images.length-1; i++) {
    //   formData.append(`image${i+1}`, service.images[i]);
    //   console.log(service.images[i]);
    // }
    // console.log(...formData);
    // console.log(formData);
    submitFormData({...service, serviceProvider: userLoggedIn._id });
  }

  async function submitFormData(service) {
    console.log(service);
    // const { data } = await Services.CreateSingleService(service);
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/services/create`, service, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    // SUCCESSFULLY CREATE SERVICE
    if (data.messageType === "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      x.show();
      handleClose();
      return dispatch(getAllServicesReducer_SP());
    }

    // SOMETHING WENT WRONG
    if(data.messageType !== "success") {
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-danger", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      // handleClose();
      return x.show();
    }
  }

  function getImages(event) {
    console.log(event.target);
  }

  useEffect(() => {
    function getSelectedCategory() {
      if (Categories) {
        setSelectedCategory(Categories.find((x) => x._id === data.title));
      }
    }
    getSelectedCategory();
  }, [Categories, data, selectedCategory]);

  useEffect(() => {
    dispatch(getAllCategoriesReducer());
  }, [dispatch]);

  return <>
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Service</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)} >
        <Modal.Body className="pb-0">
          <div className="row">
            <div className="form-group col-12">
              <input type="text" className="form-control" placeholder="Title" name="title"
                {...register("title", { required: true, maxLength: 100 })} />
            </div>

            <div className="col-12">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description" name="description"
                {...register("description", { required: true })} />
            </div>

            <div className="form-group col-6 mt-3">
              <select className="form-select" name="category"
                {...register("category", { required: true })}>
                <option value="" defaultValue disabled>Category</option>
                {Categories ? Categories.map((item, i) => {
                  return <option value={item._id} key={i}>{item.title}</option>
                }) : null}
              </select>
            </div>

            <div className="form-group col-6 mt-3">
              <select className="form-select" name="subCategory"
                {...register("subCategory", { required: true })}>
                <option value="" defaultValue disabled>Sub-category</option>
                {selectedCategory ? selectedCategory.subCategories.map((obj, i) => {
                  return <option value={obj._id} key={i}>{obj.subCategory}</option>
                }) : null}
              </select>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" type="submit">Create Service</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default AddNewService;