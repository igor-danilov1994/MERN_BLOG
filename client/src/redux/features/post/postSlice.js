import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../../api/axiosConfig";

const initialState = {
    posts: [],
    popularPosts: [],
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

export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async () => {

        try {
            const { data } = await axios.get("/posts")

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
        // CREATE POST
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
        // GET ALL POSTS
        [getAllPosts.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
            state.status = action.payload.message
            state.isLoading = false
        },
        [getAllPosts.rejected]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
        },
    }
})

export default postSlice.reducer
