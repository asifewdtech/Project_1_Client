// HOOKS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesReducer } from "../../../../Redux/Slices/CategoriesSlice";
import { getAllSubCategoriesReducer } from "../../../../Redux/Slices/SubCategoriesSlice";

// COMPONENTS
import AddNewCategory from "./AddNewCategory/AddNewCategory";
import AddNewSubCategory from "./AddNewSubCategory/AddNewSubCategory";

// SERVICES & UTILITES
import { CategoriesServices } from "../../../../Services/AdminServices";
import { SubCategoriesServices } from "../../../../Services/AdminServices";
// import UserServices from "../../../../Services/UserServices";
import { isLoggedIn } from "../../../../Utilities/AppUtilities";
import DataTables from "datatables.net-dt";
import Swal from "sweetalert2";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";
import { Toast } from "bootstrap";

// ICONS
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

const Categories = () => {

  const { register, handleSubmit, reset, setValue } = useForm();
  // CATEGORIES
  const { Categories } = useSelector((state) => state);
  const Services = new CategoriesServices();

  // SUB0CATEGORIES
  const { SubCategories } = useSelector((state) => state);
  const SubServices = new SubCategoriesServices();

  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // MODAL HANDLERS - ADD CATEGORY
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // MODAL HADLERS - ADD SUB CATEGORY
  const [showSub, setShowSub] = useState(false);
  const handleShowSub = () => setShowSub(true);
  const handleCloseSub = () => setShowSub(false);

  // MODAL HANDLERS - EDIT CATEGORY
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);

  // EDIT CATEGORY
  function editThisCategory(id, category) {
    setEditId(id);
    setValue("category", category.title);
    handleShowEdit();
  }

  // EDIT SUB-CATEGORY
  // function editThisSubCategory(id, category) {
  //   setEditId(id);
  //   setValue("category", category.title);
  //   handleShowEdit();
  // }

  // SUBMIT FORM FOR EDITING CATEGORY
  async function submitForm(category) {
    const { data } = await Services.UpdateSingleCategory(editId, category);
    console.log(data);

    // CATEGORY UPDATED SUCCESSFULLY
    if (data.messageType === "success") {
      dispatch(getAllCategoriesReducer());
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
  }

  // SUBMIT FORM FOR EDITING SUB-CATEGORY
  // async function submitForm(subCategory) {
  //   const { data } = await SubServices.UpdateSingleSubCategory(editId, subCategory);
  //   console.log(data);

  //   // CATEGORY UPDATED SUCCESSFULLY
  //   if(data.messageType === "success") {
  //     dispatch(getAllSubCategoriesReducer());
  //     handleCloseEdit();
  //     setEditId(null);
  //     let x = new Toast(".toast", { autohide: true, delay: 3000 });
  //     document.querySelector(".toast").className = "toast align-items-center m-2";
  //     document.querySelector(".toast").classList.add("bg-success", "text-light");
  //     document.querySelector(".toast-body").innerText = data.message;
  //     return x.show();
  //   }

  //   // IF SOMETHING WENT WRONG
  //   if(data.messageType !== "success") {
  //     let x = new Toast(".toast", { autohide: true, delay: 3000 });
  //     document.querySelector(".toast").className = "toast align-items-center m-2";
  //     document.querySelector(".toast").classList.add("bg-danger", "text-light");
  //     document.querySelector(".toast-body").innerText = data.message;
  //     return x.show();
  //   }
  // }

  // DELETE CATEGORY
  async function deleteThisCategory(id) {
    new Swal({
      title: "Delete Category?",
      text: "Are you sure you want to delete this category?",
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
          const { data } = await Services.DeleteSingleCategory(id);
          console.log(data);
          // CATEGORY DELETED SUCCESSFULLY
          if (data.messageType === "success") {
            dispatch(getAllCategoriesReducer());
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
  // DELETE SUB-CATEGORY
  async function deleteSubCategory(id) {
    new Swal({
      title: "Delete Sub-category?",
      text: "Are you sure you want to delete this sub-category?",
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
          const { data } = await SubServices.DeleteSubCategory(id);

          if (data.messageType === "success") {
            dispatch(getAllSubCategoriesReducer());
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
    if (!isLoggedIn()) return navigate("/");
    dispatch(getAllCategoriesReducer());
    dispatch(getAllSubCategoriesReducer());

    new DataTables("#table-categories");
  }, [navigate, dispatch]);

  return <>

    {/* ADD NEW CATEGORY */}
    <AddNewCategory show={show} handleClose={handleClose} />
    <AddNewSubCategory show={showSub} handleClose={handleCloseSub} />

    {/* CATEGORIES */}
    <div className="row p-2">
      <h3>Categories</h3>

      <div className="col">
        <button className="btn btn-primary" onClick={handleShow}>Add New Category</button>
        <button className="btn btn-primary ms-1" onClick={handleShowSub}>Add New Sub-category</button>

        <table id="table-categories" className="table table-sm table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Sub-categories</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          {/* <tbody>
            {Categories ? Categories.map((item, i) => {
              return <tr key={i}>
                <td className="align-top">{i + 1}</td>
                <td className="align-top">{item.title}</td>
                <td>
                  {SubCategories ? SubCategories.map((subItem, j) => {
                    return <p key={j} className="d-flex m-0">
                      <span>{j + 1}. {subItem.title}</span>
                      <button className="btn btn-sm btn-outline-danger ms-auto" onClick={() => deleteSubCategory(subItem._id)}><MdDeleteForever style={{ width: 15, height: 15 }} /></button>
                    </p>
                  }) : null}
                </td>
                <td className="align-top">
                  <button className="btn btn-sm btn-primary me-1" onClick={() => editThisCategory(item._id,item)}>
                    <AiFillEdit style={{width: 20, height: 20}}/>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteThisCategory(item._id)}>
                    <MdDeleteForever style={{ width: 20, height: 20 }} />
                  </button>
                </td>
              </tr>
            }) : null}
          </tbody> */}
          <tbody>
            {Categories ? Categories.map((item, i) => {
              const subCategories = SubCategories.filter(subItem => subItem.category === item._id) || null;
              return (
                <tr key={item._id}>
                  <td className="align-top">{i + 1}</td>
                  <td className="align-top">{item.title}</td>
                  <td>
                    {subCategories.map((subItem, j) => (
                      <p key={subItem._id} className="d-flex m-0">
                        <span>{j + 1}. {subItem.title}</span>
                        <button className="btn btn-sm btn-outline-danger ms-auto" onClick={() => deleteSubCategory(item._id, subItem._id)}>
                          <MdDeleteForever style={{ width: 15, height: 15 }} />
                        </button>
                      </p>
                    ))}
                  </td>
                  <td className="align-top">
                    <button className="btn btn-sm btn-primary me-1" onClick={() => editThisCategory(item._id, item)}>
                      <AiFillEdit style={{ width: 20, height: 20 }} />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteThisCategory(item._id)}>
                      <MdDeleteForever style={{ width: 20, height: 20 }} />
                    </button>
                  </td>
                </tr>
              );
            }) : null}
          </tbody>

        </table>
      </div>
    </div>

    {/* EDIT SERVICE MODAL */}
    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} size="lg" style={{ zIndex: 10000000 }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <Modal.Body className="pb-0">
          <div className="row">
            <div className="form-group col-12">
              <input type="text" name="title" className="form-control" placeholder="Title"
                {...register("title", { required: true, maxLength: 100 })} />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => { handleCloseEdit(); reset({ title: "" }) }}>Close</button>
          <button className="btn btn-primary" type="submit">Save Changes</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default Categories;