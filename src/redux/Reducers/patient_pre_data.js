
import _ from "lodash";

import * as types from "../Actions/patient_pre_data";
let pre_state = {
    pre_data: {
        location: "",
        doctor: "",
        routeStates: ""
    },
    doctor_page_data: {
        clinicionId: "",
        dayId: "",
        weekId: "",
        selectedDateAndTime: "",
        doctorInfo: "",
        selectedLocation: "",
        selectedClinic: "",
        clinicCharge: "",
        selectedClinicInfo: "",
        clinicName: "",
        selectedTime: "",
        personnelId: "",
        DataSetIfloggedIn: ""
    },
    patient_info: {
        patientId: "",
        patientInfo: ""
    },
}

const initialState = { ...pre_state }



export default function pateintPreData(state = initialState, actions) {
    switch (actions.type) {
        case types.SET_LOCATION_AND_SPECIALITY_DOCTOR_INFO: return {
            ...state,
            pre_data: {
                location: actions?.payload?.location,
                doctor: actions?.payload?.doctor,
                routeStates: actions?.payload?.routeStates
            },

        }
        case types.SET_DOCTOR_PAGE_DATA: return {
            ...state,
            doctor_page_data: {
                selectedDateAndTime: actions?.payload?.selectedDateAndTime,
                doctorInfo: actions?.payload?.doctorInfo,
                clinicionId: actions?.payload?.clinicionId,
                dayId: actions?.payload?.dayId,
                weekId: actions?.payload?.weekId,
                selectedLocation: actions?.payload?.selectedLocation,
                selectedClinic: actions?.payload?.selectedClinic,
                clinicCharge: actions?.payload?.selectedClinicCharge,
                clinicName: actions?.payload?.clinicName,
                selectedTime: actions?.payload?.selectedTime,
                selectedClinicInfo: actions?.payload?.selectedClinicInfo,
                personnelId: actions?.payload?.personnelId,
                DataSetIfloggedIn : actions?.payload?.DataSetIfloggedIn
            }
        }
        case types.SET_SELECTED_PATIENT_INFO: return {
            ...state,
            patient_info: {
                patientId: actions?.payload?.patientId,
                patientInfo: actions?.payload?.patientInfo,
            }
        }
        case types.CLEAR_SELECTED_INFO: return {
            ...state, pre_data: pre_state?.pre_data, doctor_page_data: pre_state?.doctor_page_data
        }
        default: return {
            ...state
        }
    }

}