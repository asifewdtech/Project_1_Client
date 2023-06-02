// HOOKS
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// SERVICES
import UserServices from "../../../../../Services/UserServices";

// BOOTSTRAP COMPONENTS
import { Modal } from "react-bootstrap";

// ICONS
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

const ServiceDetailsCOM = () => {

  const { id } = useParams();
  const [service, setService] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  // MODAL HANDLERS - EMAIL
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // SUBMIT FORM TO SEND EMAIL
  function submitForm(mail) {

  }

  const memoizedService = useMemo(() => {
    const Services = new UserServices();
    return Services.GetSingleService(id);
  }, [id]);

  useEffect(() => {
    memoizedService.then((resp) => {
      setService(resp.data.service);
      setValue("to", resp.data.service.serviceProviderId.email);
    });
  }, [memoizedService, show]);

  return <>
    <div className="row p-2">
      <h3>Service Details</h3>
      <div className="row">
        <hr />
        <div className="col-7">
          {/* <p>Created On: {service ? new Date(service.createdDate).toLocaleString("en-US", options) : null}</p> */}
          <h5>Title:</h5>
          <p>{service ? service.title : null}</p>
          <h5>Descripton:</h5>
          <p>{service ? service.description : null}</p>

          <h5>Service Provider:</h5>
          <p className="mb-1">Name: {service ? service.serviceProviderId.firstName : null} {service ? service.serviceProviderId.lastName : null}</p>
          <p>Email: {service ? service.serviceProviderId.email : null}</p>
          <h5>Current Status:
            <p className="d-inline ms-2">
              <span className={service && service.serviceProviderId.status === "PENDING" ? "badge badge-warning" :
                              service && service.serviceProviderId.status === "APPROVED" ? "badge badge-success" :
                              service && service.serviceProviderId.status === "REJECTED" ? "badge badge-danger" : "badge badge-secondary"}>{service ? service.serviceProviderId.status : null}</span>
            </p>
          </h5>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary me-1">
                <IoIosCall style={{ width: 25, height: 25 }} />
                <span className="ms-1">Call</span>
              </button>
              <button className="btn btn-primary" onClick={() => handleShow()}>
                <HiOutlineMail style={{ width: 25, height: 25 }} />
                <span className="ms-1">Email</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-5">
          <img src="https://picsum.photos/500" alt="" className="w-100 rounded" />
        </div>
      </div>
    </div>

    {/* EMAIL MODAL */}
    <Modal show={show} onHide={() => { handleClose(); reset({ subject: "", body: "" }); }} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Send Email to ...</Modal.Title>
      </Modal.Header>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitForm)}>
        <Modal.Body className="pb-0">
          <div className="row">

            <div className="form-group col-12 mb-4">
              <input type="email" className="form-control" disabled
                {...register("to", { required: true, maxLength: 30, minLength: 3 })} />
            </div>

            <div className="form-group col-12 mb-4">
              <input type="text" className="form-control" placeholder="Subject"
                {...register("subject", { required: true, minLength: 3 })} />
            </div>

            <div className="col-12">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Description"
                {...register("body", { required: true, minLength: 3 })} />
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => { handleClose(); reset({ subject: "", body: null }) }}>Close</button>
          <button className="btn btn-primary" type="submit">Send Email</button>
        </Modal.Footer>
      </form>
    </Modal>
  </>
}

export default ServiceDetailsCOM;