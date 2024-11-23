import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaRegImage } from 'react-icons/fa';
import { MdAttachFile } from 'react-icons/md';
import { VscFilePdf } from "react-icons/vsc";
import { validateInput, validateEmail, validateMobile } from "../Validation/AllValidation.js";
import { locationDetailsFields, locationMainCardFiled } from "./inputFieldsJson.js";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
// import Swal from "sweetalert2";


const LocationForm = () => {
  const [logoFile, setLogoFile] = useState("");
  const [favIcon, setFavIcon] = useState("");
  const [headerFile, setHeaderFile] = useState("");
  const [footerFile, setFooterFile] = useState("");
  const [errors, setErrors] = useState("");

  const fileInputRefLogo = useRef(null);
  const fileInputRefFavIcon = useRef("");
  const fileInputRefHeader = useRef(null);
  const fileInputRefFooter = useRef(null);


  const [cities, setCities] = useState([
    { id: 1, name: "Delhi", country: "India" },
    { id: 2, name: "Mumbai", country: "India" },
    { id: 3, name: "Bangalore", country: "India" },
    { id: 4, name: "Kolkata", country: "India" },
    { id: 5, name: "Chennai", country: "India" }
  ]);

  const [states, setStates] = useState([
    { id: 1, name: "Maharashtra" },
    { id: 2, name: "Delhi" },
    { id: 3, name: "Karnataka" },
    { id: 4, name: "West Bengal" },
    { id: 5, name: "Tamil Nadu" }
  ]);

  const [countries, setCountries] = useState([{ id: 1, name: "India" }]);

  const [statuses, setStatuses] = useState([
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" }
  ]);

  const [locationTypes, setLocationTypes] = useState([
    { id: 1, name: "Sub Location" },
    { id: 2, name: "Main Location" }
  ]);



  const [formData, setFormData] = useState({});
  let { locationId } = useParams()

  // validation for mobile number
  const handleMobileChange = (e) => {
    const { id, value } = e.target;
    const sanitizedValue = validateMobile(value); // Remove all non-digit characters
    if (sanitizedValue.length <= 15) {
      setFormData((prevLocation) => ({
        ...prevLocation,
        [id]: sanitizedValue
      }));
    } else {
      setErrors("Enter correct input");
    }
  };


  // email validation
  const handleEmailChange = (e) => {
    const { id, value } = e.target;
    const lowerCaseValue = value.toLowerCase();

    // Check if the value starts with a dot (.) or a non-alphanumeric character
    if (validateEmail(lowerCaseValue)) {
      setErrors('Invalid input');
      return;
    }

    setFormData((prevLocation) => ({
      ...prevLocation,
      [id]: lowerCaseValue
    }));
  };

  // upload document
  const handleFileChange = (setter) => (event) => {
    const file = event.target.files[0];
    if (file) {
      // const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      const validTypes = ['image/jpeg', 'image/png'];
      if (validTypes.includes(file.type)) {
        setter(file);
        console.log(fileInputRefFavIcon)
      } else {
        alert('Invalid file type. Please upload JPG, PNG.');
        setter(null);
      }
      event.target.value = null;
    }
  };


  1 + (+"1")

  // uploaded document delete
  const handleFileDelete = (setter) => () => {
    setter(null);
  };
  const getFileIcon = (file) => {
    if (file) {
      let icon;
      switch (file.type) {
        case 'application/pdf':
          icon = <VscFilePdf size={30} color="#c53b3e" />;
          break;
        case 'image/jpeg':
        case 'image/png':
          icon = <FaRegImage size={30} color="#5176cb" />;
          break;
        default:
          icon = <MdAttachFile size={30} color="#597785" />;
          break;
      }
      return (
        <>
          {icon}
        </>
      );
    }
    return;
  };

  const imageContainerStyle = {
    width: '85%',
    aspectRatio: '3 / 2',
    objectFit: 'contain'
  }

  const [masterData, setMasterData] = useState([
    { group: "cities", data: [], url: "/Api/cities", cb: (data) => { setCities(data); } },
    { group: "statuses", data: [], url: "/Api/statuses", cb: (data) => { setStatuses(data); } },
    { group: "locationTypes", data: [], url: "/Api/locationType", cb: (data) => { setLocationTypes(data); } },
    { group: "countries", data: [], url: "/Api/countries", cb: (data) => { setCountries(data); } },
    { group: "states", data: [], url: "/Api/states", cb: (data) => { setStates(data); } },
  ]);

  // Function to fetch data dynamically
  const fetchData = async (groupData) => {
    try {
      const response = await fetchData(groupData.url);
      groupData.cb(response.data); // Call the callback to set the data in the corresponding state
    } catch (error) {
      console.error(`Error fetching ${groupData.group}:`, error);
    }
  };

  // Fetch all the data in masterData
  useEffect(() => {
    // masterData.forEach((data) => fetchData(data));
  }, [masterData]);

  useEffect(() => {
    if (locationId) {
      // fetchData({ group: "states", data: [], url: "/locations", cb: (data) => { setStates(data); } });
      setFormData({
        "locationType": "Main Location",
        "locationName": "jhukkhbhjk",
        "shortName": "jhk",
        "status": "Inactive",
        "address": "dsfsd",
        "zip": "3432",
        "primaryEmail": "dsfsd@dsf.cc",
        "secondaryEmail": "dsfsd@dsf.cc",
        "secondaryContact": "23214324234",
        "contactOptional1": "3434234656",
        "contactOptional2": "4565646",
        "footer": "vchbfgh",
        "primaryContact": "3435454353",
        "website": "www.test.com"
      })
    }

  }, [locationId])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the input for the specific field
    const validationResult = validateInput(value, name);
    if (!validationResult.valid) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validationResult.errorMsg }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const validationResults = Object.keys(formData).map((key) => validateInput(formData[key], key));
    const isValid = validationResults.every(result => result.valid);

    if (isValid) {

      console.log("Form submitted:", formData);
    } else {
      Swal.fire({ icon: "error", title: "Validation Error", text: "Please fill mandatory field then submit." });
      console.log("Form submitted:", formData);
    }
  };

  let masterOptions = {
    countries: countries,
    states: states,
    statuses: statuses,
    cities: cities,
    locationTypes: locationTypes,
  };
  const formHandlers = {
    handleChange,
    handleFileChange,
    handleFileDelete,
    handleMobileChange,
    handleEmailChange
  }

  function returnControls(field) {
    const colClass = field.colClass || "col-12 col-md-2"; // Default column class

    if (field.type === "text" || field.type === "tel" || field.type === "email" || field.type === "url") {
      return (
        <div className={colClass} key={field.id}>
          <label htmlFor={field.id} className={field.required ? "required" : ""}>
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.name}
            className="form-control"
            value={formData[field.name]} // Using dynamic field value
            onChange={formHandlers[field?.onChange]} // Dynamic change handler
            placeholder={field.placeholder}
            required={field.required}

          />
        </div>
      );
    } else if (field.type === "select") {
      const options = masterOptions[field.options]; // Get options dynamically from masterOptions

      return (
        <div className={colClass} key={field.id}>
          <label htmlFor={field.id} className={field.required ? "required" : ""}>
            {field.label}
          </label>
          {field.name == "locationType" && locationId ?
            <input
              type={"text"}
              value={formData[field.name]} // Dynamic value binding
              className="form-control"
              disabled
            /> :
            <select
              id={field.id}
              name={field.name}
              className="form-select"
              value={formData[field.name]} // Dynamic value binding
              onChange={formHandlers[field?.onChange]} // Dynamic change handler
              required={field.required}
              disabled={locationId && field.name == "locationType" ? true : false}
            >
              <option value="" disabled>Select</option>
              {options?.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          }
        </div>
      );
    }
  }
  const fileInputs = [
    {
      id: 'logo',
      label: 'Logo',
      accept: '.jpg, .jpeg, .png, .pdf',
      fileState: logoFile,
      setFileState: setLogoFile,
      fileInputRef: fileInputRefLogo
    },
    {
      id: 'favicon',
      label: 'Favicon',
      accept: '.jpg, .jpeg, .png',
      fileState: favIcon,
      setFileState: setFavIcon,
      fileInputRef: fileInputRefFavIcon
    },
    {
      id: 'header',
      label: 'Header',
      accept: '.jpg, .jpeg, .png, .pdf',
      fileState: headerFile,
      setFileState: setHeaderFile,
      fileInputRef: fileInputRefHeader
    },
    {
      id: 'footer',
      label: 'Footer',
      accept: '.jpg, .jpeg, .png, .pdf',
      fileState: footerFile,
      setFileState: setFooterFile,
      fileInputRef: fileInputRefFooter
    }
  ];

  return (
    <div className="container-fluid">

      <div className="breadcrumb-header">
        <h2 className="fs-4 mt-4 ms-1 mb-3">Add Location</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card border-0 rounded shadow-lg ms-1 me-1">
          <div className="card-body">
            <div className="row g-3">
              {
                locationMainCardFiled?.map((field) => returnControls(field))
              }
            </div>
          </div>
        </div>

        <div className="card mt-4 ms-1 me-1 border-0 rounded shadow-sm">
          <div className="card-body">
            <h4 className="breadcrumb-header fs-5 mb-3">Location Details</h4>
            {/* row 1 */}
            <div className="row g-3">
              {locationDetailsFields.map((field) => returnControls(field))}
            </div>

            {/* row-2 */}
            <div className="mt-3">
              <label> Upload Image</label>

              <div className="row mt-1">
                {fileInputs.map(({ id, label, accept, fileState, setFileState, fileInputRef }) => (
                  <div key={id} className="col-12 col-md-3 mt-2 mt-lg-0">
                    <div className="upload-card p-1">
                      <div className="d-flex justify-content-between align-content-center mb-1 px-1">
                        <h6 className="fw-bold">{label}</h6>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current.click()}
                          className="btn btn-primary btn-sm"
                          aria-label={label}
                        >
                          {fileState ? 'Change' : 'Upload'}
                        </button>
                      </div>

                      <div className="mt-0 text-center bg-light">
                        {fileState ? <img
                          src={fileState ? URL.createObjectURL(fileState) : ""}
                          alt={`${label} preview`}
                          className="img-fluid"
                          style={imageContainerStyle}
                        /> : null}
                      </div>
                      <div className="bg-body d-flex p-1 px-2 justify-content-between">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange(setFileState)}
                          style={{ display: 'none' }}
                          accept={accept}
                        />
                        {fileState ? (
                          <>
                            {getFileIcon(fileState)}
                            <span className="custom-span mx-2 my-1 text-truncate">{fileState.name}</span>
                            <span className="my-1">{(fileState.size / 1024).toFixed(2)} KB</span>
                            <button
                              type="button"
                              onClick={handleFileDelete(setFileState)}
                              className="btn btn-danger btn-sm"
                            >
                              <AiOutlineDelete size={24} />
                            </button>
                          </>
                        ) : (
                          <p className="custom-p">Click to upload</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* upload form button */}
            <div className="justify-content-start mt-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </form >
    </div >
  );
};

export default LocationForm;