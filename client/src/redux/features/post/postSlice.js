import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../../api/axiosConfig";

const initialState = {
    posts: [],
    PopularPosts: [],
    isLoading: false,
    error: null,
    status: null,
}

export const createPost = createAsyncThunk(
    "post/createPost",
    async (params) => {

        try {
            const { data } = await axios.post("/posts", params)

            return data
        } catch (error){
            return error.response.data
        }
    })

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [createPost.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
            state.status = action.payload.message
            state.isLoading = false
        },
        [createPost.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        },
    }
})

export default postSlice.reducer
