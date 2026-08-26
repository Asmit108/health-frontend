import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk } from "redux-thunk"
import { authReducer } from "./Auth/Reducer"
import { productReducer } from "./Product/Reducer"
import { cartReducer } from "./Cart/Reducer"
import { orderReducer } from "./Order/Reducer"
import { patientReducer } from "./Patient/Reducer"
import { doctorReducer } from "./Doctor/Reducer"
import { appointmentReducer } from "./Appointment/Reducer"
import { symptomReducer } from "./Symptom/Reducer"

const rootReducers = combineReducers({
   auth: authReducer,
   product: productReducer,
   cart: cartReducer,
   order: orderReducer,
   patient: patientReducer,
   doctor: doctorReducer,
   appointment: appointmentReducer,
   symptom: symptomReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))