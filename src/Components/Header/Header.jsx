// HOOKS
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useDispatch } from "react-redux";
import { tabUserProfile } from "../../Redux/Slices/TabSlice";

// SERVICES & UTILITIES
import { IoMdMenu } from "react-icons/io";

// TOKEN
import { decodedToken } from "../../Utilities/AppUtilities";

const Header = () => {

  const userLoggedIn = decodedToken().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function logout() {
    if(!localStorage.getItem("token")) return navigate("/");

    if(localStorage.getItem("token") || localStorage.getItem("userLoggedIn")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userLoggedIn");
      return navigate("/");
    };
  }

  useEffect(()=> {
    // if(!isLoggedIn()) return navigate("/");
  }, [navigate]);

  return <>
    {/* Header */}
    <header className="ec-main-header" id="header">
      <nav className="navbar navbar-static-top navbar-expand-lg">
        {/* Sidebar toggle button */}
        <button id="sidebar-toggler" className="sidebar-toggle" >
          <IoMdMenu style={{ height: 25, width: 25, fill: "#a6aab4" }} className="me-2"/>
        </button>

        {/* navbar right */}
        <div className="navbar-right ms-auto">
          <ul className="nav navbar-nav">
            
            <li className="dropdown user-menu me-2">
              <button className="dropdown-toggle nav-link ec-drop" data-bs-toggle="dropdown" aria-expanded="false">
                {/* <img src={userLoggedIn.dp} className="user-image" alt="" /> */}
                {userLoggedIn.dp ? <img className="rounded-circle" src={`http://localhost:3020/uploads/users/${userLoggedIn.dp}`} alt="" style={{objectFit: "cover", objectPosition: "center"}}  width={50} height={50} /> : <img className="user-image" width={50} height={50} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIg0KICAgIGNsYXNzPSJiaSBiaS1wZXJzb24tY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTYgMTYiPg0KICAgIDxwYXRoIGQ9Ik0xMSA2YTMgMyAwIDEgMS02IDAgMyAzIDAgMCAxIDYgMHoiIC8+DQogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIg0KICAgICAgICBkPSJNMCA4YTggOCAwIDEgMSAxNiAwQTggOCAwIDAgMSAwIDh6bTgtN2E3IDcgMCAwIDAtNS40NjggMTEuMzdDMy4yNDIgMTEuMjI2IDQuODA1IDEwIDggMTBzNC43NTcgMS4yMjUgNS40NjggMi4zN0E3IDcgMCAwIDAgOCAxeiIgLz4NCjwvc3ZnPg==" alt="" />}
              </button>
              <ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
                {/* User image */}
                <li className="dropdown-header">
                  {/* <img src="assets/img/user/user.png" className="img-circle" alt="" /> */}
                  <div className="d-inline-block">
                    {userLoggedIn && userLoggedIn.firstName} {userLoggedIn && userLoggedIn.lastName}
                    <small className="pt-1">{userLoggedIn && userLoggedIn.email}</small>
                  </div>
                </li>
                <li onClick={() => {dispatch(tabUserProfile());}}>
                  <span>
                    <i className="mdi mdi-account" /> My Profile
                  </span>
                </li>

                {/* <li>
                  <span>
                    <i className="mdi mdi-email" /> Message
                  </span>
                </li>
                <li>
                  <span> <i className="mdi mdi-diamond-stone" /> Projects </span>
                </li>
                <li className="right-sidebar-in">
                  <span> <i className="mdi mdi-settings-outline" /> Setting </span>
                </li> */}

                <li className="dropdown-footer" onClick={() => logout()}>
                  <span> <i className="mdi mdi-logout" /> Log Out </span>
                </li>
              </ul>
            </li>

            {/* <li className="dropdown notifications-menu custom-dropdown">
              <button className="dropdown-toggle notify-toggler custom-dropdown-toggler">
                <i className="mdi mdi-bell-outline" />
              </button>

              <ul className="dropdown-menu dropdown-menu-right d-none">
                <li className="dropdown-header">You have 5 notifications</li>
                <li>
                  <span>
                    <i className="mdi mdi-account-plus" /> New user registered
                    <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline" /> 10 AM</span>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mdi mdi-account-remove" /> User deleted
                    <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline" /> 07 AM</span>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mdi mdi-chart-areaspline" /> Sales report is ready
                    <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline" /> 12 PM</span>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mdi mdi-account-supervisor" /> New client
                    <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline" /> 10 AM</span>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mdi mdi-server-network-off" /> Server overloaded
                    <span className=" font-size-12 d-inline-block float-right"><i className="mdi mdi-clock-outline" /> 05 AM</span>
                  </span>
                </li>
                <li className="dropdown-footer">
                  <span className="text-center"> View All </span>
                </li>
              </ul>
            </li> */}

            {/* <li className="right-sidebar-in right-sidebar-2-menu">
              <i className="mdi mdi-settings-outline mdi-spin" />
            </li> */}
          </ul>
        </div>
      </nav>
    </header>

  </>
}

export default Header;