import { useState, useEffect } from "react";
import axios from "axios";
import { validateInput } from "../Validation/AllValidation";
// import Swal from "sweetalert2";

const AddDepartment = () => {
  const [locations, setLocations] = useState([
    {
      id: "1",
      name: "Location A",
      value: "Location A",
    },
  ]);
  const [hods, setHods] = useState([
    {
      id: "1",
      name: "Hod A",
      value: "Hod A",
    },
  ]);

  const [formData, setFormData] = useState({
    departmentName: "",
    hod: "",
    status: "",
    location: "",
    isCentral: "",
    remark: "",
  });
  const [isCentral, setIsCentral] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchLocation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/location");
      setLocations(response.data);
    } catch (error) {
      console.error("error fetching data:");
    }
  };
  const fetchHod = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hod");
      setHods(response.data);
    } catch {
      console.log("error fetching Hod");
    }
  };
  useEffect(() => {
    fetchLocation();
    fetchHod();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the input for the specific field
    const validationResult = validateInput(value, name);
    if (!validationResult.valid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationResult.errorMsg,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // validate dropdown select handler
  const dropDownHandler = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const validationResults = Object.keys(formData).map((key) => validateInput(formData[key], key));
    // const isValid = validationResults.every(result => result.valid);

    // if (isValid) {

    //   console.log("Form submitted:", formData);
    // } else {
    //   Swal.fire({ icon: "error", title: "Validation Error", text: "Please fill mandatory field then submit." });
    //   console.log("Form submitted:", formData);
    // }
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 ms-1 mb-3">Add Department</h2>
      </div>

      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-2 gap-md-2">
              <div className="col-12 col-md-2">
                <label htmlFor="location" className="required">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  className="form-select"
                  value={formData.location}
                  onChange={dropDownHandler}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.value}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="departmentName" className="required">
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentName"
                  name="departmentName"
                  className="form-control"
                  value={formData.departmentName}
                  onChange={handleChange}
                  placeholder="Department Name"
                  required
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="hod" className="required">
                  HOD
                </label>
                <select
                  id="hod"
                  name="hod"
                  className="form-select"
                  value={formData.hod}
                  onChange={dropDownHandler}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {hods.map((hod) => (
                    <option key={hod.id} value={hod.value}>
                      {hod.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="remark" className="">
                  Remarks
                </label>
                <input
                  type="text"
                  id="remark"
                  name="remark"
                  className="form-control"
                  value={formData.remark}
                  onChange={handleChange}
                  placeholder="Remark"
                  required
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={dropDownHandler}
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Active" selected>
                    Active
                  </option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="custom-checkbox d-flex">
                <input
                  type="checkbox"
                  id="is-central"
                  className="form-check-input me-2"
                  checked={isCentral}
                  onChange={(e) => setIsCentral(e.target.checked)}
                />
                <label htmlFor="is-central" className="pt-1">
                  Is Clinical
                </label>
              </div>
              <div>
                <button className="btn btn-primary" type="submit">
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

export default AddDepartment;
