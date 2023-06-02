// HOOKS


// COMPONENTS - ADMIN
import MainPanel from "../LeftSidebarTabs/MainPanel/MainPanel";
import CATEGORIES_ADMIN from "../LeftSidebarTabs/Admin/Categories/Categories";
import USERS_ADMIN from "../LeftSidebarTabs/Admin/Users/Users";
import SERVICES_ADMIN from "../LeftSidebarTabs/Admin/Services/Services";
import GET_SERVICE_ADMIN from "../LeftSidebarTabs/Admin/GetService/GetService";
import UserProfile from "../../Pages/UserProfile/UserProfile";

// COMPONENTS - SERVICE PROVIDER
import SERVICES_SP from "../LeftSidebarTabs/Service Provider/Services/Services";
import ADD_SOCIALS_SP from "../../Pages/AddSocialAccounts/AddSocialAccounts";

// COMPONENTS - COMPANY
import SERIVCES_COMPANY from "../LeftSidebarTabs/Company/Services/Services";
import SERVICE_PROVIDERS_COMPANY from "../LeftSidebarTabs/Company/ServiceProviders/ServiceProviders";

// REDUX
import { useSelector } from "react-redux";

const Wrapper = () => {

  const { tab } = useSelector((state) => state);
  
  return <>
    {tab === "DASHBOARD" ? <MainPanel /> : null}
    {tab === "USER_PROFILE" ? <UserProfile /> : null}

    {/* ROLE - ADMIN */}
    {tab === "USERS_ADMIN" ? <USERS_ADMIN /> : null}
    {tab === "CATEGORIES_ADMIN" ? <CATEGORIES_ADMIN /> : null}
    {tab === "SERVICES_ADMIN" ? <SERVICES_ADMIN /> : null}
    {tab === "GET_SERVICE_ADMIN" ? <GET_SERVICE_ADMIN /> : null}

    {/* ROLE - SERVICE PROVIDER */}
    {tab === "SERVICES_SP" ? <SERVICES_SP /> : null}
    {tab === "ACCOUNTS_SP" ? <ADD_SOCIALS_SP /> : null}

    {/* ROLE - COMPANY */}
    {tab === "SERVICES_COMPANY" ? <SERIVCES_COMPANY /> : null}
    {tab === "SERVICE_PROVIDERS_COMPANY" ? <SERVICE_PROVIDERS_COMPANY /> : null}
  </>
}

export default Wrapper;