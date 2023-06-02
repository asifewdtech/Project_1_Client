// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateSingleServiceReducer } from "../../../../../Redux/Slices/ServicesSlice_Admin";

// ICONS & DATATABLES
import Swal from "sweetalert2";
import DataTables from "datatables.net-dt";

const RejectedServices = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Rejected } = useSelector((state) => state.Services_Admin);

  // UPDATING STATUS
  function updateThis(updateTo, service) {

    switch (updateTo) {

      // APPORVING THE REQUEST
      case "APPROVED":
        new Swal({
          title: "Approve request?",
          text: "Are you sure you want to approve this request?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#34c997",
          confirmButtonText: "Approve",
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(updateSingleServiceReducer({ updateTo, service }));

              return new Swal({
                title: "Request Approved",
                confirmButtonColor: "#88aaf3",
                icon: "success",
                backdrop: true,
              })
            }
          });
        break;

      // DECLINING THE REQUEST
      case "PENDING":
        new Swal({
          title: "Pequest on Pending?",
          text: "Are you sure you want to put this request in pending?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#ffc107",
          confirmButtonText: "Pending",
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            // APPORVING THE REQUEST
            if (result.isConfirmed) {
              dispatch(updateSingleServiceReducer({ updateTo, service }));

              return new Swal({
                title: "Request On Pending",
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

  useEffect(() => {
    new DataTables("#table-services-rejected");
  }, [])

  return <>

    <table id="table-services-rejected" className="table table-sm m-2">
      <thead>

        <tr>
          <th scope="col"></th>
        </tr>

      </thead>
      <tbody>
        {Rejected ? Rejected.map((service, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative" key={i}>
                <span className="badge bg-danger position-absolute" style={{ top: "-5%", left: "-5px" }}>{service.status}</span>
                <div className="row g-0">

                  <div className="col-3" style={{maxWidth: 200}}>
                    <img src="https://picsum.photos/500/400" className="img-fluid rounded-start" alt="" style={{ width: "100%" }} />
                  </div>

                  <div className="col-7">
                    <div className="card-body">
                      <h5 className="card-title">{service.title}</h5>
                      <p className="card-text description-truncate">{service.description}</p>
                    </div>
                    <div className="pe-3 d-flex">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/admin/service-details/${service._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-success ms-1" onClick={() => updateThis("APPROVED", service)}>Mark as Approved</button>
                    </div>
                  </div>

                  <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                    <img src="https://picsum.photos/50" className="rounded-circle mt-3" width={50} height={50} alt="" />
                    <div className="d-flex flex-column mt-2">
                      {/* <h5 className="underline-on-hover">{service.serviceProviderId.firstName} {service.serviceProviderId.lastName}</h5>
                      <p className="text-center">
                        <span className={service.serviceProviderId.status === "APPROVED" ? "badge badge-success" :
                                        service.serviceProviderId.status === "PENDING" ? "badge badge-warning" :
                                        service.serviceProviderId.status === "REJECTED" ? "badge badge-danger" : "badge badge-secondary"}>{service.serviceProviderId.status}</span>
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
  </>
}

export default RejectedServices;