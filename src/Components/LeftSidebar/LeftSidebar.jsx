// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX & ACTIONS
import { useDispatch, useSelector } from "react-redux";
import { tabUserProfile, tabDashboard, 
          tabUsersAdmin, tabServicesAdmin, tabGetServiceAdmin, tabCategoriesAdmin,
          tabServicesSP, tabAccountsSP,
          tabServicesCOM, tabServiceProvidersCOM } from "../../Redux/Slices/TabSlice";
          
// TOKEN
import { decodedToken } from "../../Utilities/AppUtilities";

// SERVICES & UTILITIES
// import { decodedToken } from "../../Utilities/AppUtilities";

// ICONS
import { FaUsers } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";

const LeftSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tab } = useSelector((state) => state);
  const userLoggedIn = decodedToken().user;
  
  useEffect(() => {
    if(!localStorage.getItem("token")) return navigate("/");
  }, [])

  return <>
    <div className="ec-left-sidebar ec-bg-sidebar">
      <div id="sidebar" className="sidebar ec-sidebar-footer">

        <div className="ec-brand">
          <span title="Ekka">
            {/* <img className="ec-brand-icon" src="assets/img/logo/ec-site-logo.png" alt="" /> */}
            <span className="ec-brand-name text-truncate">CCAdmin</span>
          </span>
        </div>

        <div className="ec-navigation" data-simplebar>
          <ul className="nav sidebar-inner" id="sidebar-menu">

            <li className={tab === "DASHBOARD" ? "active" : null} onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>
              <span className="sidenav-item-link">
                <MdOutlineDashboard style={{ height: 25, width: 25 }} className="me-2" />
                <span className="nav-text">Dashboard</span>
              </span>
            </li>
            <hr />

            {/* ROLE - ADMIN */}
            {userLoggedIn && userLoggedIn.role === "ADMIN" ? <>

              <li className={tab === "CATEGORIES_ADMIN" ? "active" : null} onClick={() => { dispatch(tabCategoriesAdmin()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdOutlineCategory style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Categories</span>
                </span>
              </li>

              <li className={tab === "USERS_ADMIN" ? "active" : null} onClick={() => { dispatch(tabUsersAdmin()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <FaUsers style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Users</span>
                </span>
              </li>

              <li className={tab === "SERVICES_ADMIN" ? "active" : null} onClick={() => { dispatch(tabServicesAdmin()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdDesignServices style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Services</span>
                </span>
              </li>

              <li className={tab === "GET_SERVICE_ADMIN" ? "active" : null} onClick={() => { dispatch(tabGetServiceAdmin()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdOutlineMedicalServices style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Get Service</span>
                </span>
              </li>

            </> : null}

            {/* ROLE - SERVICE PROVIDER */}
            {userLoggedIn && userLoggedIn.role === "SP" ? <>
              <li className={tab === "SERVICES_SP" ? "active" : null} onClick={() => { dispatch(tabServicesSP()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdOutlineDesignServices style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Services</span>
                </span>
              </li>

              <li className={tab === "ACCOUNTS_SP" ? "active" : null} onClick={() => { dispatch(tabAccountsSP()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdOutlineAccountTree style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Accounts</span>
                </span>
              </li>

            </> : null}

            {/* ROLE - COMPANY */}
            {userLoggedIn && userLoggedIn.role === "COM" ? <>
              <li className={tab === "SERVICES_COMPANY" ? "active" : null} onClick={() => { dispatch(tabServicesCOM()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <MdDesignServices style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Services</span>
                </span>
              </li>

              <li className={tab === "SERVICE_PROVIDERS_COMPANY" ? "active" : null} onClick={() => { dispatch(tabServiceProvidersCOM()); navigate("/dashboard"); }}>
                <span className="sidenav-item-link">
                  <BsBriefcase style={{ height: 25, width: 25 }} className="me-2" />
                  <span className="nav-text">Service Providers</span>
                </span>
              </li>

            </> : null}

            <li className={tab === "USER_PROFILE" ? "active" : null} onClick={() => { dispatch(tabUserProfile());}}>
              <span className="sidenav-item-link">
                <FaRegUser style={{ height: 25, width: 25 }} className="me-2" />
                <span className="nav-text">User Profile</span>
              </span>
            </li>

            <hr />

          </ul>
        </div>
      </div>
    </div>

  </>
}

export default LeftSidebar;