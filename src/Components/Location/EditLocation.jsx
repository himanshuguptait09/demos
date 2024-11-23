import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { locationValidation } from "../Validation/AllValidation";
import { putData } from "../../utils/axios";

const EditLocation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // State to hold location data
  const [location, setLocation] = useState({
    locationId: "",
    locationType: "",
    locationName: "",
    shortName: "",
    status: ""
  });

  useEffect(() => {
    if (state?.location) {
      setLocation(state.location);
    }
  }, [state]);


  const handleSave = async (event) => {
    event.preventDefault();
    console.log("Submitting data:", location);
    try {
      await putData(
        `/locations/${location.locationId}`, location
      );
      Swal.fire({
        title: "Good job!",
        text: "Location Edit Successful",
        icon: "success"
      });
      navigate("/locations");
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
        <h2 className="fs-4 mt-4 mb-3 ms-1">Edit Location</h2>
      </div>
      <div className="card border-0 ms-1 me-1 rounded shadow">
        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row g-2 gap-md-2">
              <div className="col-12 col-md-2 ">
                <label htmlFor="locationType" className="required">
                  Location Type
                </label>
                <select
                  id="locationType"
                  name="locationType"
                  className="form-select"
                  value={location.locationType}
                  onChange={(e) =>
                    setLocation({ ...location, locationType: e.target.value })
                  }
                >
                  <option value="" disabled>Select</option>
                  <option value="subLocation">Sub Location</option>
                  <option value="centralLocation">Central Location</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="location-name" className="required">
                  Location Name
                </label>
                <input
                  type="text"
                  id="location-name"
                  className="form-control"
                  placeholder="Location Name"
                  value={location.locationName}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      locationName: locationValidation(e.target.value)
                    })
                  }
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="short-name" className="required">
                  Short Name
                </label>
                <input
                  type="text"
                  id="short-name"
                  className="form-control"
                  placeholder="Short Name"
                  value={location.shortName}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      shortName: locationValidation(e.target.value)
                    })
                  }
                />
              </div>
              <div className="col-12 col-md-2">
                <label htmlFor="status-select" className="required">
                  Status
                </label>
                <select
                  id="status-select"
                  name="status"
                  className="form-select"
                  value={location.status}
                  onChange={(e) =>
                    setLocation({ ...location, status: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="col-12">
                <button className="btn btn-primary mt-2" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLocation;
