// import { useState } from "react";

// const MultiSelectDropDown = () => {
//   const [selectedSubLocations, setSelectedSubLocations] = useState([]);
//   const [editableInput, setEditableInput] = useState(""); // Editable input state
//   const [subLocations] = useState([
//     { id: "1", name: "Clinician 1" },
//     { id: "2", name: "Clinician 2" },
//     { id: "3", name: "Clinician 3" },
//     { id: "4", name: "Clinician 4" },
//     { id: "5", name: "Clinician 5" },
//     { id: "6", name: "Clinician 6" },
//     { id: "7", name: "Clinician 7" },
//   ]);

//   // Get selected names from selected IDs
//   const getSelectedNames = () => {
//     return subLocations
//       .filter((subLocation) => selectedSubLocations.includes(subLocation.id))
//       .map((subLocation) => subLocation.name)
//       .join(", ");
//   };

//   // Handle checkbox changes
//   const handleSubLocationChange = (event) => {
//     const value = event.target.value;
//     setSelectedSubLocations((prevSelected) =>
//       prevSelected.includes(value)
//         ? prevSelected.filter((item) => item !== value)
//         : [...prevSelected, value]
//     );
//   };

//   // Handle editable input change
//   const handleEditableInputChange = (event) => {
//     setEditableInput(event.target.value);
//   };

//   return (
//     <div className="btn">
//       <div className="d-flex gap-3 p-4">
//         {/* Editable input */}
//         <input
//           type="text"
//           value={editableInput}
//           className="form-control"
//           onChange={handleEditableInputChange}
//         />
//         {/* Display selected names */}
//         <input
//           type="text"
//           value={getSelectedNames()}
//           className="form-control"
//           readOnly
//         />
//       </div>
//       <button
//         id="dropdownMenuButton"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//         className="form-select dropdown-button"
//       >
//         {selectedSubLocations.length > 0
//           ? `${selectedSubLocations.length} Selected`
//           : "Select"}
//       </button>
//       <ul
//         className="dropdown-menu rounded"
//         aria-labelledby="dropdownMenuButton"
//       >
//         {subLocations.map((item) => (
//           <li key={item.id} className="dropdown-item">
//             <div className="custom-checkbox form-check">
//               <input
//                 type="checkbox"
//                 id={`sub-location-${item.id}`}
//                 value={item.id}
//                 checked={selectedSubLocations.includes(item.id)}
//                 onChange={handleSubLocationChange}
//                 className="form-check-input me-2"
//               />
//               <label
//                 htmlFor={`sub-location-${item.id}`}
//                 className="form-check-label"
//               >
//                 {item.name}
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MultiSelectDropDown;
