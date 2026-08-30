import { LOGOUT } from "../Auth/ActionType";
import {
    CREATE_APPOINTMENT_FAILURE,
    CREATE_APPOINTMENT_REQUEST,
    CREATE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FAILURE,
    DELETE_APPOINTMENT_REQUEST,
    DELETE_APPOINTMENT_SUCCESS,
    GET_APPOINTMENTS_BY_DOCTOR_FAILURE,
    GET_APPOINTMENTS_BY_DOCTOR_REQUEST,
    GET_APPOINTMENTS_BY_DOCTOR_SUCCESS,
    GET_APPOINTMENTS_BY_PATIENT_FAILURE,
    GET_APPOINTMENTS_BY_PATIENT_REQUEST,
    GET_APPOINTMENTS_BY_PATIENT_SUCCESS,
    RESCHEDULE_APPOINTMENT_FAILURE,
    RESCHEDULE_APPOINTMENT_REQUEST,
    RESCHEDULE_APPOINTMENT_SUCCESS,
    UPDATE_APPOINTMENT_STATUS_FAILURE,
    UPDATE_APPOINTMENT_STATUS_REQUEST,
    UPDATE_APPOINTMENT_STATUS_SUCCESS
} from "./ActionType";

const initialState = {
    appointments: [],
    appointment: null,
    isLoading: false,
    error: null
};

export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_REQUEST:
        case UPDATE_APPOINTMENT_STATUS_REQUEST:
        case RESCHEDULE_APPOINTMENT_REQUEST:
        case GET_APPOINTMENTS_BY_DOCTOR_REQUEST:
        case GET_APPOINTMENTS_BY_PATIENT_REQUEST:
        case DELETE_APPOINTMENT_REQUEST:
            return { ...state, isLoading: true, error: null};

        case CREATE_APPOINTMENT_SUCCESS:
            return { ...state, isLoading: false, error: null, appointment: action.payload};

        case UPDATE_APPOINTMENT_STATUS_SUCCESS:
        case RESCHEDULE_APPOINTMENT_SUCCESS:
            return { ...state, isLoading: false, error: null, appointment: action.payload };
        
        case DELETE_APPOINTMENT_SUCCESS:
            return { ...state, isLoading: false, appointment: null};
            
        case GET_APPOINTMENTS_BY_DOCTOR_SUCCESS:
        case GET_APPOINTMENTS_BY_PATIENT_SUCCESS:
            return { ...state, isLoading: false, error: null, appointments: action.payload };

        case LOGOUT:
            return initialState;

        case CREATE_APPOINTMENT_FAILURE:
        case UPDATE_APPOINTMENT_STATUS_FAILURE:
        case RESCHEDULE_APPOINTMENT_FAILURE:
        case GET_APPOINTMENTS_BY_DOCTOR_FAILURE:
        case GET_APPOINTMENTS_BY_PATIENT_FAILURE:
        case DELETE_APPOINTMENT_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
