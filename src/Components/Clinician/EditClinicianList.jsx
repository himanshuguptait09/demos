import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";



const EditLocation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [genders, setGenders] = useState([]);
  const [designations, setDesignations] = useState([]);
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


  const [statuses, setStatuses] = useState([
    {
      statusId: '1', name: 'Active'
    },
    {
      statusId: '2', name: 'Inactive'
    }
  ]);

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
    status: "",
    speciality: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (state?.cliniciansList) {
      setCliniciansList(state.cliniciansList);
    }
  }, [state]);


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
  const fetchDesignations = async () => {
    try {
      const response = await axios.get("https://localhost:8080/designation");
      setDesignations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
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

  useEffect(() => {
    fetchTitles();
    fetchGenders();
    fetchDesignations();
    fetchDepartments();
    fetchLocations();
    fetchStatuses();
    fetchSpecialities();
  }, []);


  const capitalizeEachWord = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // handleChange for clinicians
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Capitalize each word for specific fields
    if (['firstName', 'middleName', 'lastName', 'displayName'].includes(name)) {
      formattedValue = capitalizeEachWord(value);
    }

    setCliniciansList(prevState => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCliniciansList((prevState) => ({
      ...prevState,
      mobile: value
    }));
  }

  const handleSave = async (event) => {
    event.preventDefault();
    console.log("Submitting data:", cliniciansList);
    try {
      await axios.put(
        `https://localhost:8080/unitList/${cliniciansList.cliniciansId}`,
        cliniciansList
      );
      Swal.fire({
        title: "Good job!",
        text: "cliniciansList Edit Successful",
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
        <h2 className="fs-4 mt-4 mb-3 ms-1">Edit Clinicians List</h2>
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
                  name="location"
                  id="location"
                  className="form-select"
                  value={cliniciansList.location}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id} selected={cliniciansList.clinicianId === location.id}>
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
                  id="title"
                  className="form-select"
                  value={cliniciansList.title}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {titles.map((title) => (
                    <option key={title.id} value={title.id} selected={cliniciansList.clinicianId === title.id}>
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
                    <option key={gender.id} value={gender.id} selected={cliniciansList.clinicianId === gender.id} >
                      {gender.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="fName" className="required">
                  First Name
                </label>
                <input
                  type="text"
                  id="fName"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={cliniciansList.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="mName" className="required">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="mName"
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
                  id="lname"
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
                  id="dname"
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
                    <option key={department.id} value={department.id} selected={cliniciansList.clinicianId === department.id}>
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
                    <option key={designation.id} value={designation.id} selected={cliniciansList.clinicianId === designation.id}>
                      {designation.name}
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
                  value={cliniciansList.speciality}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select</option>
                  {specialities.map((speciality) => (
                    <option key={speciality.id} value={speciality.id} selected={cliniciansList.clinicianId === speciality.id}>
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
                <label htmlFor="email" className="required">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="xyz@gmail.com"
                  value={cliniciansList.email}
                  onChange={handleChange}
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
                  <option value="" disabled>Select</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id} selected={cliniciansList.clinicianId === status.id}>
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
