// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ROUTER DOM
import { useParams, Outlet } from "react-router-dom";
import "./Dashboard.css";

// REDUX
import { useDispatch } from "react-redux";
import { tabDashboard } from "../../Redux/Slices/TabSlice";
import { getAllCategoriesReducer } from "../../Redux/Slices/CategoriesSlice";
import { getAllSubCategoriesReducer } from "../../Redux/Slices/SubCategoriesSlice";
import { getAllServicesReducer_SP } from "../../Redux/Slices/ServicesSlice_SP";
import { getAllUsersReducer } from "../../Redux/Slices/UsersSlice";
import { getAllServicesReducer } from "../../Redux/Slices/ServicesSlice_Admin";
import { getAllCompaniesReducer } from "../../Redux/Slices/CompaniesSlice/CompanySlice_AD";

// COMPONENTS
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Header from "../../Components/Header/Header";
import Wrapper from "../../Components/Wrapper/Wrapper";
import { BreadCrumbsAdmin, BreadCrumbsSP, BreadCrumbsCOM } from "../../Components/UI Elements/BreadCrumbs/BreadCrumbs";
import ExtendSessionModal from "../../Components/UI Elements/ExtendSessionModal/ExtendSessionModal";

// TOKEN
import { decodedToken } from "../../Utilities/AppUtilities";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (localStorage.getItem("tempUser")) localStorage.removeItem("tempUser");
  // const userLoggedIn = null;
  const userLoggedIn = decodedToken().user;

  const { id } = useParams();

  useEffect(() => {
    if(!localStorage.getItem("token")) return navigate("/");
    dispatch(tabDashboard());
    dispatch(getAllCategoriesReducer());
    dispatch(getAllSubCategoriesReducer());

    if(userLoggedIn.role === "ADMIN") {
      dispatch(getAllUsersReducer());
      dispatch(getAllServicesReducer());
      dispatch(getAllCompaniesReducer());
    }
    if(userLoggedIn.role === "SP") {
      dispatch(getAllServicesReducer_SP());
    }
    if(userLoggedIn.role === "COM") {
      
    }
  }, []);

  return <>
  <ExtendSessionModal />
    <div className="wrapper">
      <LeftSidebar />
      <div className="ec-page-wrapper">
        <Header />
        {userLoggedIn && userLoggedIn.role === "ADMIN" ?<BreadCrumbsAdmin /> : null}
        {userLoggedIn && userLoggedIn.role === "SP" ? <BreadCrumbsSP /> : null}
        {userLoggedIn && userLoggedIn.role === "COM" ? <BreadCrumbsCOM /> : null}
        { id ? <Outlet /> : <Wrapper />}
      </div>
    </div>
  </>
}

export default Dashboard;