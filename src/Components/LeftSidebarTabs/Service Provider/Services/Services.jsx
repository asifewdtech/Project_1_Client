// HOOKS
import { useState, useEffect } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { getAllServicesReducer_SP } from "../../../../Redux/Slices/ServicesSlice_SP";

// COMPONENTS
import AddNewService from "./AddNewService/AddNewService";
import ApprovedServices from "./ApprovedServices/ApprovedServices";
import PendingServices from "./PendingServices/PendingServices";
import RejectedServices from "./RejectedServices/RejectedServices";

// BOOTSTRAP COMPONENTS
import { Tab, Tabs } from "react-bootstrap";

const Services = () => {

  const dispatch = useDispatch();

  // MODAL HANDLERS - ADD NEW SERVICE
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getAllServicesReducer_SP());
  }, [dispatch]);

  return <>
    <div className="row p-2">
      <h3>Services</h3>
      
      <div className="col">
        <button className="btn btn-primary position-absolute" onClick={handleShow}>Add New Service</button>
        <AddNewService show={show} handleClose={handleClose}/>

        <Tabs defaultActiveKey="approved" id="justify-tab-example" className="mb-3 justify-content-end" >

          <Tab eventKey="approved" title="Approved Services">
            <ApprovedServices />
          </Tab>

          <Tab eventKey="pending" title="Pending Services">
            <PendingServices />
          </Tab>

          <Tab eventKey="rejected" title="Rejected Services">
            <RejectedServices />
          </Tab>

        </Tabs>
      </div>
    </div>
  </>
}

export default Services;