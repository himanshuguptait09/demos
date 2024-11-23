import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Paginator } from 'primereact/paginator';


const DepartmentList = () => {
  // State variables for form inputs and department data
  const [departmentName, setDepartmentName] = useState("");
  const [hod, setHod] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");


  // for pagination 
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    // Check if the value starts with a dot
    const specialChars = /^[!@#$%^&*() ,./?":{}|<>]/;
    if (specialChars.test(value)) {
      setError('Invalid input');
      return;
    }

    // Function to capitalize words and remove invalid characters
    const processValue = (value) => {
      // Remove invalid characters
      const removedInvalidValue = value.replace(/[!#$%^&*+=[\]`~;{}|:<>?]/g, '');
      // Capitalize words
      const capitalizedValue = removedInvalidValue.replace(/\b\w/g, (char) => char.toUpperCase());
      return capitalizedValue;
    };

    const formattedValue = processValue(value);
    // Clear any previous error messages
    setError('');
    // Update the state based on the id
    switch (id) {
      case 'departmentName':
        setDepartmentName(formattedValue);
        break;
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("https://localhost:8080/api/departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4"> Department&#39;s List</h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/department-list/add-department"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
      </div>
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row g-2 gap-md-2">
            <div className="col-12 col-md-2 ">
              <label htmlFor="location" >
                Location
              </label>
              <select
                className="form-select"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div className="col-12 col-md-2 ">
              <label htmlFor="departmentName">
                Department Name
              </label>
              <input
                type="text"
                className="form-control"
                id="departmentName"
                placeholder="Department"
                value={departmentName}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-2 ">
              <label htmlFor="hod" >
                HOD
              </label>
              <select
                id="hod"
                name="hod"
                className="form-select"
                value={hod}
                onChange={(e) => setHod(e.target.value)}
                required
              >
                <option value="">Select</option>

              </select>
            </div>
            <div className="col-12 col-md-2 ">
              <label htmlFor="status" >
                Status
              </label>
              <select
                className="form-select"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-12 col-md-2 search-btn">
              <button className="btn btn-primary"
                type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* card end */}

      {/* table start  */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        {/* table header */}
        <h4 className="table-header p-3 fs-5">List of Departments</h4>
        <div className="table-responsive">
          <table id="locationsList" className="table table-info table-hover table-striped text-center">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Location</th>
                <th>Department</th>
                <th>Hod</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((location, index) => (
                  <tr key={location.locationId}>
                    <td>{index + 1}</td>
                    <td>{location.locationName}</td>
                    <td>{location.shortName}</td>
                    <td>{location.isCentral ? "Yes" : "No"}</td>
                    <td>{location.status}</td>
                    <td>
                      <Link
                        to={`/department-list/show-department/${departments.id}`}
                        className="custom-link text-decoration-none"
                      >
                        Show
                      </Link>
                      <span className="p-1">|</span>
                      <Link
                        to={`/department-list/edit-department/${departments.id}`}
                        className="custom-link text-decoration-none"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Department Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination */}
          {departments.length > 0 &&
            <Paginator
              first={first}
              rows={rows}
              totalRecords={departments.length}
              onPageChange={onPageChange}
              className="custom-paginator"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
