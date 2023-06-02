// HOOKS
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// UTILITY
// import { decodedToken, isLoggedIn } from "../../Utilities/AppUtilities";

// CSS & ICONS
import { RxAvatar } from "react-icons/rx";
import "./Topbar.css";
// import avatar_sample from "../../Assets/Images/avatar.png";

const Topbar = ({ username }) => {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    return navigate("/");
  }

  // useEffect(()=> {
  //   if(isLoggedIn() === false) navigate("/");
  // }, [])

  return <>
    <div className="col-12 topbarDashboard d-flex justify-content-end">

      {/* AVATAR - BUTTON */}
      <button id="avatar-btn" className="btn btn-sm m-2 me-4 dropdown-toggle d-flex align-items-center"
        type="button" data-bs-toggle="dropdown" aria-expanded="false">

        {/* <img src="https://picsum.photos/50" id="avatar" className="rounded-circle" /> */}
        {/* <img src={avatar_sample} id="avatar" className="rounded-circle" /> */}
        <RxAvatar className="rounder-cicle text-secondary" id="avatar-sample-icon" />
        <p className="ms-1 m-0">{username}</p>

      </button>

      {/* AVATAR - DROPDOWN */}
      <ul className="dropdown-menu">
        <li className="dropdown-item" onClick={()=> navigate("/profile")}>Profile</li>
        <li><hr className="dropdown-divider" /></li>
        <li className="dropdown-item" onClick={()=> logOut()}>Log Out</li>
      </ul>
    </div>
  </>
}

export default Topbar;