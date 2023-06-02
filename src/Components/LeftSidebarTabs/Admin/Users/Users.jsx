// HOOKS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch } from "react-redux";
import { getAllUsersReducer } from "../../../../Redux/Slices/UsersSlice";
import { getAllCompaniesReducer } from "../../../../Redux/Slices/CompaniesSlice/CompanySlice_AD";
// import { getAllCompaniesForAdmin } from "../../../../Redux/Slices/CompaniesSlice/CompanySlice_AD";
// import { getAllApprovedCompaniesForAdmin } from "../../../../Redux/Slices/CompaniesSlice/ApprovedCompanySlice";
// import { getAllPendingCompaniesForAdmin } from "../../../../Redux/Slices/CompaniesSlice/PendingCompanySlice";
// import { getAllRejectedCompaniesForAdmin } from "../../../../Redux/Slices/CompaniesSlice/RejectedCompanySlice";

// COMPONENTS
import ApprovedUsers from "./ApprovedUsers/ApprovedUsers";
import PendingUsers from "./PendingUsers/PendingUsers";
import RejectedUsers from "./RejectedUsers/RejectedUsers";
import AddNewUser from "./AddNewUser";
import CompaniesTab from "./Companies/CompaniesTab";

// BOOTSTRAP COMPONENTS
import { Tab, Tabs } from "react-bootstrap";


const Users = () => {

  // MODAL HANDLERS
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {Companies_AD} = useSelector((state) => state)
  // const {ApprovedCompanies_AD} = useSelector((state) => state)
  // const {PendingCompanies_AD} = useSelector((state) => state)
  // const {RejectedCompanies_AD} = useSelector((state) => state)

  // console.log(ApprovedCompanies_AD);
  // console.log(PendingCompanies_AD);
  // console.log(RejectedCompanies_AD);

  useEffect(() => {
    dispatch(getAllUsersReducer());
    dispatch(getAllCompaniesReducer())
    // dispatch(getAllCompaniesForAdmin());
    // dispatch(getAllApprovedCompaniesForAdmin());
    // dispatch(getAllPendingCompaniesForAdmin());
    // dispatch(getAllRejectedCompaniesForAdmin());
  }, [dispatch, navigate]);



  return <>
    <div className="row p-2">
      <h3>Users</h3>
      <Tabs defaultActiveKey="service provider" id="justify-tab-example" className="mb-3 justify-content-start mb-5" >

        <Tab eventKey="service provider" title="Service Providers">
        <div className="col">
        <button className="btn btn-primary position-absolute" onClick={handleShow}>Add New User</button>

        <Tabs defaultActiveKey="approved" id="justify-tab-example" className="mb-3 justify-content-end" >

          <Tab eventKey="approved" title="Approved Users">
            <ApprovedUsers />
          </Tab>

          <Tab eventKey="pending" title="Pending Users">
            <PendingUsers />
          </Tab>

          <Tab eventKey="rejected" title="Rejected Users">
            <RejectedUsers />
          </Tab>

        </Tabs>
      </div>
        </Tab>

        <Tab eventKey="comapany" title="Company">
          <CompaniesTab/>
        </Tab>

      </Tabs>
      {/* <div className="col">
        <button className="btn btn-primary position-absolute" onClick={handleShow}>Add New User</button>

        <Tabs defaultActiveKey="approved" id="justify-tab-example" className="mb-3 justify-content-end" >

          <Tab eventKey="approved" title="Approved Users">
            <ApprovedUsers />
          </Tab>

          <Tab eventKey="pending" title="Pending Users">
            <PendingUsers />
          </Tab>

          <Tab eventKey="rejected" title="Rejected Users">
            <RejectedUsers />
          </Tab>

        </Tabs>
      </div> */}
    </div>

    {/* ADD NEW USER */}
    <AddNewUser show={show} handleShow={handleShow} handleClose={handleClose} />

  </>
}

export default Users;