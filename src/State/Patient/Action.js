import { API_BASE_URL, api } from "../../config/apiConfig";
import {
    DELETE_PATIENT_FAILURE,
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    GET_PATIENT_PROFILEBY_ID_FAILURE,
    GET_PATIENT_PROFILEBY_ID_REQUEST,
    GET_PATIENT_PROFILEBY_ID_SUCCESS,
    GET_PATIENT_PROFILE_FAILURE,
    GET_PATIENT_PROFILE_REQUEST,
    GET_PATIENT_PROFILE_SUCCESS,
    UPDATE_PATIENT_PROFILE_FAILURE,
    UPDATE_PATIENT_PROFILE_REQUEST,
    UPDATE_PATIENT_PROFILE_SUCCESS
} from "./ActionType";

const getPatientProfileByIdRequest = () => ({ type: GET_PATIENT_PROFILEBY_ID_REQUEST })
const getPatientProfileByIdSuccess = (profile) => ({ type: GET_PATIENT_PROFILEBY_ID_SUCCESS, payload: profile })
const getPatientProfileByIdFailure = (error) => ({ type: GET_PATIENT_PROFILEBY_ID_FAILURE, payload: error })

export const getPatientProfileById = (id) => async (dispatch) => {
    dispatch(getPatientProfileByIdRequest())
    try {
        const response = await api.get(`${API_BASE_URL}patients/${id}`)
        dispatch(getPatientProfileByIdSuccess(response.data))
    } catch (error) {
        dispatch(getPatientProfileByIdFailure(error.message))
    }
}

const getPatientProfileRequest = () => ({ type: GET_PATIENT_PROFILE_REQUEST })
const getPatientProfileSuccess = (profile) => ({ type: GET_PATIENT_PROFILE_SUCCESS, payload: profile })
const getPatientProfileFailure = (error) => ({ type: GET_PATIENT_PROFILE_FAILURE, payload: error })

export const getPatientProfile = () => async (dispatch) => {
    dispatch(getPatientProfileRequest())
    try {
        const response = await api.get(`${API_BASE_URL}patients/profile`)
        dispatch(getPatientProfileSuccess(response.data))
    } catch (error) {
        dispatch(getPatientProfileFailure(error.message))
    }
}

const updatePatientProfileRequest = () => ({ type: UPDATE_PATIENT_PROFILE_REQUEST })
const updatePatientProfileSuccess = (profile) => ({ type: UPDATE_PATIENT_PROFILE_SUCCESS, payload: profile })
const updatePatientProfileFailure = (error) => ({ type: UPDATE_PATIENT_PROFILE_FAILURE, payload: error })

export const updatePatientProfile = (profileData) => async (dispatch) => {
    dispatch(updatePatientProfileRequest())
    try {
        const response = await api.put(`${API_BASE_URL}patients`, profileData)
        dispatch(updatePatientProfileSuccess(response.data))
    } catch (error) {
        dispatch(updatePatientProfileFailure(error.message))
    }
}

const deletePatientRequest = () => ({ type: DELETE_PATIENT_REQUEST })
const deletePatientSuccess = () => ({ type: DELETE_PATIENT_SUCCESS })
const deletePatientFailure = (error) => ({ type: DELETE_PATIENT_FAILURE, payload: error })

export const deletePatient = () => async (dispatch) => {
    dispatch(deletePatientRequest())
    try {
        const response = await api.delete(`${API_BASE_URL}patients`)
        dispatch(deletePatientSuccess(response.data))
    } catch (error) {
        dispatch(deletePatientFailure(error.message))
    }
}