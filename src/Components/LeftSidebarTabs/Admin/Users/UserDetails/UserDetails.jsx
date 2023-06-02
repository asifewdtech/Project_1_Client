// HOOKS
import { useEffect, useState, useMemo} from "react";
import { useParams } from "react-router-dom";

// SERVICES
import UserServices from "../../../../../Services/UserServices";

const UserDetails = () => {

  const[user, setUser] = useState(null);
  const { id } = useParams();

  const memoizedUser = useMemo(() => {
    const Services = new UserServices();
    return Services.GetSingleUser(id);
  }, [id]);

  useEffect(() => {
    memoizedUser.then((response) => setUser(response.data.user))
  }, [memoizedUser])
  return <>
  <div className="row">
    <div className="col-6">
      <h5>Name:</h5>
      <p>{user ? user.firstName : null} {user ? user.lastName : null}</p>
    </div>
    <div className="col-6"></div>
  </div>
  </>
}

export default UserDetails;