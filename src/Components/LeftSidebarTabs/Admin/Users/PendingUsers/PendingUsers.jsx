// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { updateSingleUserReducer } from "../../../../../Redux/Slices/UsersSlice";

// SERVICES
import Swal from "sweetalert2";
import DataTables from "datatables.net-dt";

// ICONS 
// import { MdOutlineDone } from "react-icons/md";
// import { RxCross2 } from "react-icons/rx";

const PendingUsers = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Pending } = useSelector((state) => state.Users);

  function updateThis(updateTo, user) {

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
              dispatch(updateSingleUserReducer({ updateTo, user }));

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

    new DataTables("#table-users-pending");
  }, [dispatch]);

  return <>
    {/* TABLE */}
    <table id="table-users-pending" className="table table-sm me-2 ms-1">
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

        {Pending ? Pending.map((user, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-warning text-dark position-absolute" style={{ top: "-5%", left: "-1%" }}>{user.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/150" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{user.firstName} {user.lastName}</h5>
                      <p className="card-text m-0">{user.email}</p>
                      <p className="card-text m-0">Role: {user.role}</p>
                    </div>
                    <div className="pe-3 d-flex">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${user._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-success ms-1" onClick={() => updateThis("APPROVED", user)}>Mark as Approved</button>
                      <button className="btn btn-sm btn-danger ms-1" onClick={() => updateThis("REJECTED", user)}>Mark as Rejected</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>

            {/* TABLE */}
            {/* <th scope="row">{i + 1}</th>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <span className="badge text-bg-warning">{user.status}</span>
            </td>
            <td>
              <button className="btn btn-sm btn-success me-1" onClick={() => updateThis("APPROVED", user)}>
                <MdOutlineDone style={{ height: 20, width: 20 }} />
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

export default PendingUsers;