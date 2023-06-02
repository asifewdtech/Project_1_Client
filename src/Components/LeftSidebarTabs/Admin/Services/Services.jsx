// HOOKS
import { useEffect } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { getAllServicesReducer } from "../../../../Redux/Slices/ServicesSlice_Admin";

// COMPONENTS
import ApprovedServices from "./ApprovedServices/ApprovedServices";
import PendingServices from "./PendingServices/PendingServices";
import RejectedServices from "./RejectedServices/RejectedServices";

// BOOTSTRAP COMPONENTS
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Services = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServicesReducer());
  }, [dispatch])
  return <>
    <div className="row p-2">
      <h3>Services</h3>
      
      <div className="col">
        <Tabs defaultActiveKey="approved" id="justify-tab-example" className="mb-3" justify>

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