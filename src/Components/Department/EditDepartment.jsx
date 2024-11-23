const EditDepartment = () => {


  const handleEdit = () => { 

  };

  
  return (
    <div className="container-fluid">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 ms-1 mb-3">Edit Department</h2>
      </div>
      <form onSubmit={handleEdit}>
        <div className="card border-0 rounded shadow">
          <div className="card-body">
            <div className="row g-2 gap-md-2">
              <div className="col-12 col-md-2">
                <label htmlFor="department-name" className="required">
                  Department Name 
                </label>
                <input type="text" className="form-control" placeholder="Department Name" />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="hod" className="required">
                  HOD
                </label>
                <select name="hod" id="hod" className="form-select">
                  <option value=""> Select </option>
                  <option value="">xyz</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="remark" >
                  Remark
                </label>
                <select name="remark" id="remark" className="form-select">
                  <option value=""> Select </option>
                  <option value="">xyz</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <select name="status" id="status" className="form-select">
                  <option value=" "> Select</option>
                  <option value="Active"> Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="location" className="required">
                  Location
                </label>
                <input type="text" className="form-control" placeholder="Location" />
              </div>
            </div>
            <div className="mt-2 mb-2">
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  id="is-central"
                  className="form-check-input me-1"
                />
                <label htmlFor="is-central" className="form-check-label">
                  Is Central
                </label>
              </div>
            </div>
            <di>
              <button
                className="btn btn-primary mt-2"
                type="submit"
              >
                Save
              </button>
            </di>
          </div>
        </div>
      </form>
    </div>

  );
};

export default EditDepartment;
