// HOOKS
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllServiceProvidersThunk } from "../../../../Redux/Slices/ServiceProviders_Company";

// DATA TABLES
import DataTables from "datatables.net-dt";

// INCONS
import { GrPowerReset } from "react-icons/gr";

const SerivceProviders = () => {

  const { register, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { AllServiceProviders, FilteredServiceProviders } = useSelector((state) => state.ServiceProviders_Company);

  function resetButton(event) {
    event.preventDefault();
  }

  useEffect(() => {
    if (!AllServiceProviders) dispatch(getAllServiceProvidersThunk());
  }, []);

  useEffect(() => {
    new DataTables("#table-service-providers");
    new DataTables("#table-service-providers-filtered");
  }, [AllServiceProviders])

  return <>
    <div className="row p-2">
      <h3>Service Providers</h3>

      {/* FORM OF FILTERS */}
      <div className="card mx-3 p-0 col">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="form-group col m-0">
                <input type="text" className="form-control" placeholder="Search here"
                  {...register("text")} />
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

      {AllServiceProviders && !FilteredServiceProviders ? <>
        <div className="col-12 mt-3">
          {/* TABLE */}
          <table id="table-service-providers" style={{ width: "100%" }}>

            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {AllServiceProviders && !FilteredServiceProviders ? AllServiceProviders.map((user, i) => {
                return <tr key={i}>
                  {/* <th scope="row">{i + 1}</th> */}
                  <td>
                    <div className="card mb-3 position-relative" key={i}>
                      <div className="row g-0">

                        <div className="col-2">
                          <img src="https://picsum.photos/300" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                        </div>

                        <div className="col-7">
                          <div className="card-body">
                            <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                            <p className="m-0">Email: {user.email}</p>
                          </div>
                          <div className="d-flex">
                            <button className="btn btn-sm btn-primary ms-3" onClick={() => navigate(`/dashboard/company/service-provider-details/${user._id}`)}>View Details</button>
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