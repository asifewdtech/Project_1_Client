// HOOKS
import { useState } from "react";
import { useForm } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";
import { getAllCategoriesReducer } from "../../../../../Redux/Slices/CategoriesSlice";

// SERVICES
import { CategoriesServices } from "../../../../../Services/AdminServices";

// BOOTSTRAP COMPONENTS AND SWAL
import { Modal, Alert } from "react-bootstrap";
import { Toast } from "bootstrap";
import Swal from "sweetalert2";

const AddNewCategory = ({ show, handleClose }) => {

  const [msg, setMsg] = useState(null);
  const Services = new CategoriesServices();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({defaultValues: { category: null}});

  // const categoryField = watch("category");

  async function submitForm(category) {
    console.log(category);
    const { data } = await Services.CreateSingleCategory(category);

    // NEW CATEGORY ADDED SUCCESSFULLY
    if (data.messageType === "success") {
      setMsg(null);
      handleClose();
      reset({title: null});
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      dispatch(getAllCategoriesReducer());

      // SWEET ALERT
      new Swal({
        title: "Category Added",
        text: "New category has been added successfully.",
        icon: "success",
        backdrop: true,
        allowOutsideClick: false,
        allowEnterKey: false,
        confirmButtonColor: "#88aaf3",
        confirmButtonText: "Done."
      });
      reset({
        title: null,
      });

      return x.show();


    }

    // IF ANY ERROR IS OCCURED
    if (data.messageType !== "success") {
      console.log(data);
      return setMsg(data);
    }
  }

  return <>
    <Modal show={show} onHide={() => {handleClose(); reset({title: null}); setMsg(null);}} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Category</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)}>

        {/* ALERT MESSAGE - IF ANYTING WENT WRONG */}
        {msg ? <Alert variant="danger" className="m-2 mb-0">{msg.message}</Alert> : null}

        <Modal.Body className="pb-0">
          <p className="text-danger">Please note that Category name must be in Title Case (capitalized each word).</p>
          <div className="row">

            <div className="form-group col-12 mb-4">
              <input type="text" name="title" className="form-control" placeholder="Category"
                {...register("title", { required: true, maxLength: 20, minLength: 3 })} />
            </div>


            {/* {(categoryField && categoryField.length > 3 && categoryField.length <= 20) ? <></> : null} */}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => {handleClose(); reset({title: null}); setMsg(null);}}>Close</button>
          <button className="btn btn-primary" type="submit">Save Category</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default AddNewCategory;