// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DATA TABLE STUFF
// import $ from "jquery";
import DataTables from "datatables.net-dt";

// COMPONENTS
import Swal from "sweetalert2";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllCompaniesReducer, updateSingleCompany } from "../../../../../../Redux/Slices/CompaniesSlice/CompanySlice_AD";


const ApprovedCOM = () => {
  const { Approved } = useSelector((state) => state.Companies_AD);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UPDATING STATUS
  function updateThis(updateTo, id) {
    switch (updateTo) {

      // APPORVING THE REQUEST
      case "PENDING":
        new Swal({
          title: "Request on Pending?",
          text: "Are you sure you want to put this request in pending?",
          icon: "question",
          backdrop: true,
          allowOutsideClick: false,
          allowEnterKey: false,
          confirmButtonColor: "#ffc107",
          confirmButtonText: updateTo,
          showDenyButton: true,
          denyButtonColor: "#6c757d",
          denyButtonText: "Cancel",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(updateSingleCompany({ updateTo, id }));

              return new Swal({
                title: "Request On Pending",
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
          confirmButtonText: updateTo,
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
    if(!Approved)  dispatch(getAllCompaniesReducer());

    new DataTables("#table-company-approved");
  }, [dispatch]);

  return <>


    {/* TABLE */}
    <table id="table-company-approved" className="table table-sm m-2">
      <thead>

        <tr>
          <th scope="col"></th>
          {/* <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th> */}
        </tr>

      </thead>
      <tbody>

        {Approved ? Approved.map((company, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-1%" }}>{company.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{company.firstName} {company.lastName}</h5>
                      <p className="card-text m-0">{company.email}</p>
                      {/* <p className="card-text">Role: {company.role}</p> */}
                    </div>
                    <div className="pe-3 d-flex mb-3">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${company._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-danger ms-1" onClick={() => updateThis("REJECTED", company._id)}>Mark as Reject</button>
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

export default ApprovedCOM;