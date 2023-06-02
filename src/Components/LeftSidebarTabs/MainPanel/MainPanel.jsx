// REDUX
import { useSelector } from "react-redux";

// TOKEN
import { decodedToken } from "../../../Utilities/AppUtilities";

const MainPanel = () => {

  // const userLoggedIn && userLoggedIn = null;
  const userLoggedIn = decodedToken().user;
  const { Users, Services_Admin, Services_SP } = useSelector((state) => state);

  return <>
    {/* ROLE - ADMIN */}
    {userLoggedIn && userLoggedIn.role === "ADMIN" ? <>

      {/* USERS INFO */}
      <div className="row p-2">
        <h3>Users</h3>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-success border-2 bg-success " style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Approved Users</h5>
              <p className="card-text">{Users.Approved ? Users.Approved.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-warning border-2 bg-warning" style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Pending Users</h5>
              <p className="card-text">{Users.Pending ? Users.Pending.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-danger border-2 bg-danger" style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Rejected Users</h5>
              <p className="card-text">{Users.Rejected ? Users.Rejected.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

      </div>

      {/* SERVICES INFO */}
      <div className="row p-2">
        <h3>Services</h3>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-success border-2 bg-success" style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Approved Services</h5>
              <p className="card-text">{Services_Admin.Approved ? Services_Admin.Approved.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-warning border-2 bg-warning" style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Pending Services</h5>
              <p className="card-text">{Services_Admin.Approved ? Services_Admin.Pending.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="card border border-start border-danger border-2 bg-danger" style={{"--bs-bg-opacity": .4}}>
            <div className="card-body">
              <h5 className="card-title">Rejected Services</h5>
              <p className="card-text">{Services_Admin.Approved ? Services_Admin.Rejected.length.toLocaleString() : null}</p>
            </div>
          </div>
        </div>

      </div>
    </> : null}

    {/* ROLE - SERVICE PROVIDER */}
    {userLoggedIn && userLoggedIn.role === "SP" ? <>
      <div className="row p-2">
        <h3>Dashboard - Service Provider</h3>

        {/* SERVICES INFO */}
        <div className="row p-2">
          <h3>Services</h3>

          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="card border border-start border-success border-2 bg-success" style={{"--bs-bg-opacity": .4}}>
              <div className="card-body">
                <h5 className="card-title">Approved Services</h5>
                <p className="card-text">{Services_SP.Approved ? Services_SP.Approved.length.toLocaleString() : null}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="card border border-start border-warning border-2 bg-warning" style={{"--bs-bg-opacity": .4}}>
              <div className="card-body">
                <h5 className="card-title">Pending Services</h5>
                <p className="card-text">{Services_SP.Approved ? Services_SP.Pending.length.toLocaleString() : null}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="card border border-start border-danger border-2 bg-danger" style={{"--bs-bg-opacity": .4}}>
              <div className="card-body">
                <h5 className="card-title">Rejected Services</h5>
                <p className="card-text">{Services_SP.Approved ? Services_SP.Rejected.length.toLocaleString() : null}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </> : null}

    {/* ROLE - COMPANY */}
    {userLoggedIn && userLoggedIn.role === "COMPANY" ? <>
      <div className="row p-2">
        <h3>Dashboard - Company</h3>
      </div>
    </> : null}

  </>
}

export default MainPanel;