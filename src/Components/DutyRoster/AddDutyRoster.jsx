import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AddDutyRoaster = () => {
  const navigate = useNavigate();

  const [dutyRoster, setDutyRoster] = useState({
    location: "",
    unitName: "",
    shiftName: "",
    fromDate: "",
    toDate: "",
    status: "Active",
    noOfSession: ""
  });

  // State for dropdown options
  const [locations, setLocations] = useState([
    {
      id: '1', name: 'Location Name A', value: 'Location Name A'
    },
    {
      id: '2', name: 'Location Name B', value: 'Location Name B'
    },
    {
      id: '3', name: 'Location Name C', value: 'Location Name C'
    },
    {
      id: '4', name: 'Location Name B', value: 'Location Name D'
    },
  ]);

  const [units, setUnits] = useState([
    {
      id: '1', name: 'Kundan Ns Unit', value: 'Kundan Ns Unit'
    },
    {
      id: '2', name: 'Ullas Batra / Prerna Chadha', value: 'Ullas Batra / Prerna Chadha'
    },
    {
      id: '3', name: 'Ullas Batra', value: 'Ullas Batra'
    },
    {
      id: '4', name: 'Shubham Jain / Mansi Sharma', value: 'Shubham Jain / Mansi Sharma'
    },

  ]);
  const [shifts, setShifts] = useState([
    {
      id: '1', name: 'Special-Opd', value: 'Special-Opd'
    },
    {
      id: '2', name: 'Tele-Consultation', value: 'Tele-Consultation'
    },
    {
      id: '3', name: 'Special-Opd', value: 'Special-Opd'
    },
  ]);
  const [noOfSessions, setNoOfSessions] = useState([
    {
      id: '1', name: '1', value: '1'
    },
    {
      id: '2', name: '2', value: '2'
    },
    {
      id: '3', name: '3', value: '3'
    },
    {
      id: '4', name: '4', value: '4'
    },
    {
      id: '5', name: '5', value: '5'
    },
    {
      id: '6', name: '6', value: '6'
    }
  ]

  );
  const [statuses, setStatuses] = useState([
    {
      id: 1, name: "Active", value: 'Active'
    },
    {
      id: 2, name: "Inactive", value: 'Inactive'
    }
  ]);

  // API fetch functions
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/location");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/units");
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const fetchShifts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/shift");
      setShifts(response.data);
    } catch (error) {
      console.error("Error fetching shift:", error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/noOfSession");
      setNoOfSessions(response.data);
    } catch (error) {
      console.error("Error fetching noOfSession:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Api/statuses");
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  useEffect(() => {
    // fetchLocations();
    // fetchUnits();
    // fetchShifts();
    // fetchSessions();
    // fetchStatuses();
    setDutyRoster({ fromDate: getCurrentDate() });
  }, []);

  // Change handler for all inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDutyRoster((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  // from date validation
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // from date handler
  const fromDateHandler = (event) => {
    setDutyRoster({ ...dutyRoster, fromDate: event.target.value });
  };

  // Form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/dutyRoster", dutyRoster);
      console.log("Duty roster added successfully:", dutyRoster, response.data);
      Swal.fire({
        title: "Good job!",
        text: "Duty roster added successfully!",
        icon: "success"
      });

      // Pass the number of sessions, shift name, and unit name as a state
      navigate(`/duty-roster/timing-scheduling/${dutyRoster.id}`, {
        state: {
          sessionCount: parseInt(dutyRoster.noOfSession),
          shiftName: dutyRoster.shiftName,
          unitName: dutyRoster.unitName
        }
      });


      setDutyRoster({
        location: "",
        unitName: "",
        shiftName: "",
        fromDate: "",
        toDate: "",
        status: "",
        noOfSession: ""
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      console.log("Duty roster added successfully:", dutyRoster);

       // Pass the number of sessions, shift name, and unit name as a state
       navigate(`/duty-roster/timing-scheduling/${dutyRoster.id}`, {
        state: {
          sessionCount: parseInt(dutyRoster.noOfSession),
          shiftName: dutyRoster.shiftName,
          unitName: dutyRoster.unitName
        }
      });

      console.log
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header align-items-center">
        <h2 className="fs-4 mt-4 ms-1 mb-3">Add Duty Roster</h2>
      </div>
      <form className="p-3 ms-1 me-1 bg-body border-0 rounded shadow-lg" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-2">
            <label htmlFor="location" className="required">
              Location
            </label>
            <select
              name="location"
              id="location"
              value={dutyRoster.location}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select</option>
              {locations.map(location => (
                <option key={location.id} value={location.value}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="unitName" className="required">
              Unit Name
            </label>
            <select
              name="unitName"
              id="unitName"
              value={dutyRoster.unitName}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.value}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="shiftName" className="required">
              Shift Name
            </label>
            <select
              name="shiftName"
              id="shiftName"
              value={dutyRoster.shiftName}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select</option>
              {shifts.map(shift => (
                <option key={shift.id} value={shift.value}>
                  {shift.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="noOfSession" className="required">
              No. of Sessions
            </label>
            <select
              name="noOfSession"
              id="noOfSession"
              value={dutyRoster.noOfSession}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select</option>
              {noOfSessions.map(noOfSession => (
                <option key={noOfSession.id} value={noOfSession.value}>
                  {noOfSession.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="fromDate" className="required">
              From Date
            </label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={dutyRoster.fromDate}
              onChange={fromDateHandler}
              className="form-control"
              required
            />
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="toDate" className="required">
              To Date
            </label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={dutyRoster.toDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12 col-md-2">
            <label htmlFor="status" className="required">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={dutyRoster.status}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select</option>
              {statuses.map(status => (
                <option key={status.id} value={status.value}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDutyRoaster;