const EditLocationmapping = () => {
  const handleSave = () => { };
  return (
    <div className="container-fluid ms-1 me-1">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 mb-3">Edit Location&#39;s Mapping</h2>
      </div>

      <div className="card border-0 rounded shadow">
        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row g-3 p-1">
              <div className="col-12 col-lg-2">
                <label htmlFor="central-location" className="required">
                  Central Location
                </label>
                <select
                  name=""
                  id="central-location"
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="">Select A </option>
                  <option value="">Option B</option>
                </select>
              </div>
              {/* multi select  */}
              <div className="col-12 col-lg-2">
                <label htmlFor="sub-location" className="required">
                  Sub Location
                </label>
                <select
                  name="sublocation"
                  id="subLocation"
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="">Option A</option>
                  <option value="">Option B</option>
                  <option value=" ">Option C</option>
                  <option value=" ">Option D</option>
                </select>
              </div>
              {/* single select  */}
              <div className="col-12 col-lg-2">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <select name="" id="status" className="form-select" required>
                  <option value="" disabled>Select</option>
                  <option value="">Active </option>
                  <option value="">InActive</option>
                </select>
              </div>

              <div className="mt-3">
                <button className="btn btn-primary mt-2" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLocationmapping;
