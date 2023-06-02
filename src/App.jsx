// ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORT COMPONENTS
import SignIn from "./Pages/SignIn/SignIn";
import SIGN_IN_ADMIN from "./Pages/SignIn_Admin/SignIn_Admin";
import SignUp from "./Pages/SignUp/SignUp";
import { SignUpDetails } from "./Pages/SignUp/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ServiceDetailsAdmin from "./Components/LeftSidebarTabs/Admin/Services/ServiceDetails/ServiceDetails";
import ServiceDetailsSP from "./Components/LeftSidebarTabs/Service Provider/Services/ServiceDetails/ServiceDetails";
import ServiceDetailsCOM from "./Components/LeftSidebarTabs/Company/Services/ServiceDetails/ServiceDetails";
import ServiceProviderDetailsCOM from "./Components/LeftSidebarTabs/Company/ServiceProviders/ServiceProviderDetails/ServiceProviderDetails";
import AddSocialAccounts from "./Pages/AddSocialAccounts/AddSocialAccounts";

// CSS
import "./App.css";

const App = () => {

  return <>
    {/* TOAST */}
    <div className="toast align-items-center m-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body"></div>
      </div>
    </div>

    {/* APP ROUTES */}
    <div className="container-fluid m-0 p-0">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/admin-sign-in" element={<SIGN_IN_ADMIN />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up-details" element={<SignUpDetails />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/service-details/:id" element={<ServiceDetailsAdmin />}/>
            <Route path="/dashboard/service-provider/service-details/:id" element={<ServiceDetailsSP />}/>
            <Route path="/dashboard/service-details/:id" element={<ServiceDetailsCOM />}/>
            <Route path="/dashboard/service-provider-details/:id" element={<ServiceProviderDetailsCOM />}/>
            <Route path="/dashboard/user-profile" element={<UserProfile />} />
            <Route path="/dashboard/social-media-accounts" element={<AddSocialAccounts />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  </>
}

export default App;