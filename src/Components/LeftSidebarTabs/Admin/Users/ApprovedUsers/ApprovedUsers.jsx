// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DATA TABLE STUFF
import DataTables from "datatables.net-dt";

// COMPONENTS
import Swal from "sweetalert2";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersReducer, updateSingleUserReducer } from "../../../../../Redux/Slices/UsersSlice";


// ICONS
// import { BsQuestionLg } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";

const ApprovedUsers = () => {

  const { Approved } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UPDATING STATUS
  function updateThis(updateTo, user) {
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
              dispatch(updateSingleUserReducer({ updateTo, user }));

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
              dispatch(updateSingleUserReducer({ updateTo, user }));

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
    dispatch(getAllUsersReducer());

    new DataTables("#table-users-approved");
  }, [dispatch]);

  return <>


    {/* TABLE */}
    <table id="table-users-approved" className="table table-sm m-2">
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

        {Approved ? Approved.map((user, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-success position-absolute" style={{ top: "-5%", left: "-1%" }}>{user.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{user.firstName} {user.lastName}</h5>
                      <p className="card-text m-0">{user.email}</p>
                      <p className="card-text">Role: {user.role}</p>
                    </div>
                    <div className="pe-3 d-flex mb-3">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${user._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-danger ms-1" onClick={() => updateThis("REJECTED", user)}>Mark as Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>

            {/* Table */}
            {/* <th scope="row">{i + 1}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <span className="badge text-bg-success">{user.status}</span>
            </td>
            <td>
              <button className="btn btn-sm btn-warning me-1" onClick={() => updateThis("PENDING", user)}>
                <BsQuestionLg style={{ height: 20, width: 20 }} />
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => updateThis("REJECTED", user)}>
                <RxCross2 style={{ height: 20, width: 20 }} />
              </button>
            </td> */}
          </tr>
        }) : null}

      </tbody>

    </table>
  </>
}

export default ApprovedUsers;