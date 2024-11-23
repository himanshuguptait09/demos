import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddLocationMapping = () => {
  const [centralLocations, setCentralLocations] = useState([
    { id: "1", name: "Central Location 1" },
    { id: "2", name: "Central Location 2" },
    { id: "3", name: "Central Location 3" }
  ]);

  const [mainLocations, setMainLocations] = useState([]);

  const [subLocations, setSubLocations] = useState([

  ]);

  const [status, setStatus] = useState([
    { id: "1", name: "Active" },
    { id: "2", name: "Inactive" }
  ]);

  const [locationMappingList, setLocationMappingList] = useState({
    centralLocation: '',
    mainLocation: '',
    subLocation: '',
    status: 'Active',
  });

  // Fetch Central Locations
  const fetchCentralLocation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/central-locations");
      setCentralLocations(response.data);
    } catch (error) {
      console.error("Error fetching Central Locations:", error);
    }
  };

  // Fetch Main Locations
  const fetchMainLocation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/main-locations");
      setMainLocations(response.data);
    } catch (error) {
      console.error("Error fetching Main Locations:", error);
    }
  };

  // Fetch Sub Locations
  const fetchSubLocation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sub-locations");
      setSubLocations(response.data);
    } catch (error) {
      console.error("Error fetching Sub Locations:", error);
    }
  };

  // Fetch Statuses
  const fetchStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/statuses");
      setStatus(response.data);
    } catch (error) {
      console.error("Error fetching Statuses:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchCentralLocation();
    fetchMainLocation();
    fetchSubLocation();
    fetchStatus();
  }, []);

  const handleCentralLocationChange = (e) => {
    const value = e.target.value;
    setLocationMappingList((prev) => ({ ...prev, centralLocation: value, mainLocation: "", subLocation: "", status: "" }));
    setMainLocations([
      { id: "1", name: "Main Location A" },
      { id: "2", name: "Main Location B" }
    ])
  };

  const handleMainLocationChange = (e) => {
    const value = e.target.value;
    setLocationMappingList((prev) => ({ ...prev, mainLocation: value, subLocation: "", status: "" }));
    setSubLocations("");
    setSubLocations([
      { id: "1", name: "Sub Location 1" },
      { id: "2", name: "Sub Location 2" },
      { id: "3", name: "Sub Location 3" }
    ])
  };

  const handleSubLocation = (e) => {
    const value = e.target.value;
    setLocationMappingList(prev => ({
      ...prev,
      subLocation: value,
      status: ''
    }));
  };

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setLocationMappingList((prev) => ({
      ...prev,
      [id]: value || ''
    }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:8080/locationMappingList", locationMappingList);

      console.log("Location mapping list added successfully:", locationMappingList, response.data);
      Swal.fire({
        title: "Good job!",
        text: "Location Mapping Add Successfully",
        icon: "success"
      });

      // Reset form states after successful submission
      setLocationMappingList({
        centralLocation: "",
        mainLocation: "",
        subLocation: "",
        status: ""
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("submit details ", locationMappingList);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });

    }
  };


  return (
    <div className="container-fluid ms-1 me-1">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 mb-3">Add Location Mapping</h2>
      </div>

      <div className="card border-0 rounded shadow-lg">
        <form className="card-body" onSubmit={submitHandler}>
          <div className="row g-2 gap-md-2">

            {/* Central Location */}
            <div className="col-12 col-md-2">
              <label htmlFor="centralLocation" className="required">
                Central Location
              </label>
              <select
                id="centralLocation"
                name="centralLocation"
                className="form-select"
                value={locationMappingList.centralLocation}
                onChange={handleCentralLocationChange}
                required
              >
                <option value="" disabled selected>Select</option>
                {centralLocations.map((centralLocation) => (
                  <option key={centralLocation.id} value={centralLocation.value}>
                    {centralLocation.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Location */}
            <div className="col-12 col-md-2">
              <label htmlFor="mainLocation" className="required">
                Main Location
              </label>
              <select
                id="mainLocation"
                name="mainLocation"
                className="form-select"
                value={locationMappingList.mainLocation}
                onChange={handleMainLocationChange}
                required
              >
                <option value="" disabled selected>Select</option>
                {mainLocations.map((mainLocation) => (
                  <option key={mainLocation.id} value={mainLocation.value}>
                    {mainLocation.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Location Multi-Select */}
            <div className="col-12 col-lg-2 mb-1 me-2">
              <label htmlFor="subLocation">
                Sub Location
              </label>
              <select
                id="subLocation"
                name="subLocation"
                className="form-select"
                value={locationMappingList.subLocation}
                onChange={handleSubLocation}
              >
                <option value="" disabled selected>Select</option>
                {subLocations.map((subLocation) => (
                  <option key={subLocation.id} value={subLocation.value}>
                    {subLocation.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="col-12 col-md-2">
              <label htmlFor="status" className="required">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={locationMappingList.status}
                onChange={changeHandler}
                required
              >
                <option value="" disabled selected>Select</option>
                {status.map((statuses) => (
                  <option key={statuses.id} value={statuses.value}>
                    {statuses.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="justify-content-start">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationMapping;
