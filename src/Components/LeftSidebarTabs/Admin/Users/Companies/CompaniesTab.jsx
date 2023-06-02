// COMPONENTS
import ApprovedCOM from "./ApprovedCompanies/ApprovedCOM";
import PendingCOM from "./PendingCompanies/PendingCOM";
import RejectedCOM from "./RejectedCompanies/RejectedCOM";

// BOOTSTRAP COMPONENTS
import { Tab, Tabs } from "react-bootstrap";

const CompaniesTab = () => {


  return (
    <>
      {/* <Tab eventKey="Company" title="Company"> */}
        <div className="col">

          <Tabs defaultActiveKey="approved" id="justify-tab-example" className="mb-3 justify-content-end" >

            <Tab eventKey="approved" title="Approved Companies">
              <ApprovedCOM />
            </Tab>

            <Tab eventKey="pending" title="Pending Companies">
              <PendingCOM />
            </Tab>

            <Tab eventKey="rejected" title="Rejected Companies">
              <RejectedCOM />
            </Tab>

          </Tabs>
        </div>
      {/* </Tab> */}
    </>
  )
}

export default CompaniesTab;