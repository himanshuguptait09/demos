import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Paginator } from "primereact/paginator";

const LocationMappingList = () => {
  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  // Filter states
  const [centralLocations, setCentralLocations] = useState("All");
  const [mainLocations, setMainLocations] = useState("All");
  const [subLocations, setSubLocations] = useState("All");
  const [statuses, setStatuses] = useState("All");

  const [locationMappings, setLocationMappings] = useState([

    {
      id: '1',
      centralLocations: 'Central Location A',
      mainLocations: 'Main Location A',
      subLocations: 'Sub Location A',
      status: 'Active'
    },
    {
      id: '2',
      centralLocations: 'Central Location B',
      mainLocations: 'Main Location B',
      subLocations: 'Sub Location B',
      status: 'Active'
    },
    {
      id: '3',
      centralLocations: 'Central Location C',
      mainLocations: 'Main Location C',
      subLocations: 'Sub Location C',
      status: 'Inactive'
    },
    {
      id: '4',
      centralLocations: 'Central Location D',
      mainLocations: 'Main Location D',
      subLocations: 'Sub Location D',
      status: 'Active'
    },
    {
      id: '5',
      centralLocations: 'Central Location E',
      mainLocations: 'Main Location E',
      subLocations: 'Sub Location E',
      status: 'Active'
    },
    {
      id: '6',
      centralLocations: 'Central Location F',
      mainLocations: 'Main Location F',
      subLocations: 'Sub Location F',
      status: 'Inactive'
    },
    {
      id: '7',
      centralLocations: 'Central Location G',
      mainLocations: 'Main Location G',
      subLocations: 'Sub Location G',
      status: 'Active'
    },
    {
      id: '8',
      centralLocations: 'Central Location H',
      mainLocations: 'Main Location H',
      subLocations: 'Sub Location H',
      status: 'Active'
    },
    {
      id: '9',
      centralLocations: 'Central Location I',
      mainLocations: 'Main Location I',
      subLocations: 'Sub Location I',
      status: 'Inactive'
    },
    {
      id: '10',
      centralLocations: 'Central Location J',
      mainLocations: 'Main Location J',
      subLocations: 'Sub Location J',
      status: 'Active'
    },
    {
      id: '11',
      centralLocations: 'Central Location K',
      mainLocations: 'Main Location K',
      subLocations: 'Sub Location K',
      status: 'Active'
    }
  ]);


  const [filteredMappings, setFilteredMappings] = useState([

    {
      id: '1',
      centralLocations: 'Central Location A',
      mainLocations: 'Main Location A',
      subLocations: 'Sub Location A',
      status: 'Active'
    },
    {
      id: '2',
      centralLocations: 'Central Location B',
      mainLocations: 'Main Location B',
      subLocations: 'Sub Location B',
      status: 'Active'
    },
    {
      id: '3',
      centralLocations: 'Central Location C',
      mainLocations: 'Main Location C',
      subLocations: 'Sub Location C',
      status: 'Inactive'
    },
    {
      id: '4',
      centralLocations: 'Central Location D',
      mainLocations: 'Main Location D',
      subLocations: 'Sub Location D',
      status: 'Active'
    },
    {
      id: '5',
      centralLocations: 'Central Location E',
      mainLocations: 'Main Location E',
      subLocations: 'Sub Location E',
      status: 'Active'
    },
    {
      id: '6',
      centralLocations: 'Central Location F',
      mainLocations: 'Main Location F',
      subLocations: 'Sub Location F',
      status: 'Inactive'
    },
    {
      id: '7',
      centralLocations: 'Central Location G',
      mainLocations: 'Main Location G',
      subLocations: 'Sub Location G',
      status: 'Active'
    },
    {
      id: '8',
      centralLocations: 'Central Location H',
      mainLocations: 'Main Location H',
      subLocations: 'Sub Location H',
      status: 'Active'
    },
    {
      id: '9',
      centralLocations: 'Central Location I',
      mainLocations: 'Main Location I',
      subLocations: 'Sub Location I',
      status: 'Inactive'
    },
    {
      id: '10',
      centralLocations: 'Central Location J',
      mainLocations: 'Main Location J',
      subLocations: 'Sub Location J',
      status: 'Active'
    },
    {
      id: '11',
      centralLocations: 'Central Location K',
      mainLocations: 'Main Location K',
      subLocations: 'Sub Location K',
      status: 'Active'
    },
    {
      id: '12',
      centralLocations: 'Central Location K',
      mainLocations: 'Main Location K',
      subLocations: 'Sub Location K',
      status: 'Active'
    }
  ]);
  // Fetch data 
  useEffect(() => {
    const fetchLocationMappingList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/locationMapping");
        setLocationMappings(response.data);
        setFilteredMappings(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // fetchLocationMappingList();
  }, []);

  // Handle search (filter)
  const filterLocations = () => {
    const filtered = locationMappings.filter((locationMapping) => {
      return (
        (centralLocations === "All" || locationMapping.centralLocations === centralLocations) &&
        (mainLocations === "All" || locationMapping.mainLocations === mainLocations) &&
        (subLocations === "All" || locationMapping.subLocations === subLocations) &&
        (statuses === "All" || locationMapping.status === statuses)
      );
    });

    setFilteredMappings(filtered);
    setFirst(0);
  };

  // Handle pagination change
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Paginated
  const paginatedMappings = filteredMappings.slice(first, first + rows);

  return (
    <div className="container-fluid">
      <div className="breadcrumb-header ms-1 me-1 gap-1 mt-4 justify-content-start align-items-center d-flex">
        <h2 className="fs-4">Location Mappings List</h2>
        <span className="ms-2 me-2 mb-2 text-secondary opacity-75">|</span>
        <Link to="/location-mapping/add-location-mapping" className="custom-link text-decoration-none mb-1">
          Add New
        </Link>
      </div>

      <div className="card border-0 rounded shadow-lg ms-1 me-1">
        <div className="card-body">
          <div className="row g-2 gap-md-2">
            {/* Central Location Filter */}
            <div className="col-12 col-md-2">
              <label htmlFor="centralLocation">
                Central Location
              </label>
              <select
                id="centralLocation"
                className="form-select"
                value={centralLocations}
                onChange={(e) => setCentralLocations(e.target.value)}
              >
                <option value="All">Select</option>
                {locationMappings.map((location) => (
                  <option key={location.id} value={location.value}>
                    {location.centralLocations}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Location Filter */}
            <div className="col-12 col-md-2">
              <label htmlFor="mainLocation">
                Main Location
              </label>
              <select
                id="mainLocation"
                className="form-select"
                value={mainLocations}
                onChange={(e) => setMainLocations(e.target.value)}
              >
                <option value="All">Select</option>
                {locationMappings.map((location) => (
                  <option key={location.id} value={location.value}>
                    {location.mainLocations}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Location Filter */}
            <div className="col-12 col-md-2">
              <label htmlFor="subLocation">
                Sub Location
              </label>
              <select
                id="subLocation"
                className="form-select"
                value={subLocations}
                onChange={(e) => setSubLocations(e.target.value)}
              >
                <option value="All">Select</option>
                {locationMappings.map((location) => (
                  <option key={location.id} value={location.value}>
                    {location.subLocations}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-12 col-md-2">
              <label htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="form-select"
                value={statuses}
                onChange={(e) => setStatuses(e.target.value)}
              >
                <option value="All">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-12 col-md-2 search-btn">
              <button className="btn btn-primary" type="button" onClick={filterLocations}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Filtered Mappings */}
      <div className="card mt-4 border-0 ms-1 me-1 rounded shadow">
        <h4 className="table-header p-3 fs-5">List of Location Mappings</h4>
        <div className="table-responsive">
          <table className="table table-info table-striped text-center table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Central Location</th>
                <th>Main Location</th>
                <th>Sub Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMappings.length > 0 ? (
                paginatedMappings.map((locationMapping, index) => (
                  <tr key={locationMapping.id}>
                    <td>{first + index + 1}</td>
                    <td>{locationMapping.centralLocations}</td>
                    <td>{locationMapping.mainLocations}</td>
                    <td>{locationMapping.subLocations}</td>
                    <td>{locationMapping.status}</td>
                    <td>
                      <Link
                        to={`/location-mapping/edit-location-mapping/${locationMapping.id}`}
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
                    No Location Mapping Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {paginatedMappings.length > 0 && (
            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredMappings.length}
              onPageChange={onPageChange}
              className="custom-paginator"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMappingList;
