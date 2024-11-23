import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Paginator } from 'primereact/paginator';
import { fetchData } from "../../utils/axios";
import { locationValidation } from "../Validation/AllValidation";

const LocationList = () => {
  const [locationType, setLocationType] = useState("All");
  const [locationName, setLocationName] = useState("");
  const [shortName, setShortName] = useState("");
  const [status, setStatus] = useState("All");
  const [locations, setLocations] = useState([
    {
      locationId: 1,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 2,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 3,
      locationType: "subLocation",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 4,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Active"
    },
    {
      locationId: 5,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 6,
      locationType: "Central Location",
      locationName: "Niti Bagh",
      shortName: "Nt",
      status: "Inactive"
    }, {
      locationId: 7,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 8,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 9,
      locationType: "subLocation",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 10,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Active"
    },
    {
      locationId: 11,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 12,
      locationType: "Central Location",
      locationName: "Niti Bagh",
      shortName: "Nt",
      status: "Inactive"
    }
  ]);
  const [filteredLocations, setFilteredLocations] = useState([
    {
      locationId: 1,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 2,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 3,
      locationType: "subLocation",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 4,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Active"
    },
    {
      locationId: 5,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 6,
      locationType: "Central Location",
      locationName: "Niti Bagh",
      shortName: "Nt",
      status: "Inactive"
    }, {
      locationId: 7,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 8,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 9,
      locationType: "subLocation",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Inactive"
    },
    {
      locationId: 10,
      locationType: "Central Location",
      locationName: "Rohini West",
      shortName: "RT",
      status: "Active"
    },
    {
      locationId: 11,
      locationType: "Sub Location",
      locationName: "NitiBag",
      shortName: "NT",
      status: "Active"
    },
    {
      locationId: 12,
      locationType: "Central Location",
      locationName: "Niti Bagh",
      shortName: "Nt",
      status: "Inactive"
    },
  ]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Fetch locations data on component mount

  const [statuses, setStatuses] = useState([
    { id: 2, name: "All" },
    { id: 1, name: "Active" },
    { id: 3, name: "Inactive" }
  ]);

  const [locationTypes, setLocationTypes] = useState([
    { id: 1, name: "All" },
    { id: 2, name: "Sub Location" },
    { id: 3, name: "Main Location" }
  ]);



  const initialFormFields = [
    {
      id: 'locationType',
      name: 'locationType',
      label: 'Location Type',
      type: 'select',
      value: locationType,
      options: locationTypes,
      placeholder: '',
      onChange: (e) => setLocationType(e.target.value)
    },
    {
      id: 'locationName',
      name: 'locationName',
      label: 'Location Name',
      type: 'text',
      value: locationName,
      placeholder: 'Location Name',
      onChange: (e) => setLocationName(locationValidation(e.target.value))
    },
    {
      id: 'shortName',
      name: 'shortName',
      label: 'Short Name',
      type: 'text',
      value: shortName,
      placeholder: 'Short Name',
      onChange: (e) => setShortName(locationValidation(e.target.value))
    },
    {
      id: 'status',
      name: 'status',
      label: 'Status',
      type: 'select',
      value: status,
      options: statuses,
      placeholder: '',
      onChange: (e) => setStatus(e.target.value)
    }
  ];
  // Function to fetch data dynamically
  const fetchData = async (groupData) => {
    try {
      const response = await fetchData(groupData.url);
      groupData.cb(response.data); // Call the callback to set the data in the corresponding state
    } catch (error) {
      console.error(`Error fetching ${groupData.group}:`, error);
    }
  };

  const [masterData, setMasterData] = useState([
    { group: "statuses", data: [], url: "/Api/statuses", cb: (data) => { setStatuses(data); } },
    { group: "locationTypes", data: [], url: "/Api/locationType", cb: (data) => { setLocationTypes(data); } },
    { group: "locations", data: [], url: "/locations", cb: (data) => { setLocations(data); setFilteredLocations(data)} }
  ]);

  useEffect(() => {
    // masterData.forEach((data) => fetchData(data));
  }, [masterData]);


  // Function to filter locations
  const filterLocations = () => {
    const filtered = locations.filter((location) => {
      return (
        (locationType === "All" || location.locationType.toLowerCase() === locationType.toLowerCase()) &&
        (location.locationName.toLowerCase().includes(locationName.toLowerCase()) || locationName === "") &&
        (location.shortName.toLowerCase().includes(shortName.toLowerCase()) || shortName === "") &&
        (status === "All" || location.status.toLowerCase() === status.toLowerCase())
      );
    });

    console.log("Filtered locations:", filtered);
    setFilteredLocations(filtered);
    setFirst(0);
  };

  // Handle pagination change
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Paginated data
  const paginatedLocations = useMemo(() => {
    return filteredLocations.slice(first, first + rows);
  }, [filteredLocations, first, rows]);

  return (
    <section>
      <div className="container-fluid">
        <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
          <h2 className="fs-4 text-center">Location&#39;s List</h2>
          <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
          <Link
            to="/locations/add-location"
            className="custom-link text-decoration-none mb-1"
          >
            Add New
          </Link>
        </div>

        <div className="card border-0 rounded shadow-lg ms-1 me-1">
          <div className="card-body">
            <div className="row g-2 gap-md-2">
              {initialFormFields.map((field) => (
                <div key={field.id} className="col-12 col-md-2">
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      name={field.name}
                      className="form-select"
                      value={field?.value}
                      onChange={field?.onChange}
                    >
                      {field.options.map((option) => (
                        <option key={option?.name} value={option?.name}>
                          {option?.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className="form-control"
                      value={field?.value}
                      onChange={(e) => field?.onChange(e)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <div className="col-12 col-md-2 search-btn">
                <button className="btn btn-primary" type="button"
                  onClick={filterLocations}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
          <h4 className="table-header p-3 fs-5">List of Locations</h4>
          <div className="table-responsive">
            <table className="table table-info table-striped text-center table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Location Type</th>
                  <th>Name</th>
                  <th>Short Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLocations.length > 0 ? (
                  paginatedLocations.map((location, index) => (
                    <tr key={location.locationId}>
                      <td>{first + index + 1}</td>
                      <td>{location.locationType}</td>
                      <td>{location.locationName}</td>
                      <td>{location.shortName}</td>
                      <td>{location.status}</td>
                      <td>
                        <Link
                          to={`/locations/edit-location/${btoa(location.locationId)}`}
                          state={{ location }}
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
                      No Location Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {filteredLocations.length > 0 &&
              <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredLocations.length}
                onPageChange={onPageChange}
                className="custom-paginator"
              />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationList;
