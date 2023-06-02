// HOOKS
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";

// REDUX
import {
  tabDashboard, tabServicesAdmin, tabUsersAdmin, tabGetServiceAdmin,
  tabServicesSP,
  tabServicesCOM, tabServiceProvidersCOM
} from "../../../Redux/Slices/TabSlice";

// ICONS
import { MdKeyboardArrowRight } from "react-icons/md";

export const BreadCrumbsAdmin = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state);

  return <>
    <div className="p-2 pb-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-0">

          {/* DASHBOARD */}
          {(location.pathname === "/dashboard" && tab === "DASHBOARD") ? <li className="bread-crumbs active">Dashboard</li> : null}

          {/* USER PROFILE */}
          {location.pathname === "/dashboard/user-profile" ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">User Profile</li>
            </> : null}

          {/* CATEGORIES ON ADMIN */}
          {(location.pathname === "/dashboard" && tab === "CATEGORIES_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Categories</li>
            </> : null}

          {/* USERS ON ADMIN */}
          {(location.pathname === "/dashboard" && tab === "USERS_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Users</li>
            </> : null}

          {/* SERVICE ON ADMIN */}
          {(location.pathname === "/dashboard" && tab === "SERVICES_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Services</li>
            </>
            : null}

          {/* GET_SERVICES ON ADMIN */}
          {(location.pathname === "/dashboard" && tab === "GET_SERVICE_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Get Service</li>
            </>
            : null}

          {/* SERVICE DETAILS FROM GET_SERVICES ON ADMIN*/}
          {(location.pathname === `/dashboard/admin/service-details/${id}` && tab === "GET_SERVICE_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabGetServiceAdmin()); navigate("/dashboard"); }}>Get Service</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Details</li>
            </>
            : null}

          {/* SERVICE DETAILS FROM SERVICES_ADMIN ON ADMIN*/}
          {(location.pathname === `/dashboard/admin/service-details/${id}` && tab === "SERVICES_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabServicesAdmin()); navigate("/dashboard"); }}>Services</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Details</li>
            </>
            : null}

          {/* USER DETAILS FROM USERS_ADMIN ON ADMIN */}
          {(location.pathname === `/dashboard/user-details/${id}` && tab === "USERS_ADMIN") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabUsersAdmin()); navigate("/dashboard"); }}>Users</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">User Details</li>
            </>
            : null}

        </ol>
      </nav>
    </div>

  </>
}

export const BreadCrumbsSP = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state);

  return <>
    <div className="p-2 pb-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-0">

          {/* DASHBOARD */}
          {(location.pathname === "/dashboard" && tab === "DASHBOARD") ? <li className="bread-crumbs active">Dashboard</li> : null}

          {/* USER PROFILE */}
          {location.pathname === "/dashboard/user-profile" ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">User Profile</li>
            </> : null}

          {/* USER PROFILE */}
          {location.pathname === "/dashboard" && tab === "ACCOUNTS_SP" ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Social Media Accounts</li>
            </> : null}

          {/* SERVICES ON SERVICE PROVIDER */}
          {(location.pathname === "/dashboard" && tab === "SERVICES_SP") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Services</li>
            </> : null}

          {/* SERVICE DETAILS ON SERVICE PROVIDER */}
          {(location.pathname === `/dashboard/service-provider/service-details/${id}` && tab === "SERVICES_SP") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabServicesSP()); navigate("/dashboard"); }}>Services</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Details</li>
            </> : null}

        </ol>
      </nav>
    </div>

  </>
}

export const BreadCrumbsCOM = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state);

  return <>
    <div className="p-2 pb-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-0">

          {/* DASHBOARD */}
          {(location.pathname === "/dashboard" && tab === "DASHBOARD") ? <li className="bread-crumbs active">Dashboard</li> : null}

          {/* USER PROFILE */}
          {location.pathname === "/dashboard/user-profile" ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">User Profile</li>
            </> : null}

          {/* SERVICES ON COMPANY */}
          {(location.pathname === "/dashboard" && tab === "SERVICES_COMPANY") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Services</li>
            </> : null}

          {/* SERVICE PROVIDERS ON COMPANY */}
          {(location.pathname === "/dashboard" && tab === "SERVICE_PROVIDERS_COMPANY") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Providers</li>
            </> : null}

          {/* SERVICE DETAILS ON COMPANY */}
          {(location.pathname === `/dashboard/company/service-details/${id}` && tab === "SERVICES_COMPANY") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabServicesCOM()); navigate("/dashboard"); }}>Services</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Details</li>
            </> : null}

          {/* SERVICE PROVIDER DETTAILS ON COMPANY */}
          {(location.pathname === `/dashboard/company/service-provider-details/${id}` && tab === "SERVICE_PROVIDERS_COMPANY") ?
            <><li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabDashboard()); navigate("/dashboard"); }}>Dashboard</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs link-primary text-decoration-underline underline-on-hover" onClick={() => { dispatch(tabServiceProvidersCOM()); navigate("/dashboard"); }}>Service Providers</li>
              <li className="bread-crumbs"><MdKeyboardArrowRight style={{ position: "relative", top: "-5%" }} /></li>
              <li className="bread-crumbs active">Service Provider Details</li>
            </> : null}
        </ol>
      </nav>
    </div>
  </>
}