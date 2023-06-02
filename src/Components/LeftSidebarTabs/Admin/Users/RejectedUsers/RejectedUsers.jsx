// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { updateSingleUserReducer} from "../../../../../Redux/Slices/UsersSlice";

// SERVICES
import Swal from "sweetalert2";
import DataTables from "datatables.net-dt";

// ICONS 
// import { MdOutlineDone } from "react-icons/md";
// import { BsQuestionLg } from "react-icons/bs";

const RejectedUsers = () => {

  const { Rejected } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UPDATING STATUS
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
              dispatch(updateSingleUserReducer({updateTo, user}));

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
              dispatch(updateSingleUserReducer({updateTo, user}));

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

    new DataTables("#table-users-rejected");
  }, [dispatch, Rejected])

  return <>
    <table id="table-users-rejected" className="table -sm m-2">
      <thead>

        <tr>
          <th scope="col"></th>
        </tr>

      </thead>
      <tbody>

        {Rejected ? Rejected.map((user, i) => {
          return <tr key={i}>
            <td>
              <div className="card mb-3 position-relative">
                <span className="badge bg-danger position-absolute" style={{ top: "-5%", left: "-1%" }}>{user.status}</span>
                <div className="row g-0">

                  <div className="col" style={{maxWidth: 120}} >
                    <img src="https://picsum.photos/200" className="img-fluid rounded-start" alt="" style={{ maxHeight: 200 }} />
                  </div>

                  <div className="col">
                    <div className="card-body p-2 ps-3">
                      <h5 className="card-title m-0">{user.firstName} {user.lastName}</h5>
                      <p className="card-text m-0">{user.email}</p>
                      <p className="card-text m-0">Role: {user.role}</p>
                    </div>
                    <div className="pe-3 d-flex justify-content-between">
                      <button className="btn btn-sm btn-primary ms-3 me-auto" onClick={() => navigate(`/dashboard/user-details/${user._id}`)}>View Details</button>
                      <button className="btn btn-sm btn-success ms-1" onClick={() => updateThis("APPROVED", user)}>Mark as Approved</button>
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
              <span className="badge text-bg-danger">{user.status}</span>
            </td>
            <td>
              <button className="btn btn-sm btn-success me-1" onClick={() => updateThis("APPROVED", user)}>
                <MdOutlineDone style={{ height: 20, width: 20 }} />
              </button>
              <button className="btn btn-sm btn-warning" onClick={() => updateThis("PENDING", user)}>
                <BsQuestionLg style={{ height: 20, width: 20 }} />
              </button>
            </td> */}
          </tr>
        }) : null}

      </tbody>

    </table>
  </>
}

export default RejectedUsers;