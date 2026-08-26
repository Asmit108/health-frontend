import {
    CHECK_SYMPTOMS_FAILURE,
    CHECK_SYMPTOMS_REQUEST,
    CHECK_SYMPTOMS_SUCCESS
} from "./ActionType";

const initialState = {
    symptomResponse: null,
    isLoading: false,
    error: null
};

export const symptomReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_SYMPTOMS_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CHECK_SYMPTOMS_SUCCESS:
            return { ...state, isLoading: false, error: null, symptomResponse: action.payload };

        case CHECK_SYMPTOMS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
};
