// HOOKS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesReducer } from "../../../../Redux/Slices/CategoriesSlice";
import { getAllServicesReducer, resetFiltered } from "../../../../Redux/Slices/ServicesSlice_Admin";

// DATA TABLES
import DataTables from "datatables.net-dt";

// ICONS
import { GrPowerReset } from "react-icons/gr";

const SerivceProviders = () => {

  // FORM
  const { register, handleSubmit, watch, formState, reset } = useForm({
    defaultValues: {
      category: "",
      subCategory: "",
      serviceProviderId: ""
    },
    mode: "onChange",
  });
  const data = watch();

  const { Approved, Filtered } = useSelector((state) => state.Services_Admin);
  // console.log(Filtered);
  const { Categories } = useSelector((state) => state);
  const { ServiceProviders } = useSelector((state) => state.Users);

  const [selectedCategory, setSelectedCategory] = useState(null);
  // const Filtered = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function resetButton(event) {
    event.preventDefault();
    reset({ category: "", subCategory: "", serviceProviderId: "", text: "" });
    dispatch(resetFiltered());
  }

  // GET SELECTED CATEGORY WHEN FILTER CHANGES
  useEffect(() => {
    function getSelectedCategory() {
      if (Categories) {
        setSelectedCategory(Categories.find((x) => x._id === data.category));
      }
    }
    getSelectedCategory();
  }, [formState, data, Categories, selectedCategory]);

  // GET FILTERED SERVICES WHEN FILTER CHANGES
  useEffect(() => {
    new DataTables("#table-services-filtered");
    new DataTables("#table-services");

    // dispatch(filterServices(data));
  }, [data.category, data.subCategory, data.serviceProviderId, data.text]);

  // WHEN COMPONENT RENDERS FIRST TIME
  useEffect(() => {
    dispatch(getAllCategoriesReducer());
    dispatch(getAllServicesReducer());
  }, [dispatch]);

  return <>
    <div className="row p-2">
      <h3>Services</h3>

      {/* FORM OF FILTERS */}
      <div className="card mx-3 p-0 col">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="form-group col-6">
                <input type="text" className="form-control" placeholder="Search here" 
                {...register("text")}/>
              </div>

              <div className="form-group col-6 m-0">
                <select className="form-select"
                  {...register("serviceProviderId")}>
                  <option value="">Service Provider</option>
                  {ServiceProviders ? ServiceProviders.map((item, i) => {
                    return <option value={item._id} key={i}>{item.firstName} {item.lastName}</option>
                  }) : null}
                </select>
              </div>

              <div className="form-group col-6 m-0">
                <select id="category" className="form-select" aria-label="Default select example"
                  {...register("title")}>
                  <option value="" defaultValue disabled>Category</option>
                  {Categories ? Categories.map((item, i) => {
                    return <option value={item._id} key={i}>{item.title}</option>
                  }) : null}
                </select>
              </div>

              <div className="form-group col-5 m-0">
                <select className="form-select"
                  {...register("subCategory")}>
                  <option value="" defaultValue disabled>Sub Category</option>
                  {selectedCategory ? selectedCategory.subCategories.map((obj, i) => {
                    return <option value={obj._id} key={i}>{obj.subCategory}</option>
                  }) : null}
                </select>
              </div>

              <div className="col-1">
                <button className="btn btn-primary" onClick={(e) => resetButton(e)}>
                  <GrPowerReset style={{ width: 20, height: 20 }} />
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {Approved && !Filtered ? <>
        <div className="col-12 mt-3">
          {/* TABLE */}
          <table id="table-services" style={{ width: "100%" }}>

            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Approved && !Filtered ? Approved.map((service, i) => {
                return <tr key={i}>
                  {/* <th scope="row">{i + 1}</th> */}
                  <td>
                    <div className="card mb-3 position-relative" key={i}>
                      <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-.5%" }}>{service.status}</span>
                      <div className="row g-0">

                        <div className="col-3">
                          <img src="https://picsum.photos/400/300" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                        </div>

                        <div className="col-7">
                          <div className="card-body">
                            <h5 className="card-title text-truncate">{service.title}</h5>
                            <p className="card-text description-truncate">{service.description}</p>
                          </div>
                          <div className="d-flex">
                            <button className="btn btn-sm btn-primary ms-3" onClick={() => navigate(`/dashboard/company/service-details/${service._id}`)}>View Details</button>
                          </div>
                        </div>

                        <div className="col-2 d-flex flex-column justify-content-center">
                          <img src="https://picsum.photos/50" className="rounded-circle mx-auto" width={50} height={50} alt="" />
                          <div className="d-flex flex-column mt-2">
                            {/* <h5 className="underline-on-hover text-truncate text-center">{service.serviceProviderId.firstName} {service.serviceProviderId.lastName}</h5> */}
                            {/* <p className="text-center m-0">
                              <span className={service.serviceProviderId.status === "PENDING" ? "badge badge-warning" :
                                              service.serviceProviderId.status === "APPROVED" ? "badge badge-success" :
                                              service.serviceProviderId.status === "REJECTED" ? "badge badge-success" : "badge badge-secondary"}>{service.serviceProviderId.status}</span></p> */}
                          </div>
                        </div>

                      </div>
                    </div>
                  </td>
                </tr>
              }) : null}

            </tbody>
          </table>
        </div>
      </> : null}

      {/* FILTERED SERVICES */}
      {Filtered ? <>
        <div className="col-12 mt-3">
          {/* TABLE */}
          <table id="table-services-filtered" style={{ width: "100%" }}>

            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Filtered ? Filtered.map((service, i) => {
                return <tr key={i}>
                  {/* <th scope="row">{i + 1}</th> */}
                  <td>
                    <div className="card mb-3 position-relative" key={i}>
                      <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-.5%" }}>{service.status}</span>
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
                          </div>
                        </div>

                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                          <img src="https://picsum.photos/50" className="rounded-circle mt-3" width={50} height={50} alt="" />
                          <div className="d-flex flex-column mt-2">
                            {/* <h5 className="underline-on-hover">{service.serviceProviderId.firstName} {service.serviceProviderId.lastName}</h5> */}
                            <p className="text-center">
                              <span className={
                                service.serviceProviderId.status === "PENDING" ? "badge badge-warning" :
                                service.serviceProviderId.status === "APPROVED" ? "badge badge-success" :
                                service.serviceProviderId.status === "REJECTED" ? "badge badge-success" : "badge badge-secondary"}>{service.serviceProviderId.status}</span></p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </td>
                </tr>
              }) : null}

            </tbody>
          </table>
        </div>
      </> : null}

    </div>
  </>
}

export default SerivceProviders;