import {
    DELETE_PATIENT_FAILURE,
    DELETE_PATIENT_REQUEST,
    DELETE_PATIENT_SUCCESS,
    GET_PATIENT_BY_ID_FAILURE,
    GET_PATIENT_BY_ID_REQUEST,
    GET_PATIENT_BY_ID_SUCCESS,
    GET_PATIENT_PROFILE_FAILURE,
    GET_PATIENT_PROFILE_REQUEST,
    GET_PATIENT_PROFILE_SUCCESS,
    UPDATE_PATIENT_FAILURE,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_SUCCESS
} from "./ActionType"


const initialState={
    patient:null,
    isLoading:false,
    error:null
}
export const patientReducer=(state=initialState,action)=>{
     switch(action.type){
        case GET_PATIENT_PROFILE_BY_ID_REQUEST:
        case GET_PATIENT_PROFILE_REQUEST:
        case UPDATE_PATIENT_PROFILE_REQUEST:
        case DELETE_PATIENT_REQUEST:
            return {...state,isLoading:true,error:null}

        case GET_PATIENT_PROFILE_BY_ID_SUCCESS:
        case GET_PATIENT_PROFILE_SUCCESS:
        case UPDATE_PATIENT_PROFILE_SUCCESS:
            return {...state,isLoading:false,error:null,patient:action.payload}

        case DELETE_PATIENT_SUCCESS:
            return {...state,isLoading:false,error:null,patient:null}

        case GET_PATIENT_PROFILE_BY_ID_FAILURE:
        case GET_PATIENT_PROFILE_FAILURE:
        case UPDATE_PATIENT_PROFILE_FAILURE:
        case DELETE_PATIENT_FAILURE:
            return {...state,isLoading:false,error:action.payload}
        
        default:
           return state; 
     }

}