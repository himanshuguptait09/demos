import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Paginator } from "primereact/paginator";

const DepartmentList = () => {
  const [unitName, setUnitName] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [status, setStatus] = useState("");
  const [setError] = useState("");

  // for pagination
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };


  // Fetch state
  const [dutyRosters, setDutyRosters] = useState([
    {
      id: '1', location: 'Location Name A', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Schedule', assignShift: 'Shift', status: 'Active'
    },
    {
      id: '2', location: 'Location Name B', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Scheduled', assignShift: 'Scheduled', status: 'Inactive'
    },
    {
      id: '3', location: 'Location Name A', unitName: 'Shubham Jain / Mansi Sharma', shiftName: 'Tele-Consultation', fromDate: '01-09-2024', toDate: '07-09-2024', scheduleTime: 'Scheduled', assignShift: 'Scheduled', status: 'Inactive'
    }, {
      id: '4', location: 'Location Name C', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Schedule', assignShift: 'Shift', status: 'Active'
    },
    {
      id: '5', location: 'Location Name D', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Scheduled', noOfSession: '1', assignShift: 'Scheduled', status: 'Inactive'
    },
    {
      id: '6', location: 'Location Name E', unitName: 'Shubham Jain / Mansi Sharma', shiftName: 'Tele-Consultation', fromDate: '01-09-2024', toDate: '07-09-2024', scheduleTime: 'Scheduled', noOfSession: '2', assignShift: 'Scheduled', status: 'Inactive'
    },
    {
      id: '7', location: 'Location Name F', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Schedule', noOfSession: '3', assignShift: 'Shift', status: 'Active'
    },
    {
      id: '8', location: 'Location Name G', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Scheduled', noOfSession: '4', assignShift: 'Scheduled', status: 'Inactive'
    },
    {
      id: '9', location: 'Location Name H', unitName: 'Shubham Jain / Mansi Sharma', shiftName: 'Tele-Consultation', fromDate: '01-09-2024', toDate: '07-09-2024', scheduleTime: 'Scheduled', noOfSession: '5', assignShift: 'Scheduled', status: 'Inactive'
    },
    {
      id: '10', location: 'Location Name I', unitName: 'Kundan Ns Unit', shiftName: 'Special-Opd', fromDate: '30-08-2025', toDate: '30-08-2025', scheduleTime: 'Schedule', noOfSession: '6', assignShift: 'Shift', status: 'Active'
    },
    {
      id: '11', location: 'Location Name J', unitName: 'Ullas Batra', shiftName: 'Tele-Consultation', fromDate: '25-08-2025', toDate: '30-08-2025', scheduleTime: 'Schedule', noOfSession: '3', assignShift: 'Shift', status: 'Inactive'
    },

  ]);

  // Initialize filteredDutyRosters with the full list
  const [filteredDutyRosters, setFilteredDutyRosters] = useState(dutyRosters);

  const currentDutyRoster = filteredDutyRosters.slice(first, first + rows);

  // Function to filter duty rosters
  const filterDutyRosters = () => {
    let filtered = dutyRosters;

    if (unitName) {
      filtered = filtered.filter((dutyRoster) =>
        dutyRoster.unitName.toLowerCase().includes(unitName.toLowerCase())
      );
    }

    if (shiftName) {
      filtered = filtered.filter(
        (dutyRoster) => dutyRoster.shiftName === shiftName
      );
    }

    if (status) {
      filtered = filtered.filter(
        (dutyRoster) => dutyRoster.status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredDutyRosters(filtered);
  };

  // Fetch data from API
  useEffect(() => {
    const fetchDutyRosters = async () => {
      try {
        const response = await fetch("https://localhost:8080/duty-rosters");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDutyRosters(data);
        setFilteredDutyRosters(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDutyRosters();
  }, []);


  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="container-fluid">
      {/* Page header */}
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4"> Duty Roster&#39;s List</h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link
          to="/duty-roster/add-duty-roster"
          className="custom-link text-decoration-none mb-1"
        >
          Add New
        </Link>
      </div>

      {/* Card start */}
      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row g-2 gap-md-2">
            <div className="col-12 col-md-2">
              <label htmlFor="unitName">
                Unit Name
              </label>
              <input
                type="text"
                className="form-control"
                id="unitName"
                placeholder="Unit Name"
                value={unitName}
                onChange={(e) => setUnitName(capitalizeWords(e.target.value))}
              />
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="shiftName">
                Shift Name
              </label>
              <select
                name="shiftName"
                id="shiftName"
                value={shiftName}
                className="form-select"
                required
                onChange={(e) => setShiftName(e.target.value)}
              >
                <option value="All">Select</option>
                <option value="Special-Opd"> Special-Opd</option>
                <option value="Tele-Consultation"> Tele-Consultation	</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="col-12 col-md-2">
              <label htmlFor="status">
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
                type="button"
                onClick={filterDutyRosters}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Table start */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        {/* Table header */}
        <h4 className="table-header p-3 fs-5">List of Clinicians</h4>
        <div className="table-responsive">
          <table className="table table-info table-striped text-center table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Unit Name</th>
                <th>Shift Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Schedule Timings</th>
                <th>Assign Shift</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDutyRoster.length > 0 ? (
                currentDutyRoster.map((dutyRoster, index) => (
                  <tr key={dutyRoster.id}>
                    <td>{index + 1}</td>
                    <td>{dutyRoster.unitName}</td>
                    <td>{dutyRoster.shiftName}</td>
                    <td>{dutyRoster.fromDate}</td>
                    <td>{dutyRoster.toDate}</td>

                    {/* SCHEDULE TIMINGS */}
                    <td>
                      <Link
                        to={`/duty-roster/time-scheduling/${dutyRoster.id}`}
                        state={{ dutyRoster }}
                        className={`custom-link text-decoration-none ${dutyRoster.scheduleTime === "Scheduled" ? "text-dark" : ""}`}
                        style={{
                          pointerEvents:
                            dutyRoster.scheduleTime === "Scheduled"
                              ? "none"
                              : "auto"
                        }}
                      >
                        {dutyRoster.scheduleTime}
                      </Link>
                    </td>

                    {/* ASSIGN SHIFT */}
                    <td>
                      <Link
                        to={`/duty-roster/assign-sShift/${dutyRoster.id}`}
                        className={`custom-link text-decoration-none ${dutyRoster.assignShift === "Scheduled"
                          ? "text-dark"
                          : ""
                          }`}
                        style={{
                          pointerEvents:
                            dutyRoster.assignShift === "Scheduled"
                              ? "none"
                              : "auto"
                        }}
                      >
                        {dutyRoster.assignShift}
                      </Link>
                    </td>

                    <td>{dutyRoster.status}</td>

                    <td>
                      <Link to="#" className="custom-link text-decoration-none">
                        Show
                      </Link>
                      <span className="ms-1 me-1">|</span>
                      <Link
                        to={`/duty-roster/edit-duty-roster/${dutyRoster.id}`}
                        state={{ dutyRoster }}
                        className="custom-link text-decoration-none">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No DutyRoster Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* pagination  */}
          {filteredDutyRosters.length > 0 && (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredDutyRosters.length}
              onPageChange={onPageChange}
              className="custom-paginator"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
