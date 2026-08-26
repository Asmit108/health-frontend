import {
    DELETE_DOCTOR_FAILURE,
    DELETE_DOCTOR_REQUEST,
    DELETE_DOCTOR_SUCCESS,
    GET_DOCTOR_PROFILE_BY_ID_FAILURE,
    GET_DOCTOR_PROFILE_BY_ID_REQUEST,
    GET_DOCTOR_PROFILE_BY_ID_SUCCESS,
    GET_DOCTOR_PROFILES_FAILURE,
    GET_DOCTOR_PROFILES_REQUEST,
    GET_DOCTOR_PROFILES_SUCCESS,
    GET_DOCTOR_PROFILE_FAILURE,
    GET_DOCTOR_PROFILE_REQUEST,
    GET_DOCTOR_PROFILE_SUCCESS,
    UPDATE_DOCTOR_PROFILE_FAILURE,
    UPDATE_DOCTOR_PROFILE_REQUEST,
    UPDATE_DOCTOR_PROFILE_SUCCESS
} from "./ActionType";

const initialState = {
    doctors: [],
    doctor: null,
    isLoading: false,
    error: null
};

export const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTOR_PROFILES_REQUEST:
        case GET_DOCTOR_PROFILE_REQUEST:
        case GET_DOCTOR_PROFILE_BY_ID_REQUEST:
        case UPDATE_DOCTOR_PROFILE_REQUEST:
        case DELETE_DOCTOR_REQUEST:
            return { ...state, isLoading: true, error: null };

        case GET_DOCTOR_PROFILES_SUCCESS:
            return { ...state, isLoading: false, error: null, doctors: action.payload };

        case GET_DOCTOR_PROFILE_SUCCESS:
        case GET_DOCTOR_PROFILE_BY_ID_SUCCESS:
        case UPDATE_DOCTOR_PROFILE_SUCCESS:
            return { ...state, isLoading: false, error: null, doctor: action.payload };

        case DELETE_DOCTOR_SUCCESS:
            return { ...state, isLoading: false, error: null, doctor: null };

        case GET_DOCTOR_PROFILE_FAILURE:
        case GET_DOCTOR_PROFILES_FAILURE:
        case GET_DOCTOR_PROFILE_BY_ID_FAILURE:
        case UPDATE_DOCTOR_PROFILE_FAILURE:
        case DELETE_DOCTOR_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
