import { API_BASE_URL, api } from "../../config/apiConfig";
import {
    CHECK_SYMPTOMS_FAILURE,
    CHECK_SYMPTOMS_REQUEST,
    CHECK_SYMPTOMS_SUCCESS
} from "./ActionType";

const checkSymptomsRequest = () => ({ type: CHECK_SYMPTOMS_REQUEST });
const checkSymptomsSuccess = (response) => ({ type: CHECK_SYMPTOMS_SUCCESS, payload: response });
const checkSymptomsFailure = (error) => ({ type: CHECK_SYMPTOMS_FAILURE, payload: error });

export const checkSymptoms = (symptomData) => async (dispatch) => {
    dispatch(checkSymptomsRequest());
    try {
        const response = await api.post(`${API_BASE_URL}symptoms/check`, symptomData);
        dispatch(checkSymptomsSuccess(response.data));
    } catch (error) {
        dispatch(checkSymptomsFailure(error.message));
    }
};
