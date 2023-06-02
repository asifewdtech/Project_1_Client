// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// DATA TABLES
import DataTables from "datatables.net-dt";

const PendingServices = () => {

  const navigate = useNavigate();
  const { Pending } = useSelector((state) => state.Services_SP);

  useEffect(() => {
    new DataTables("#table-service-pending");
  }, []);

  return <>
    <table id="table-service-pending" style={{ width: "100%" }}>

      <thead>
        <tr>
          {/* <th scope="col">#</th> */}
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {Pending ? Pending.map((service, i) => {
          return <tr key={i}>
            {/* <th scope="row">{i + 1}</th> */}
            <td>
              <div className="card mb-3 position-relative" key={i}>
                <span className="badge bg-warning text-dark position-absolute" style={{ top: "-5%", left: "-5px" }}>{service.status}</span>
                <div className="row g-0">

                  <div className="col-3">
                    <img src="https://picsum.photos/300/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col-9">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title">{service.title}</h5>
                      <p className="card-text description-truncate m-0">{service.description}</p>
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

export default PendingServices;