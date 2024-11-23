import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Paginator } from "primereact/paginator";

const ClinicianList = () => {
  // tab state
  const [isClinicians, setIsClinicians] = useState(true);
  const [isUnit, setIsUnit] = useState(false);
  const [error, setError] = useState("");

  // search state
  const [searchParams, setSearchParams] = useState({
    location: "",
    name: "",
    department: "",
    status: "",
  });

  // for pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // fetch state

  const [cliniciansList, setCliniciansList] = useState([
    {
      clinicianId: "1",
      name: "Dr. Rajiv Chawla",
      location: "Location Name A",
      unitName: "Unit Name",
      department: "Department A",
      designation: "Director",
      speciality: "Speciality A",
      unitHead: "UnitHead",
      status: "Active",
    },
    {
      clinicianId: "2",
      name: "Dr. Suraj",
      location: "Location Name B",
      unitName: "Unit Name",
      department: "Department B",
      designation: "Director",
      speciality: "Speciality B",
      unitHead: "UnitHead",
      status: "Inactive",
    },
  ]);

  const [unitList, setUnitList] = useState([
    {
      unitId: "1",
      name: "Dr. Rajiv Chawla",
      location: "Location Name A",
      unitName: "Unit Name A",
      department: "Department A",
      designation: "Director",
      speciality: "Speciality A",
      unitHead: "UnitHead A",
      status: "Active",
    },
    {
      unitId: "2",
      name: "Dr. Rajiv",
      location: "Location Name B",
      unitName: "Unit Name B",
      department: "Department B",
      designation: "Director",
      speciality: "Speciality B",
      unitHead: "UnitHead B",
      status: "Inactive",
    },
  ]);

  // label state
  const [tabLabel, setTabLabel] = useState("Clinician's List");

  // Toggle handlers
  const handleToggle = (isClinician) => {
    setIsClinicians(isClinician);
    setIsUnit(!isClinician);
    setTabLabel(isClinician ? "Clinician's List" : "Unit's List");
  };

  // Fetch clinicians data
  useEffect(() => {
    const fetchCliniciansList = async () => {
      try {
        const response = await fetch("https://localhost:8080/cliniciansList");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCliniciansList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCliniciansList();
  }, []);

  useEffect(() => {
    const fetchUnitList = async () => {
      try {
        const response = await fetch("https://localhost:8080/unitList");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUnitList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnitList();
  }, []);

  // Change handler for filters
  const changeHandler = (e) => {
    const { id, value } = e.target;
    setSearchParams((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // input handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Check if the value starts with a dot
    const specialChars = /^[!@#$%^&*(),./?":{}|<>]/;
    if (specialChars.test(value)) {
      setError("Invalid input");
      return;
    }
    // Function to capitalize words and remove invalid characters
    const processValue = (value) => {
      // Remove invalid characters
      const removedInvalidValue = value.replace(
        /[!#$%^&*+=[\]`~;{}|:<>?]/g,
        ""
      );
      // Capitalize words
      const capitalizedValue = removedInvalidValue.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      return capitalizedValue;
    };

    const formattedValue = processValue(value);
    // Clear any previous error messages
    setError("");
    // Update the state based on the id
    switch (id) {
      case "name":
        setSearchParams((prev) => ({ ...prev, name: formattedValue }));
        break;
    }
  };

  // Search handler
  const handleSearch = () => {
    // Filter the lists based on searchParams
    // Filtering Clinicians List
    const filteredClinicians = cliniciansList.filter(
      (clinician) =>
        (searchParams.location === "" ||
          clinician.location === searchParams.location) &&
        (searchParams.name === "" ||
          clinician.name
            .toLowerCase()
            .includes(searchParams.name.toLowerCase())) &&
        (searchParams.department === "" ||
          clinician.department === searchParams.department) &&
        (searchParams.status === "" ||
          clinician.status.toLowerCase() === searchParams.status.toLowerCase())
    );

    setCliniciansList(filteredClinicians);

    // Filter the Unit List
    const filteredUnits = unitList.filter(
      (unit) =>
        (searchParams.location === "" ||
          unit.location === searchParams.location) &&
        (searchParams.name === "" ||
          unit.unitName
            .toLowerCase()
            .includes(searchParams.name.toLowerCase())) &&
        (searchParams.department === "" ||
          unit.department === searchParams.department) &&
        (searchParams.status === "" ||
          unit.status.toLowerCase() === searchParams.status.toLowerCase())
    );

    setUnitList(filteredUnits);
  };

  return (
    <div className="container-fluid">
      {/* page header */}
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4 text-center">{tabLabel}</h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/clinican-list/add-clinician"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
      </div>
      {/* card start */}
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          {/* toggle tabs */}
          <div className="d-flex gap-4 mb-2">
            <Form.Switch
              type="checkbox"
              checked={isClinicians}
              onChange={(e) => handleToggle(e.target.checked)}
              label={tabLabel}
              className="custom-switch"
            />
          </div>

          <div className="row g-2 gap-md-2">
            <div className="col-12 col-md-2">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                value={searchParams.location}
                onChange={changeHandler}
                className="form-select"
              >
                <option value="">Select</option>
                {cliniciansList.map((location) => (
                  <option key={location.id} value={location.value}>
                    {location.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={searchParams.name}
                className="form-control"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-2">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={searchParams.department}
                onChange={changeHandler}
                className="form-select"
              >
                <option value="">Select</option>
                {cliniciansList.map((departments) => (
                  <option key={departments.id} value={departments.value}>
                    {departments.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-2">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={searchParams.status}
                onChange={changeHandler}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-12 col-md-2 search-btn">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* is Unit details */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        {isUnit && (
          <div id="isUnit">
            {/* table header */}
            <h4 className="table-header p-3 fs-5">List of Units</h4>
            {/* list of units table */}
            <div className="table-responsive">
              <table className="table table-info table-striped text-center table-hover">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>LOCATION</th>
                    <th>UNIT NAME</th>
                    <th>DEPARTMENT</th>
                    <th>SPECIALITY</th>
                    <th>UNIT HEAD</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {unitList.length > 0 ? (
                    unitList.map((unit, index) => (
                      <tr key={unit.unitId}>
                        <td>{index + 1}</td>
                        <td>{unit.location}</td>
                        <td>{unit.unitName}</td>
                        <td>{unit.department}</td>
                        <td>{unit.speciality}</td>
                        <td>{unit.unitHead}</td>
                        <td>{unit.status}</td>
                        <td>
                          <Link
                            to={`/clinican-list/show-unit-details/${unit.unitId}`}
                            className="custom-link text-decoration-none"
                          >
                            Show
                          </Link>
                          <span className="ms-2 me-2">|</span>
                          <Link
                            to={`/clinican-list/edit-unitList/${unit.unitId}`}
                            state={{ unit }}
                            className="custom-link text-decoration-none"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No UnitList Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Paginator
                first={first}
                rows={rows}
                totalRecords={unitList.length} // Use total count of filtered items
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* is Clinicians details */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        {isClinicians && (
          <div id="isClinicians">
            {/* table header */}
            <h4 className="table-header p-3 fs-5">List of Clinicians</h4>
            {/* list of clinicians table */}
            <div className="table-responsive">
              <table className="table table-info table-striped text-center table-hover">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>LOCATION</th>
                    <th>NAME</th>
                    <th>DEPARTMENT</th>
                    <th>SPECIALITY</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {cliniciansList.length > 0 ? (
                    cliniciansList.map((clinician, index) => (
                      <tr key={clinician.id}>
                        <td>{index + 1}</td>
                        <td>{clinician.location}</td>
                        <td>{clinician.name}</td>
                        <td>{clinician.department}</td>
                        <td>{clinician.speciality}</td>
                        <td>{clinician.status}</td>
                        <td>
                          <Link
                            to={`/clinican-list/show-clinician-details/${clinician.id}`}
                            className="custom-link text-decoration-none"
                          >
                            Show
                          </Link>
                          <span className="ms-2 me-2">|</span>
                          <Link
                            to={`/clinican-list/edit-clinician/${clinician.id}`}
                            state={{ clinician }}
                            className="custom-link text-decoration-none"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No Clinican Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Paginator
                first={first}
                rows={rows}
                totalRecords={cliniciansList.length} // Use total count of filtered items
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicianList;
