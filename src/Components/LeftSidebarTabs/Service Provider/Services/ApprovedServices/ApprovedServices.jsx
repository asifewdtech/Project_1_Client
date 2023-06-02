// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DATA TABLES
import DataTables from "datatables.net-dt";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesReducer_SP } from "../../../../../Redux/Slices/ServicesSlice_SP"

const ApprovedServices = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Approved } = useSelector((state) => state.Services_SP);

  useEffect(() => {
    new DataTables("#table-service-approved");
    dispatch(getAllServicesReducer_SP());
  }, []);

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
        <div className="card mb-3 position-relative">
          <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-5px" }}>{service.status}</span>
          <div className="row g-0">

            <div className="col-3" style={{maxWidth: 300}}>
              <img src="https://picsum.photos/300/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
            </div>

            <div className="col">
              <div className="card-body p-2 ps-3">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text description-truncate">{service.description}</p>
              </div>
              <div className="d-flex">
                <button className="btn btn-sm btn-primary ms-3" onClick={() => navigate(`/dashboard/service-provider/service-details/${service._id}`)}>View Details</button>
              </div>
            </div>

          </div>
        </div>
      </td>
    </tr>
  }) : null}

</tbody>
</table>
  </>
}

export default ApprovedServices;