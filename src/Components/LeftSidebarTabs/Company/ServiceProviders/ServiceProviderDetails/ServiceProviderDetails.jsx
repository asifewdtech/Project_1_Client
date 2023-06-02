// HOOKS
import { useEffect, useMemo, useState } from "react";

// ROUTER DOM
import { useParams } from "react-router-dom";

// SERVICES
import CompanyServices from "../../../../../Services/CompanyServices";

const ServiceProviderDetails = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);

  const memoizedUser = useMemo(async () => {
    const Services = new CompanyServices();
    return await Services.GetServiceProviderDetails(id);
  }, [id]);

  useEffect(() => {
    memoizedUser.then((resp) => {
      if(resp.data.user) {
        console.log(resp.data.user);
        return setUser(resp.data.user);
      }
    })
  }, [])

  return <>
    <div className="row p-2">
      <h3>Service Provider Details</h3>

      <div className="row">
        <div className="col-8">

        <h6>{}</h6>

        </div>

        <div className="col">
          <img src="https://picsum.photos/300" className="img-fluid rounded" alt="" style={{ maxHeight: 200 }} />
        </div>

      </div>
    </div>
  </>
}

export default ServiceProviderDetails;