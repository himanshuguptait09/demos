
const ShowClinician = () => {
    return (
        <div className="container-fluid">
            {/* page header */}
            <div className="breadcrumb-header align-items-center">
                <h2 className="fs-4 mt-4 ms-1 mb-3"> Clinician Details </h2>
            </div>
            <div className="card border-0 shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Clinician Name</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Dr. Rajiv Chawla</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="dName">Display Name</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Dr. Rajiv Chawla</output>
                        </div>

                        
                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Gender</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Male</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Department</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Anesthesiology</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Designation</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Director</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Location</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Indraprastha Cancer Society</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Status</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>Active</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Speciality</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>ANESTHESIOLOGIST</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Mobile No.</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>7485989878</output>
                        </div>

                        <div className="col-md-2 col-md-2 col-12">
                            <label htmlFor="">Email</label>
                        </div>
                        <div className="col-md-4 col-md-4 col-12">
                            <output>rajiv@gmail.com</output>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowClinician
