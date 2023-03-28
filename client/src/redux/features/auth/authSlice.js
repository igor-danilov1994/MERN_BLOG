import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../../api/axiosConfig";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    status: null,
}

export const registrationUser = createAsyncThunk(
    "auth/registrationUser",
    async ({ username, password }) => {

    try {
        const { data } = await axios.post("auth/registration", { username, password })

        if (data.token){
            window.localStorage.setItem('token', data.token)
        }

        return data
    } catch (error){
        return error.response.data
    }
})

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }) => {

    try {
        const { data } = await axios.post("auth/login", { username, password })

        if (data.token){
            window.localStorage.setItem('token', data.token)
        }

        return data
    } catch (error){
        return error.response.data
    }
})

export const getMe = createAsyncThunk(
    "auth/meUser",
    async () => {

    try {
        const { data } = await axios.get("auth/me")

        return data
    } catch (error){
        return error.response.data
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.error = null
            state.status = null

            window.localStorage.removeItem('token')
        }
    },
    extraReducers: {
        // REGISTRATION
        [registrationUser.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
            state.status = null
        },
        [registrationUser.fulfilled] : (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.status = action.payload.message
            state.token = action.payload.token
        },
        [registrationUser.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // LOGIN
        [loginUser.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
            state.status = null
        },
        [loginUser.fulfilled] : (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.status = action.payload.message
            state.token = action.payload.token
        },
        [loginUser.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // ME

        [getMe.pending] : (state, action) => {
            state.isLoading = true
            state.error = null
            state.status = null
        },
        [getMe.fulfilled] : (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [getMe.rejected] : (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions

export default authSlice.reducer
