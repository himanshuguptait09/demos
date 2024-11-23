import { useState, useEffect } from "react";
import axios from "axios";
import SmartTextEditor from "../../utils/smartTextEditor/TextEditor";
import MyStatefulEditor from "../../utils/smartTextEditor/RichTextEditor";


const AddClinician = () => {
  // State to manage form visibility and checkbox status
  const [isClinicianChecked, setIsClinicianChecked] = useState(true);
  const [isUnitChecked, setIsUnitChecked] = useState(false);
  const [error, setError] = useState({});

  const [selectedClinician, setSelectedClinician] = useState("");

  // State for dropdown options
  const [titles, setTitles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [unitHeads, setUnitHeads] = useState([]);
  const [clinicians, setClinicians] = useState([
    { id: "1", name: "Clinician 1" },
    { id: "2", name: "Clinician 2" },
    { id: "3", name: "Clinician 3" },
    { id: "4", name: "Clinician 4" },
    { id: "5", name: "Clinician 5" },
    { id: "6", name: "Clinician 6" },
    { id: "7", name: "Clinician 7" },
  ]);

  const [isFieldEnabled, setIsFieldEnabled] = useState(false);
  const [editorContent, setEditorContent] = useState("")
  // State for Is clinicians data
  const [cliniciansList, setCliniciansList] = useState({
    title: "",
    gender: "",
    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",
    department: "",
    designation: "",
    location: "",
    status: "Acive",
    speciality: "",
    mobile: "",
    email: "",
  });

  const [unitList, setUnitList] = useState({
    location: "",
    unitName: "",
    displayName: "",
    department: "",
    speciality: "",
    selectedClinician: "",
    unitHead: "",
    status: "Active",
  });

  function handleProfileInput(type, e) {
    // if (type === "url") {
    //   if (!isValidURL(e)) {
    //     setError({ ...error, [type]: "Invalid URL format" });
    //     return;
    //   }
    // }
    setCliniciansList((prevState) => ({
      ...prevState,
      ["profileInput"]: { type, value: e },
    }));
  }

  // Fetch functions
  const fetchTitles = async () => {
    try {
      const response = await axios.get("https://localhost:8080/title");
      setTitles(response.data);
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get("https://localhost:8080/gender");
      setGenders(response.data);
    } catch (error) {
      console.error("Error fetching genders:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:8080/department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const response = await axios.get("https://localhost:8080/designation");
      setDesignations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("https://localhost:8080/location");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("https://localhost:8080/status");
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const response = await axios.get("https://localhost:8080/speciality");
      setSpecialities(response.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const fetchClinicians = async () => {
    try {
      const response = await axios.get("https://localhost:8080/clinician");
      setClinicians(response.data);
    } catch (error) {
      console.error("Error fetching clinicians:", error);
    }
  };

  const fetchUnitHeads = async () => {
    try {
      const response = await axios.get("https://localhost:8080/unitHead");
      setUnitHeads(response.data);
    } catch (error) {
      console.error("Error fetching unit heads:", error);
    }
  };

  useEffect(() => {
    // fetchTitles();
    // fetchGenders();
    // fetchDepartments();
    // fetchDesignations();
    // fetchLocations();
    // fetchStatuses();
    // fetchSpecialities();
    // fetchClinicians();
    // fetchUnitHeads();
  }, []);

  function isValidURL(url) {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  }

  function clearProfileInput() {
    setCliniciansList((prevState) => ({
      ...prevState,
      ["profileInput"]: { type: "", value: "" },
    }));
  }
  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "IsClinician") {
      setIsClinicianChecked(checked);
      setIsUnitChecked(!checked);
    } else if (id === "IsUnit") {
      setIsUnitChecked(checked);
      setIsClinicianChecked(!checked);
    }
  };
  useEffect(() => {
    // Ensure that only one checkbox is checked at any given time
    if (isClinicianChecked) {
      setIsUnitChecked(false);
    } else if (isUnitChecked) {
      setIsClinicianChecked(false);
    }
  }, [isClinicianChecked, isUnitChecked]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Check if the value starts with a special character
    const specialChars = /^[!@#$%^&*(), ./?":{}|<>]/;
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
    switch (id) {
      case 'displayName':
        setCliniciansList((prev) => ({ ...prev, displayName: formattedValue }));
        break;
      case 'firstName':
        setCliniciansList((prev) => ({ ...prev, firstName: formattedValue }));
        break;
      case 'middleName':
        setCliniciansList((prev) => ({ ...prev, middleName: formattedValue }));
        break;
      case 'lastName':
        setCliniciansList((prev) => ({ ...prev, lastName: formattedValue }));
        break;
      default:
        break;
    }
  };
  // email validation
  const emailChangeHandler = (e) => {
    const { id, value } = e.target;
    // Convert the value to lowercase
    const lowerCaseValue = value.toLowerCase();
    // Check for invalid conditions
    if (lowerCaseValue.startsWith('.')) {
      setError('Invalid input');
      return;
    }
    // Check if the value starts with a non-alphanumeric character
    if (/^[^\w]/.test(lowerCaseValue)) {
      setError('Invalid input');
      return;
    }
    const formattedValue = (lowerCaseValue);

    setCliniciansList((prevLocation) => ({
      ...prevLocation,
      [id]: formattedValue
    }));
  }

  // handleChange for unit-related fields
  const handleUnitChange = (e) => {
    const { id, value } = e.target;

    // Check if the value starts with a special character
    const specialChars = /^[!@#$%^&*(), .'/-?":{}|<>]/;
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
      case 'displayName':
        setUnitList((prev) => ({ ...prev, displayName: formattedValue }));
        break;
      default:
        break;
    }
  };


  // Get selected names from selected IDs
  const getSelectedNames = () => {
    return clinicians
      .filter(clinicians => selectedClinician.includes(clinicians.id))
      .map(clinicians => clinicians.name)
      .join(", ");
  };

  // multi select dropdown  
  const handleMultiSelect = (event) => {
    const value = event.target.value;
    setSelectedClinician((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  // mobile handler
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCliniciansList((prevState) => ({
      ...prevState,
      mobile: value
    }));
  };

  // Handle form submissions
  const handleIsClinicianSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:8080/Isclinician", cliniciansList);
      alert("Clinician details submitted successfully");
    } catch (error) {
      console.error("Error submitting clinician details:", error);
    }
  };

  const handleIsUnitSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:8080/Isunit", unitList);
      alert("Unit details submitted successfully");
    } catch (error) {
      console.error("Error submitting unit details:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 ms-1 mb-3">Add Clinician</h2>
      </div>
      <div className="bg-body border-0 rounded shadow-lg p-3 ms-1 me-1">
        <div className="d-flex gap-4">
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="IsClinician"
              className="form-check-input me-2"
              checked={isClinicianChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="IsClinician" className="form-check-label">
              Is Clinician
            </label>
          </div>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="IsUnit"
              className="form-check-input me-2"
              checked={isUnitChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="IsUnit" className="form-check-label">
              Is Unit
            </label>
          </div>
        </div>

        {isUnitChecked && (
          <form id="isUnitDetails" onSubmit={handleIsUnitSubmit}>
            <div className="row g-3 py-2">
              <div className="col-12 col-md-2">
                <label htmlFor="location" className="required">
                  Location
                </label>
                <select
                  name="location"
                  id="location"
                  className="form-select"
                  value={unitList.location}
                  onChange={handleUnitChange}
                >
                  <option value="" disabled>Select</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="selectedClinician" className="required">
                  Clinicians
                </label>

                {/* Multi-select dropdown */}
                <div>
                  <button
                    data-bs-toggle="dropdown"
                    className="form-select dropdown-button"
                  >
                    {selectedClinician.length > 0
                      ? `${selectedClinician.length} Selected`
                      : "Select"}
                  </button>
                  <ul className="dropdown-menu" style={{ minWidth: '11.9rem', background: '#FAFAFA' }}>
                    <li className="dropdown-item">
                      <label htmlFor="select" className="form-check-label text-muted">
                        Select
                      </label>
                    </li>

                    {clinicians.map(clinician => (
                      <li key={clinician.id} className="dropdown-item">
                        <div className="custom-checkbox form-check">
                          <input
                            type="checkbox"
                            id={`clinician-${clinician.id}`}
                            value={clinician.id}
                            checked={selectedClinician.includes(clinician.id)}
                            onChange={handleMultiSelect}
                            className="form-check-input me-2"
                          />
                          <label htmlFor={`clinician-${clinician.id}`} className="form-check-label">
                            {clinician.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="unitName" className="required">
                  Unit Name
                </label>

                <input
                  type="text"
                  id="unitName"
                  name="unitName"
                  value={getSelectedNames()}
                  className="form-control"
                  placeholder="Unit Name"
                  readOnly
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={getSelectedNames()}
                />
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="displayName" className="required">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="form-control"
                  placeholder="Display Name"
                  value={unitList.displayName}
                  onChange={handleUnitChange}
                />
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="department" className="required">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="form-select"
                  value={unitList.department}
                  onChange={handleUnitChange}
                >
                  <option value="" disabled>Select</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="speciality" className="required">
                  Speciality
                </label>
                <select
                  name="speciality"
                  id="speciality"
                  className="form-select"
                  value={unitList.speciality}
                  onChange={handleUnitChange}
                >
                  <option value="" disabled>Select</option>
                  {specialities.map((speciality) => (
                    <option key={speciality.id} value={speciality.id}>
                      {speciality.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="unitHead" className="required">
                  Unit Head
                </label>
                <select
                  name="unitHead"
                  id="unitHead"
                  className="form-select"
                  value={unitList.unitHead}
                  onChange={handleUnitChange}
                >
                  <option value="" disabled>Select</option>
                  {unitHeads.map((unitHead) => (
                    <option key={unitHead.id} value={unitHead.id}>
                      {unitHead.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="form-select"
                  value={unitList.status}
                  onChange={handleUnitChange}
                >
                  <option value="" disabled selected>Select</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 mt-2">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        )}

        {isClinicianChecked && (
          <form id="isClinicianDetails" onSubmit={handleIsClinicianSubmit}>
            <div className="row g-3 py-2">
              <div className="col-12 col-md-2">

                <label htmlFor="location" className="required">
                  Location
                </label>
                <select
                  name="location"
                  id="location"
                  className="form-select"
                  value={cliniciansList.location}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>

              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="clinicianTitle" className="required">
                  Title
                </label>
                <select
                  name="title"
                  id="clinicianTitle"
                  className="form-select"
                  value={cliniciansList.title}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {titles.map((title) => (
                    <option key={title.id} value={title.id}>
                      {title.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="gender" className="required">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="form-select"
                  value={cliniciansList.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="firstName" className="required">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={cliniciansList.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="middleName" className="required">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className="form-control"
                  placeholder="Middle Name"
                  value={cliniciansList.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="lname" className="required">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={cliniciansList.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="dname" className="required">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="form-control"
                  placeholder="Display Name"
                  value={cliniciansList.displayName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="department" className="required">
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  className="form-select"
                  value={cliniciansList.department}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="designation" className="required">
                  Designation
                </label>
                <select
                  name="designation"
                  id="designation"
                  className="form-select"
                  value={cliniciansList.designation}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {designations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="speciality" >
                  Speciality
                </label>
                <select
                  name="speciality"
                  id="speciality"
                  className="form-select"
                  value={cliniciansList.speciality}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {specialities.map((speciality) => (
                    <option key={speciality.id} value={speciality.id}>
                      {speciality.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="mobile" className="required">
                  Mobile No.
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  maxLength={15}
                  className="form-control"
                  placeholder="Mobile Number"
                  value={cliniciansList.mobile}
                  onChange={handleMobileChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="email" >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="xyz@gmail.com"
                  value={cliniciansList.email}
                  onChange={emailChangeHandler}
                  autoComplete="email"
                />
              </div>

              <div className="col-12 col-md-2">
                <label htmlFor="status" className="required">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  className="form-select"
                  value={cliniciansList.status}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>Select</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="col-12 col-md-4">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="IsClinician"
                    className="form-check-input me-2"
                    checked={isFieldEnabled}
                    onChange={() => setIsFieldEnabled(!isFieldEnabled)}
                  />
                  <label htmlFor="IsClinician" className="form-check-label">
                    Enter Profile Input By Editor
                  </label>
                </div>
                {isFieldEnabled ?
                  <div className="col-12 col-md-12">
                    <SmartTextEditor
                      value={editorContent}
                      onChange={(e) => setEditorContent}
                    /></div> :
                  <div className="col-12 col-md-12">

                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Image URL"
                      value={cliniciansList.email}
                      onChange={emailChangeHandler}
                      autoComplete="email"
                    />
                  </div>
                }
              </div> */}
            </div>

          </form>
        )}
      </div>
      
     
      <div class="bg-body border-0 rounded shadow-lg p-3 ms-1 me-1 mt-4">
      <div className="breadcrumb-header align-items-center">
        <h3 className="fs-4 ms-1 mb-3">User Profile</h3>
      </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="custom-checkbox col-md-6">
                <input
                  type="checkbox"
                  id="prfileContent"
                  className="form-check-input me-2"
                  checked={isFieldEnabled}
                  onClick={() => setEditorContent("")}
                  onChange={() => {
                    setIsFieldEnabled(!isFieldEnabled);
                    clearProfileInput()
                  }}
                />
                <label htmlFor="prfileContent" className="form-check-label">
                  Enter Profile Input By Editor
                </label>
              </div>
            </div>
            {isFieldEnabled ?
              <div className="col-12 col-md-12">
                <SmartTextEditor
                  value={editorContent}
                  onChange={(e) => {
                    setEditorContent(e);
                    handleProfileInput("html", e)
                  }}
                />
              </div> :
              <div className="col-12 col-md-8">
                <input
                  type="url"
                  id="url"
                  name="url"
                  className="form-control"
                  placeholder="Enter Image URL"
                  value={cliniciansList.url}
                  onChange={e => handleProfileInput(e.target.name, e.target.value)}
                  autoComplete="email"
                />
              </div>
            }
          </div>
          <div className="col-12 mt-2">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClinician;
