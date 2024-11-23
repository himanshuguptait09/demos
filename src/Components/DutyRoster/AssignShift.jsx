import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AssignShift = () => {
    const [weeksData, setWeeksData] = useState({});
    const location = useLocation();
    const { selectedDays } = location.state || {};

    useEffect(() => {
        // Initialize weeksData with 0 to 6 sessions for each week
        const sessions = Object.keys(selectedDays).slice(0, 6);
        const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
        const initialWeeksData = weeks.reduce((acc, week) => {
            acc[week] = sessions.reduce((sessionAcc, sessionKey) => {
                sessionAcc[sessionKey] = selectedDays[sessionKey] || [];
                return sessionAcc;
            }, {});
            return acc;
        }, {});
        setWeeksData(initialWeeksData);
    }, [selectedDays]);

    const handleCheckboxChange = (week, sessionKey, day, isChecked) => {
        setWeeksData(prevWeeksData => {
            const updatedWeeksData = { ...prevWeeksData };
            const currentDays = updatedWeeksData[week][sessionKey] || [];
            const updatedSessionDays = isChecked
                ? [...currentDays, day]
                : currentDays.filter(d => d !== day);
            updatedWeeksData[week][sessionKey] = updatedSessionDays;
            return updatedWeeksData;
        });
    };



    const submitHandler = async (event) => {
        event.preventDefault();

        console.log("Week Data:", weeksData);

        try {
            const response = await axios.put(`http://localhost:8080/Api/sessions`, { weeksData },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Response data:", response.data);

            Swal.fire({
                title: "Good job!",
                text: "Time scheduling edit successful",
                icon: "success"
            });

        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : "Something went wrong!"
            });
        }
    };

    return (
        <div className="container-fluid">
            <div className="breadcrumb-header align-items-center">
                <h2 className="fs-4 mt-4 me-1 ms-1 mb-3">Assign Shifts</h2>
            </div>
            <form onSubmit={submitHandler}>
                <div className="card border-0 shadow me-1 ms-1">
                    <div className="card-body">
                        <div className="row">
                            {Object.keys(weeksData).map((week) => (
                                <div className="col-12 col-md-6" key={week}>
                                    <div className="table-responsive">
                                        <table className="assign-header-table table table-info table-striped table-hover text-center">
                                            <thead>
                                                <tr>
                                                    <th colSpan="12" className="border-bottom border-info-subtle">
                                                        <h6 className='fs-6 fw-semibold mt-2 text-dark-emphasis'>{week}</h6>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Days</th>
                                                    {Object.keys(weeksData[week]).map(sessionKey => (
                                                        <th key={sessionKey}>{`SESSION ${sessionKey.replace("session", "")}`}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                                    <tr key={day}>
                                                        <td>{day}</td>
                                                        {Object.keys(weeksData[week]).map(sessionKey => (
                                                            <td key={sessionKey} className='custom-checkbox'>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`${week}-${sessionKey}-${day}`}
                                                                    checked={weeksData[week][sessionKey].includes(day)}
                                                                    onChange={(e) => handleCheckboxChange(week, sessionKey, day, e.target.checked)}
                                                                    className='form-check-input'
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AssignShift;
