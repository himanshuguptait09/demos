
const ShowUnit = () => {
    return (
        <div className="container-fluid">
            {/* page header */}
            <div className="breadcrumb-header align-items-center">
                <h2 className="fs-4 mt-4 ms-1 mb-3"> Unit Details </h2>
            </div>
            <div className="card border-0 shadow ms-1 me-1">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="">Location</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Indraprastha Cancer Society</span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="">Display Name</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Dr. Rajiv Chawla</span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="">Department</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Anesthesiology</span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="speciality">Speciality</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>
                                Anesthesiologist</span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="speciality">Clinician</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Abc</span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="">Unit Head</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Abc </span>
                        </div>

                        <div className="col-md-2 col-md-2 col-12 fw-bolder">
                            <label htmlFor="">Status</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <span>Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowUnit
