// HOOKS
import { useState } from "react";
import { useForm } from "react-hook-form";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllSubCategoriesReducer } from "../../../../../Redux/Slices/SubCategoriesSlice";

// SERVICES 
// import { CategoriesServices } from "../../../../../Services/AdminServices";
import { SubCategoriesServices } from "../../../../../Services/AdminServices";

// BOOSTSTRAP COMPONETNS
import { Modal, Alert } from "react-bootstrap";
import { Toast } from "bootstrap";

const AddNewSubCategory = ({show, handleClose}) => {
  
  // CATEGORIES
  // const Services = new CategoriesServices();
  const { Categories } = useSelector((state) => state);

  // SUB-CATEGORIES
  const SubServices = new SubCategoriesServices();
  // const { SubCategories } = useSelector((state) => state);

  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue } = useForm({defaultValues: { category: "", title: ""}});

  // CREATE SUB-CATEGORY
  async function submitForm(obj) {
    console.log(obj)
    const { data } = await SubServices.AddSubCategory(obj);
    console.log(data);

    // SUB-CATEGORY CREATED SUCCESSFULLY
    if(data.messageType === "success") {
      setMsg(null);
      handleClose();
      let x = new Toast(".toast", { autohide: true, delay: 3000 });
      document.querySelector(".toast").className = "toast align-items-center m-2";
      document.querySelector(".toast").classList.add("bg-success", "text-light");
      document.querySelector(".toast-body").innerText = data.message;
      reset({category: "", title: null});
      dispatch(getAllSubCategoriesReducer());
      return x.show();
    }

    // IF SOMETHING WENT WRONG
    if(data.messageType !== "success") {
      return setMsg(data);
    }
    setMsg(null);
  }

  return <>
    <Modal show={show} onHide={() => {handleClose(); reset({category: "", title: null}); setMsg(null);}} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Sub-category</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)}>

        {/* ALERT MESSAGE - IF ANYTING WENT WRONG */}
        {msg ? <Alert variant="danger" className="m-2 mb-0">{msg.message}</Alert> : null}

        <Modal.Body className="pb-0">
          <p className="text-danger">Please note that Sub-category name must be in Title Case (capitalized each word).</p>
          <div className="row">

            <div className="form-grouup col-12 mb-4">
              <select className="form-select" aria-label="Default select example"
                {...register("category", {required: true})}>
                  
                <option value="" defaultValue disabled>Select Category</option>

                {Categories && Categories.map((item, i) => {
                  return <option value={item._id} key={i}>{item.title}</option>
                })}

              </select>
            </div>

            <div className="form-group col-12 mb-4">
              <input type="text" className="form-control border" placeholder="Sub-category"
                {...register("title", { required: true, maxLength: 20, minLength: 3 })}
                onChange={(e) => {
                  setValue("title", e.target.value.toUpperCase(), { shouldValidate: true })
                }} />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => {handleClose(); reset({category: "", title: null}); setMsg(null);}}>Close</button>
          <button className="btn btn-primary" type="submit">Save Sub-category</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default AddNewSubCategory;