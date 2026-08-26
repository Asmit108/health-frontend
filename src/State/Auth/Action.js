import axios from "axios";
import { API_BASE_URL, api } from "../../config/apiConfig";
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const token = localStorage.getItem("jwt");
const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = (jwt, role) => ({ type: REGISTER_SUCCESS, payload: { jwt, role } })
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error })

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())

    try {
        const response = await api.post(`${API_BASE_URL}/api/auth/signup`, userData)
        console.log(response);
        const jwt = response.data.jwt;
        const role = response.data.role;
        if (jwt && role) {
            localStorage.setItem("jwt", jwt)
            localStorage.setItem("role", role)
        }

        dispatch(registerSuccess(jwt, role))
    } catch (error) {
        dispatch(registerFailure(error.message))
    }
}

const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (jwt, role) => ({ type: LOGIN_SUCCESS, payload: { jwt, role } })
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })

export const login = (userData) => async (dispatch) => {
    console.log("login");
    dispatch(loginRequest())
    try {
        const response = await api.post(`${API_BASE_URL}/api/auth/signin`, userData)
        const jwt = response.data.jwt;
        const role = response.data.role;
        if (jwt && role) {
            localStorage.setItem("jwt", jwt)
            localStorage.setItem("role", role)
        }
        console.log(jwt)
        dispatch(loginSuccess(jwt, role))
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();
}
