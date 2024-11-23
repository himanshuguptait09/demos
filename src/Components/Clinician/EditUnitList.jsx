import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const EditLocation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([
    {
      id: '1', name: 'Department A'
    },
    {
      id: '2', name: 'Department B'
    },
    {
      id: '3', name: 'Department C'
    },
    {
      id: '4', name: 'Department D'
    },
  ]);

  const [locations, setLocations] = useState([
    {
      id: '1', name: 'Location Name A',
    },
    {
      id: '2', name: 'Location Name B',
    },
    {
      id: '3', name: 'Location Name C',
    },
    {
      id: '4', name: 'Location Name B',
    },
  ]);


  const [specialities, setSpecialities] = useState([
    {
      id: '1', name: 'Speciality A'
    },
    {
      id: '2', name: 'Speciality B'
    }
  ]);

  const [unitHead, setUnitHead] = useState([
    {
      id: '1', name: 'UnitHead A'
    },
    {
      id: '2', name: 'UnitHead B'
    }
  ]);

  const [statuses, setStatuses] = useState([
    {
      statusId: '1', name: 'Active'
    },
    {
      statusId: '2', name: 'Inactive'
    }
  ]);

  const [clinicians, setClinicians] = useState([
    { id: "1", name: "Clinician 1" },
    { id: "2", name: "Clinician 2" },
    { id: "3", name: "Clinician 3" },
    { id: "4", name: "Clinician 4" },
    { id: "5", name: "Clinician 5" },
    { id: "6", name: "Clinician 6" },
    { id: "7", name: "Clinician 7" },
  ]);

  const [selectedClinician, setSelectedClinician] = useState("");

  const [unitList, setUnitList] = useState({
    location: "",
    unitName: "",
    displayName: "",
    department: "",
    speciality: "",
    selectedClinician: "",
    unitHead: "",
    status: "",
  });

  useEffect(() => {
    if (state?.unitList) {
      setUnitList(state.unitList);
    }
  }, [state]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("https://localhost:8080/department");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
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

  const fetchUnitHead = async () => {
    try {
      const response = await axios.get("https://localhost:8080/unitHead");
      setUnitHead(response.data);
    } catch (error) {
      console.error("Error fetching unit heads:", error);
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

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
    fetchStatuses();
    fetchSpecialities();
    fetchClinicians();
    fetchUnitHead();
  }, []);

  const capitalizeEachWord = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  // handleChange for unit-related fields
  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (['displayName'].includes(name)) {
      formattedValue = capitalizeEachWord(value);
    }

    setUnitList(prevState => ({
      ...prevState,
      [name]: formattedValue,
    }));
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
  const handleSave = async (event) => {
    event.preventDefault();
    console.log("Submitting data:", unitList);
    try {
      await axios.put(
        `https://localhost:8080/unitList/${unitList.unitId}`,
        unitList
      );
      Swal.fire({
        title: "Good job!",
        text: "unitList Edit Successful",
        icon: "success"
      });
      navigate("/");
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 mb-3 ms-1">Edit Unit List</h2>
      </div>
      <form onSubmit={handleSave}>
        <div className="card border-0 ms-1 me-1 rounded shadow">
          <div className="card-body">

            <div className="row g-3 py-2">
              <div className="col-12 col-md-2">
                <label htmlFor="location" className="required">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  className="form-select"
                  value={location.location}
                  onChange={(e) =>
                    setUnitList({ ...unitList, location: e.target.value })
                  }
                >
                  <option value="" disabled>Select</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id} selected={unitList.unitId === location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="unitName" className="required">
                  Unit Name
                </label>
                <input
                  type="text"
                  id="unitName"
                  className="form-control"
                  placeholder="Unit Name"
                  value={unitList.unitName}
                  onChange={(e) =>
                    handleUnitChange({
                      ...unitList,
                      unitName: (e.target.value)
                    })
                  }
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
                  onChange={(e) =>
                    handleUnitChange({
                      ...unitList,
                      displayName: (e.target.value)
                    })
                  }
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
                  onChange={(e) =>
                    setUnitList({ ...unitList, department: e.target.value })
                  }
                >
                  <option value="" disabled>Select</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id} selected={unitList.unitId === department.id}>
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
                  onChange={(e) =>
                    setUnitList({ ...unitList, speciality: e.target.value })
                  }
                >
                  <option value="" disabled>Select</option>
                  {specialities.map((speciality) => (
                    <option key={speciality.id} value={speciality.id} selected={unitList.unitId === speciality.id}>
                      {speciality.name}
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
                    {clinicians.map(clinician => (
                      <li key={clinician.id} className="dropdown-item" selected={unitList.unitId === clinician.id}>
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
                <label htmlFor="unitHead" className="required">
                  Unit Head
                </label>
                <select
                  name="unitHead"
                  id="unitHead"
                  className="form-select"
                  value={unitList.unitHead}
                  onChange={(e) =>
                    setUnitList({ ...unitList, unitHead: e.target.value })
                  }
                >
                 <option value="" disabled>Select</option>
                  {unitHead.map((unitHead) => (
                    <option key={unitHead.id} value={unitHead.id} selected={unitList.unitId === unitHead.id}>
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
                  onChange={(e) =>
                    setUnitList({ ...unitList, status: e.target.value })
                  }
                >
                  <option value="" disabled>Select</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id} selected={unitList.unitId === status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary mt-2" type="submit">
                Save
              </button>
            </div>
          </div>
        </div >
      </form>
    </div >

  );
};
export default EditLocation;
