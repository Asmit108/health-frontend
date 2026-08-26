import { API_BASE_URL, api } from "../../config/apiConfig";
import {
    DELETE_DOCTOR_FAILURE,
    DELETE_DOCTOR_REQUEST,
    DELETE_DOCTOR_SUCCESS,
    GET_DOCTOR_PROFILE_BY_ID_FAILURE,
    GET_DOCTOR_PROFILE_BY_ID_REQUEST,
    GET_DOCTOR_PROFILE_BY_ID_SUCCESS,
    GET_DOCTOR_PROFILE_FAILURE,
    GET_DOCTOR_PROFILE_REQUEST,
    GET_DOCTOR_PROFILE_SUCCESS,
    GET_DOCTOR_PROFILES_FAILURE,
    GET_DOCTOR_PROFILES_REQUEST,
    GET_DOCTOR_PROFILES_SUCCESS,
    UPDATE_DOCTOR_FAILURE,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS
} from "./ActionType";

const getDoctorProfilesRequest = () => ({ type: GET_DOCTOR_PROFILES_REQUEST });
const getDoctorProfilesSuccess = (doctors) => ({ type: GET_DOCTOR_PROFILES_SUCCESS, payload: doctors });
const getDoctorProfilesFailure = (error) => ({ type: GET_DOCTOR_PROFILES_FAILURE, payload: error });

export const getDoctorProfiles = (filters = {}) => async (dispatch) => {
    dispatch(getDoctorProfilesRequest());
    try {
        const response = await api.get(`${API_BASE_URL}doctors`, { params: filters });
        dispatch(getDoctorProfilesSuccess(response.data));
    } catch (error) {
        dispatch(getDoctorProfilesFailure(error.message));
    }
};

const getDoctorProfileRequest = () => ({ type: GET_DOCTOR_PROFILE_REQUEST });
const getDoctorProfileSuccess = (profile) => ({ type: GET_DOCTOR_PROFILE_SUCCESS, payload: profile });
const getDoctorProfileFailure = (error) => ({ type: GET_DOCTOR_PROFILE_FAILURE, payload: error });

export const getDoctorProfile = () => async (dispatch) => {
    dispatch(getDoctorProfileRequest());
    try {
        const response = await api.get(`${API_BASE_URL}doctors/profile`);
        dispatch(getDoctorProfileSuccess(response.data));
    } catch (error) {
        dispatch(getDoctorProfileFailure(error.message));
    }
};

const getDoctorProfileByIdRequest = () => ({ type: GET_DOCTOR_PROFILE_BY_ID_REQUEST });
const getDoctorProfileByIdSuccess = (doctor) => ({ type: GET_DOCTOR_PROFILE_BY_ID_SUCCESS, payload: doctor });
const getDoctorProfileByIdFailure = (error) => ({ type: GET_DOCTOR_PROFILE_BY_ID_FAILURE, payload: error });

export const getDoctorProfileById = (id) => async (dispatch) => {
    dispatch(getDoctorProfileByIdRequest());
    try {
        const response = await api.get(`${API_BASE_URL}doctors/${id}`);
        dispatch(getDoctorProfileByIdSuccess(response.data));
    } catch (error) {
        dispatch(getDoctorProfileByIdFailure(error.message));
    }
};

const updateDoctorProfileRequest = () => ({ type: UPDATE_DOCTOR_PROFILE_REQUEST });
const updateDoctorProfileSuccess = (doctor) => ({ type: UPDATE_DOCTOR_PROFILE_SUCCESS, payload: doctor });
const updateDoctorProfileFailure = (error) => ({ type: UPDATE_DOCTOR_PROFILE_FAILURE, payload: error });

export const updateDoctorProfile = (doctorData) => async (dispatch) => {
    dispatch(updateDoctorProfileRequest());
    try {
        const response = await api.put(`${API_BASE_URL}doctors`, doctorData);
        dispatch(updateDoctorProfileSuccess(response.data));
    } catch (error) {
        dispatch(updateDoctorProfileFailure(error.message));
    }
};

const deleteDoctorRequest = () => ({ type: DELETE_DOCTOR_REQUEST });
const deleteDoctorSuccess = (message) => ({ type: DELETE_DOCTOR_SUCCESS, payload: message });
const deleteDoctorFailure = (error) => ({ type: DELETE_DOCTOR_FAILURE, payload: error });

export const deleteDoctor = () => async (dispatch) => {
    dispatch(deleteDoctorRequest());
    try {
        const response = await api.delete(`${API_BASE_URL}doctors`);
        dispatch(deleteDoctorSuccess(response.data));
    } catch (error) {
        dispatch(deleteDoctorFailure(error.message));
    }
};
