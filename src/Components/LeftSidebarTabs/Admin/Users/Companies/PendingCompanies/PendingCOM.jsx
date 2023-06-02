// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllCompaniesReducer, updateSingleCompany } from "../../../../../../Redux/Slices/CompaniesSlice/CompanySlice_AD";


// SERVICES
import Swal from "sweetalert2";
import DataTables from "datatables.net-dt";

// ICONS 
// import { MdOutlineDone } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";

const PendingCOM = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Pending } = useSelector((state) => state.Companies_AD);

  function updateThis(updateTo, id) {

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
              dispatch(updateSingleCompany({ updateTo, id }));

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
      case "REJECTED":
        new Swal({
          title: "Reject request?",
          text: "Are you sure you want to reject this request?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#ec4a58",
          confirmButtonText: "Reject",
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            // APPORVING THE REQUEST
            if (result.isConfirmed) {
              dispatch(updateSingleCompany({ updateTo, id }));

              return new Swal({
                title: "Request Rejected",
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
    dispatch(getAllCompaniesReducer());

    new DataTables("#table-company-pending");
  }, [dispatch]);

  return <>
    {/* TABLE */}
    <table id="table-company-pending" className="table table-sm me-2 ms-1">
      <thead>

        <tr>
          <th scope="col"></th>
        </tr>

      </thead>
      <tbody>

        {Pending ? Pending.map((company, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-warning text-dark position-absolute" style={{ top: "-5%", left: "-1%" }}>{company.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/150" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{company.firstName} {company.lastName}</h5>
                      <p className="card-text m-0">{company.email}</p>
                      <p className="card-text m-0">Role: {company.role}</p>
                    </div>
                    <div className="pe-3 d-flex">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${company._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-success ms-1" onClick={() => updateThis("APPROVED", company._id)}>Mark as Approved</button>
                      <button className="btn btn-sm btn-danger ms-1" onClick={() => updateThis("REJECTED", company._id)}>Mark as Rejected</button>
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

export default PendingCOM;