
const ShowDepartment = () => {
  return (
    <div className="container-fluid">
      <div className="breadcrumb-header d-flex align-items-center">
        <h2 className="fs-4 mt-4 mb-3 mx-1">Department Details</h2>
      </div>
      <div className="card border-0 mx-1">
        <div className="card-body">
          {/* Row 1 */}
          <div className="row">
            <div className="col-12 col-md-3">
              <label >Department Name</label>
            </div>
            <div className="col-12 col-md-3">
              <output id="departmentNameOutput">It</output>
            </div>
            <div className="col-12 col-md-3">
              <label >HOD Name</label>
            </div>
            <div className="col-12 col-md-3">
              <output id="hodNameOutput">Deepak Rathore</output>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-12 col-md-3">
              <label htmlFor="">Is Clinical</label>
            </div>
            <div className="col-12 col-md-3">
              <output>No</output>
            </div>
            <div className="col-12 col-md-3">
              <label htmlFor="">Remark</label>
            </div>
            <div className="col-12 col-md-3">
              <output>IT HIS Department</output>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row">
            <div className="col-12 col-md-3">
              <label htmlFor="">Location</label>
            </div>
            <div className="col-12 col-md-3">
              <output>Indra...</output>
            </div>
            <div className="col-12 col-md-3">
              <label htmlFor="">Status</label>
            </div>
            <div className="col-12 col-md-3">
              <output>Active</output>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDepartment;
