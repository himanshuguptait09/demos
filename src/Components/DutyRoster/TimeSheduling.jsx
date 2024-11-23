import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TimingScheduling = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { shiftName, unitName } = location.state || {};
    const [sessions, setSessions] = useState({});
    const sessionCountFromState = location.state?.sessionCount || 6;
    const [selectedDays, setSelectedDays] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
        const initSessions = {};
        const initSelectedDays = {};

        for (let i = 1; i <= sessionCountFromState; i++) {
            initSessions[`session${i}`] = { days: {} };
            initSelectedDays[`session${i}`] = [];
        }

        setSessions(initSessions);
        setSelectedDays(initSelectedDays);
    }, [sessionCountFromState]);

    const handleAllCheckboxChange = (sessionKey, isChecked) => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const updatedSelectedDays = isChecked ? days : [];

        setSelectedDays(prev => ({ ...prev, [sessionKey]: updatedSelectedDays }));

        setSessions(prevSessions => {
            const updatedSession = { ...prevSessions[sessionKey], days: {} };
            days.forEach(day => {
                updatedSession.days[day] = {
                    day,
                    fromTime: "",
                    toTime: "",
                    slotDuration: "",
                    overBookingAllow: isChecked,
                    overBookingSlots: isChecked ? "" : ""
                };
            });
            return { ...prevSessions, [sessionKey]: updatedSession };
        });
    };

    const handleDayChange = (sessionKey, day) => {
        setSelectedDays(prevSelectedDays => {
            const updatedDays = prevSelectedDays[sessionKey].includes(day)
                ? prevSelectedDays[sessionKey].filter(d => d !== day)
                : [...prevSelectedDays[sessionKey], day];

            setSessions(prevSessions => {
                const updatedSession = { ...prevSessions[sessionKey], days: { ...prevSessions[sessionKey].days } };
                if (updatedDays.includes(day)) {
                    updatedSession.days[day] = updatedSession.days[day] || {
                        day,
                        fromTime: "",
                        toTime: "",
                        slotDuration: "",
                        overBookingAllow: false,
                        overBookingSlots: ""
                    };
                } else {
                    delete updatedSession.days[day];
                }
                return { ...prevSessions, [sessionKey]: updatedSession };
            });

            return { ...prevSelectedDays, [sessionKey]: updatedDays };
        });
    };

    const isValidInteger = value => /^([1-9]\d*)$/.test(value);

    const validateSlotDuration = value => {
        const num = parseInt(value, 10);
        return isValidInteger(value) && num >= 0 && num <= 200;
    };

    const validateOverBookingSlots = value => {
        const num = parseInt(value, 10);
        return isValidInteger(value) && num > 0 && num <= 200;
    };

    const changeHandler = (e, sessionKey, field) => {
        const { value, type, checked } = e.target;
        setSessions(prevSessions => {
            const newSessions = { ...prevSessions };
            const updatedDays = { ...newSessions[sessionKey].days };

            Object.keys(updatedDays).forEach(day => {
                const dayData = { ...updatedDays[day] };

                // Update the specific field
                dayData[field] = type === "checkbox" ? checked : value;

                // Validate "from time" and "to time"
                if (field === "fromTime" || field === "toTime") {
                    const fromTime = field === "fromTime" ? dayData.fromTime : updatedDays[day].fromTime;
                    const toTime = field === "toTime" ? dayData.toTime : updatedDays[day].toTime;

                    if (fromTime === toTime) {
                        setErrorMessage(prevErrors => ({
                            ...prevErrors,
                            [sessionKey]: {
                                ...prevErrors[sessionKey],
                                [day]: {
                                    ...prevErrors[sessionKey]?.[day],
                                    time: "From Time and To Time cannot be the same."
                                }
                            }
                        }));
                        return prevSessions;
                    } else {
                        setErrorMessage(prevErrors => ({
                            ...prevErrors,
                            [sessionKey]: {
                                ...prevErrors[sessionKey],
                                [day]: {
                                    ...prevErrors[sessionKey]?.[day],
                                    time: ""
                                }
                            }
                        }));
                    }
                }

                // Validate inputs and set errors
                if (field === 'slotDuration') {
                    setErrorMessage(prevErrors => ({
                        ...prevErrors,
                        [sessionKey]: {
                            ...prevErrors[sessionKey],
                            [day]: {
                                ...prevErrors[sessionKey]?.[day],
                                slotDuration: !validateSlotDuration(value) ? "Please enter between 1 and 200" : ""
                            }
                        }
                    }));
                }

                if (field === 'overBookingSlots') {
                    setErrorMessage(prevErrors => ({
                        ...prevErrors,
                        [sessionKey]: {
                            ...prevErrors[sessionKey],
                            [day]: {
                                ...prevErrors[sessionKey]?.[day],
                                overBookingSlots: !validateOverBookingSlots(value) ? "Invalid number, Please enter between 1 and 200" : ""
                            }
                        }
                    }));
                }

                updatedDays[day] = dayData;
            });

            return {
                ...newSessions,
                [sessionKey]: {
                    ...newSessions[sessionKey],
                    days: updatedDays
                }
            };
        });
    };

    const handleDayDataChange = (sessionKey, day, field, value) => {
        if (field === 'slotDuration' && !validateSlotDuration(value)) {
            value = "";
        }

        if (field === 'overBookingSlots' && !validateOverBookingSlots(value)) {
            value = "";
        }

        setSessions(prevSessions => {
            const newSessions = { ...prevSessions };
            if (newSessions[sessionKey].days[day]) {
                newSessions[sessionKey].days[day] = {
                    ...newSessions[sessionKey].days[day],
                    [field]: value
                };
            }
            return newSessions;
        });

        // Validate inputs and set errors
        if (field === 'slotDuration') {
            setErrorMessage(prevErrors => ({
                ...prevErrors,
                [sessionKey]: {
                    ...prevErrors[sessionKey],
                    [day]: {
                        ...prevErrors[sessionKey]?.[day],
                        slotDuration: !validateSlotDuration(value) ? "Please enter between 1 and 200" : ""
                    }
                }
            }));
        }

        if (field === 'overBookingSlots') {
            setErrorMessage(prevErrors => ({
                ...prevErrors,
                [sessionKey]: {
                    ...prevErrors[sessionKey],
                    [day]: {
                        ...prevErrors[sessionKey]?.[day],
                        overBookingSlots: !validateOverBookingSlots(value) ? "Please enter between 1 and 200" : ""
                    }
                }
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("sessions details:", sessions);
            const response = await axios.post("http://localhost:8080/Api/sessions", { sessions }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Session details:", response.data);

            Swal.fire({
                title: "Good job!",
                text: "Session data updated successfully!",
                icon: "success"
            });

            navigate('/duty-roster/assign-shifts', {
                state: {
                    selectedDays,
                }
            });

        } catch (error) {
            console.error("Error updating session data:", error);
            Swal.fire({
                title: "Error!",
                text: "There was an error updating the data.",
                icon: "error"
            });

            navigate('/duty-roster/assign-shifts', {
                state: {
                    selectedDays,
                }
            });

        }
    };


    return (
        <div className="container-fluid">
            <div className="breadcrumb-header">
                <h2 className="fs-4 mt-4 ms-1 mb-3">Timing Schedules</h2>
            </div>
            <div className="card border-0 rounded shadow ms-1 me-1">
                <div className="card-body">
                    {/* Unit and Shift Information */}
                    <div className="row">
                        <div className="col-sm-12 col-md-2">
                            <label htmlFor="unitName" className="form-label">
                                Unit Name:
                            </label>
                        </div>
                        <div className="col-sm-12 col-md-10">
                            <output id="unitName" name="unitName"> {unitName}</output>
                        </div>
                        <div className="col-12 col-md-2">
                            <label htmlFor="shiftName" className="form-label">
                                Shift Name:
                            </label>
                        </div>
                        <div className="col-12 col-md-8">
                            <output id="shiftName" name="shiftName">  {shiftName}</output>
                        </div>
                    </div>

                    {/* Sessions */}
                    <form onSubmit={submitHandler} className="mt-2">
                        {Object.keys(sessions).map((sessionKey) => (
                            <div className="session-card" key={sessionKey}>
                                <h6 className="text-center fw-bold pt-3">{`SESSION ${sessionKey.replace("session", "")}`}</h6>
                                <hr className="custom-hr" />
                                <div className="d-flex flex-wrap justify-content-start gap-4 px-4">
                                    <div className="custom-checkbox align-items-center">
                                        <input
                                            type="checkbox"
                                            id={`${sessionKey}-all-checkbox`}
                                            checked={selectedDays[sessionKey].length === 7}
                                            className="form-check-input me-2"
                                            onChange={(e) => handleAllCheckboxChange(sessionKey, e.target.checked)}
                                        />
                                        <label htmlFor={`${sessionKey}-all-checkbox`}> All</label>
                                    </div>
                                    {[
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday"
                                    ].map((day) => (
                                        <div className="custom-checkbox align-items-center" key={day}>
                                            <input
                                                type="checkbox"
                                                id={`${sessionKey}-checkbox-${day}`}
                                                className="form-check-input me-2"
                                                checked={selectedDays[sessionKey].includes(day)}
                                                onChange={() => handleDayChange(sessionKey, day)}
                                            />
                                            <label htmlFor={`${sessionKey}-checkbox-${day}`}>
                                                {day}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <hr className="custom-hr" />

                                {selectedDays[sessionKey].length > 0 && (
                                    <div className="row px-4">
                                        <div className="col-sm-12 col-md-4 col-lg-2">
                                            <label htmlFor={`${sessionKey}-fromTime`} className="form-label" >
                                                FROM TIME:
                                            </label>
                                            <input
                                                type="time"
                                                id={`${sessionKey}-fromTime`}
                                                name="fromTime"
                                                value={Object.values(sessions[sessionKey].days)[0]?.fromTime || ""}
                                                onChange={(e) => changeHandler(e, sessionKey, "fromTime")}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-sm-12 col-md-4 col-lg-2">
                                            <label
                                                htmlFor={`${sessionKey}-toTime`}
                                                className="form-label"
                                            >
                                                TO TIME:
                                            </label>
                                            <input
                                                type="time"
                                                id={`${sessionKey}-toTime`}
                                                name="toTime"
                                                className={`form-control ${errorMessage[sessionKey]?.toTime ? 'is-invalid' : ''}`}
                                                value={Object.values(sessions[sessionKey].days)[0]?.toTime || ""}
                                                onChange={(e) => changeHandler(e, sessionKey, "toTime")}
                                            />
                                            {errorMessage[sessionKey]?.toTime && (
                                                <div className="invalid-feedback">
                                                    {errorMessage[sessionKey].toTime}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-md-4 col-lg-2">
                                            <label htmlFor={`${sessionKey}-slotDuration`} className="form-label" >
                                                SLOT DURATION:
                                            </label>
                                            <input
                                                type="tel"
                                                id={`${sessionKey}-slotDuration`}
                                                name="slotDuration"
                                                value={Object.values(sessions[sessionKey].days)[0]?.slotDuration || ""}
                                                onChange={(e) => changeHandler(e, sessionKey, "slotDuration")}
                                                className={`form-control ${errorMessage[sessionKey]?.slotDuration ? 'is-invalid' : ''}`}
                                                placeholder="Slot Duration"
                                            />
                                            {errorMessage[sessionKey]?.slotDuration && (
                                                <div className="invalid-feedback">
                                                    {errorMessage[sessionKey].slotDuration}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-md-4 col-lg-2">
                                            <label
                                                htmlFor={`${sessionKey}-overBookingAllow`}
                                                className="form-label"
                                            >
                                                OVERBOOKING ALLOW:
                                            </label>
                                            <div className="custom-checkbox input-group">
                                                <div className="input-group-text">
                                                    <input
                                                        type="checkbox"
                                                        id={`${sessionKey}-overBookingAllow`}
                                                        className="form-check-input"
                                                        checked={Object.values(sessions[sessionKey].days)[0]?.overBookingAllow || false}
                                                        onChange={(e) => changeHandler(e, sessionKey, "overBookingAllow")}
                                                    />
                                                </div>
                                                <input
                                                    type="tel"
                                                    id={`${sessionKey}-overBookingSlots`}
                                                    name="overBookingSlots"
                                                    className={`form-control ${errorMessage[sessionKey]?.overBookingSlots ? 'is-invalid' : ''}`}
                                                    value={Object.values(sessions[sessionKey].days)[0]?.overBookingSlots || ""}
                                                    onChange={(e) => changeHandler(e, sessionKey, "overBookingSlots")}
                                                    disabled={!Object.values(sessions[sessionKey].days)[0]?.overBookingAllow || false}
                                                    placeholder="Slots"
                                                />
                                                {errorMessage[sessionKey]?.overBookingSlots && (
                                                    <div className="invalid-feedback">
                                                        {errorMessage[sessionKey].overBookingSlots}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedDays[sessionKey].length > 0 && (
                                    <div className="row pt-2 px-4">
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                            <div className="table-responsive">
                                                <table className="table table-info table-striped text-center">
                                                    <thead>
                                                        <tr>
                                                            <th>Day</th>
                                                            <th>From Time</th>
                                                            <th>To Time</th>
                                                            <th>Slot Duration</th>
                                                            <th>Overbooking Allow</th>
                                                            <th>Overbooking Slots</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedDays[sessionKey].map((day, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{day}</td>
                                                                    <td>
                                                                        <input
                                                                            type="time"
                                                                            className="form-control"
                                                                            name={`fromTime-${sessionKey}-${day}`}
                                                                            value={sessions[sessionKey].days[day]?.fromTime || ""}
                                                                            onChange={(e) => handleDayDataChange(sessionKey, day, "fromTime", e.target.value)}
                                                                            required
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="time"
                                                                            className="form-control"
                                                                            name={`toTime-${sessionKey}-${day}`}
                                                                            value={sessions[sessionKey].days[day]?.toTime || ""}
                                                                            onChange={(e) => handleDayDataChange(sessionKey, day, "toTime", e.target.value)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="tel"
                                                                            name={`slotDuration-${sessionKey}-${day}`}
                                                                            className={`form-control ${errorMessage[sessionKey]?.[day]?.slotDuration ? 'is-invalid' : ''}`}
                                                                            value={sessions[sessionKey].days[day]?.slotDuration || ""}
                                                                            placeholder="Slot Duration"
                                                                            onChange={(e) => handleDayDataChange(sessionKey, day, "slotDuration", e.target.value)}
                                                                            required

                                                                        />
                                                                        {errorMessage[sessionKey]?.[day]?.slotDuration && (
                                                                            <div className="invalid-feedback">
                                                                                {errorMessage[sessionKey][day].slotDuration}
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                    <td className="custom-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input me-1"
                                                                            name={`overBookingAllow-${sessionKey}-${day}`}
                                                                            checked={sessions[sessionKey].days[day]?.overBookingAllow || false}
                                                                            onChange={(e) => handleDayDataChange(sessionKey, day, "overBookingAllow", e.target.checked)}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="tel"
                                                                            name={`overBookingSlots-${sessionKey}-${day}`}
                                                                            className={`form-control ${errorMessage[sessionKey]?.[day]?.overBookingSlots ? 'is-invalid' : ''}`}
                                                                            value={sessions[sessionKey].days[day]?.overBookingSlots || ""}
                                                                            placeholder="Overbooking Slot"
                                                                            onChange={(e) => handleDayDataChange(sessionKey, day, "overBookingSlots", e.target.value)}
                                                                            disabled={!sessions[sessionKey].days[day]?.overBookingAllow}
                                                                            required
                                                                        />
                                                                        {errorMessage[sessionKey]?.[day]?.overBookingSlots && (
                                                                            <div className="invalid-feedback">
                                                                                {errorMessage[sessionKey][day].overBookingSlots}
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                        <div className="justify-content-start">
                            <button className="btn btn-primary" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TimingScheduling;