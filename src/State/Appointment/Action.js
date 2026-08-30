import { API_BASE_URL, api } from "../../config/apiConfig";
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

const createAppointmentRequest = () => ({ type: CREATE_APPOINTMENT_REQUEST });
const createAppointmentSuccess = (appointment) => ({ type: CREATE_APPOINTMENT_SUCCESS, payload: appointment });
const createAppointmentFailure = (error) => ({ type: CREATE_APPOINTMENT_FAILURE, payload: error });

export const createAppointment = (appointmentData) => async (dispatch) => {
    dispatch(createAppointmentRequest());
    try {
        const response = await api.post(`${API_BASE_URL}appointments`, appointmentData);
        dispatch(createAppointmentSuccess(response.data));
        return { success: true, data: response.data };
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'Failed to create appointment';
        dispatch(createAppointmentFailure(message));
        return { success: false, error: message };
    }
};

const updateAppointmentStatusRequest = () => ({ type: UPDATE_APPOINTMENT_STATUS_REQUEST });
const updateAppointmentStatusSuccess = (result) => ({ type: UPDATE_APPOINTMENT_STATUS_SUCCESS, payload: result });
const updateAppointmentStatusFailure = (error) => ({ type: UPDATE_APPOINTMENT_STATUS_FAILURE, payload: error });

export const updateAppointmentStatus = (id, status) => async (dispatch) => {
    dispatch(updateAppointmentStatusRequest());
    try {
        const response = await api.put(`${API_BASE_URL}appointments/${id}`, null, { params: { status } });
        dispatch(updateAppointmentStatusSuccess(response.data));
    } catch (error) {
        dispatch(updateAppointmentStatusFailure(error.message));
    }
};

const rescheduleAppointmentRequest = () => ({ type: RESCHEDULE_APPOINTMENT_REQUEST });
const rescheduleAppointmentSuccess = (result) => ({ type: RESCHEDULE_APPOINTMENT_SUCCESS, payload: result });
const rescheduleAppointmentFailure = (error) => ({ type: RESCHEDULE_APPOINTMENT_FAILURE, payload: error });

export const rescheduleAppointment = (id, dateTime) => async (dispatch) => {
    dispatch(rescheduleAppointmentRequest());
    try {
        const response = await api.put(`${API_BASE_URL}appointments/${id}/reschedule`, null, { params: { dateTime } });
        dispatch(rescheduleAppointmentSuccess(response.data));
    } catch (error) {
        dispatch(rescheduleAppointmentFailure(error.message));
    }
};

const getAppointmentsByDoctorRequest = () => ({ type: GET_APPOINTMENTS_BY_DOCTOR_REQUEST });
const getAppointmentsByDoctorSuccess = (appointments) => ({ type: GET_APPOINTMENTS_BY_DOCTOR_SUCCESS, payload: appointments });
const getAppointmentsByDoctorFailure = (error) => ({ type: GET_APPOINTMENTS_BY_DOCTOR_FAILURE, payload: error });

export const getAppointmentsByDoctor = (doctorId) => async (dispatch) => {
    dispatch(getAppointmentsByDoctorRequest());
    try {
        const response = await api.get(`${API_BASE_URL}appointments/doctor/${doctorId}`);
        dispatch(getAppointmentsByDoctorSuccess(response.data));
    } catch (error) {
        dispatch(getAppointmentsByDoctorFailure(error.message));
    }
};

const getAppointmentsByPatientRequest = () => ({ type: GET_APPOINTMENTS_BY_PATIENT_REQUEST });
const getAppointmentsByPatientSuccess = (appointments) => ({ type: GET_APPOINTMENTS_BY_PATIENT_SUCCESS, payload: appointments });
const getAppointmentsByPatientFailure = (error) => ({ type: GET_APPOINTMENTS_BY_PATIENT_FAILURE, payload: error });

export const getAppointmentsByPatient = (patientId) => async (dispatch) => {
    dispatch(getAppointmentsByPatientRequest());
    try {
        const response = await api.get(`${API_BASE_URL}appointments/patient/${patientId}`);
        dispatch(getAppointmentsByPatientSuccess(response.data));
    } catch (error) {
        dispatch(getAppointmentsByPatientFailure(error.message));
    }
};

const deleteAppointmentRequest = () => ({ type: DELETE_APPOINTMENT_REQUEST });
const deleteAppointmentSuccess = () => ({ type: DELETE_APPOINTMENT_SUCCESS });
const deleteAppointmentFailure = (error) => ({ type: DELETE_APPOINTMENT_FAILURE, payload: error });

export const deleteAppointment = (id) => async (dispatch) => {
    dispatch(deleteAppointmentRequest());
    try {
        const response = await api.delete(`${API_BASE_URL}appointments/${id}`);
        dispatch(deleteAppointmentSuccess(response.data));
    } catch (error) {
        dispatch(deleteAppointmentFailure(error.message));
    }
};
