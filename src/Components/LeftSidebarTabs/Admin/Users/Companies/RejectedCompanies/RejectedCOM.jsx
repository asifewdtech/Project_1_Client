// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAllCompaniesReducer, updateSingleCompany } from "../../../../../../Redux/Slices/CompaniesSlice/CompanySlice_AD";

// SERVICES
import Swal from "sweetalert2";
import DataTables from "datatables.net-dt";

// ICONS 
// import { MdOutlineDone } from "react-icons/md";
// import { BsQuestionLg } from "react-icons/bs";

const RejectedCOM = () => {
  const { Rejected } = useSelector((state) => state.Companies_AD);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UPDATING STATUS
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
              dispatch(updateSingleCompany({updateTo, id}));

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
          confirmButtonColor: "#ec4a58",
          confirmButtonText: "Pending",
          showDenyButton: true,
          denyButtonColor: "#ffc107",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            // APPORVING THE REQUEST
            if (result.isConfirmed) {
              dispatch(updateSingleCompany({updateTo, id}));

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
    dispatch(getAllCompaniesReducer());

    new DataTables("#table-company-rejected");
  }, [dispatch])

  return <>
    <table id="table-company-rejected" className="table -sm m-2">
      <thead>

        <tr>
          <th scope="col"></th>
        </tr>

      </thead>
      <tbody>

        {Rejected ? Rejected.map((company, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-danger position-absolute" style={{ top: "-5%", left: "-1%" }}>{company.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{company.firstName} {company.lastName}</h5>
                      <p className="card-text m-0">{company.email}</p>
                      <p className="card-text m-0">Role: {company.role}</p>
                    </div>
                    <div className="pe-3 d-flex justify-content-between">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${company._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-success ms-1" onClick={() => updateThis("APPROVED", company._id)}>Mark as Approved</button>
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

export default RejectedCOM;