import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from 'date-fns'

const POST_URL = "https://jsonplaceholder.typicode.com/posts"

interface AsyncPostState {
    posts: any[];
    status: string;
    error: string | undefined;
}

interface PostState {
    id: string;
    title: string;
    content: string;
}

// const initialState: PostState[] = [] 

const initialState: AsyncPostState = {
    posts: [],
    status: "idle",
    error: "" 
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POST_URL)
        return [...response.data]
    } catch (error: any) {
        return error.message
    }
})

export const addnewPost = createAsyncThunk('posts/addnewPost', async (initialPost: any) => {
    try {
        const response = await axios.post(POST_URL, initialPost)
        return response.data
    }
    catch(error: any) {
        return error.message
    }
})

const counterSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    // reducers: {
    //     addPost: {
    //         reducer: (state, action: PayloadAction<AsyncPostState["posts"]>) => {
    //         state.posts.push(action.payload);
    //     },
    //         prepare: (title: string, content: string) => {
    //             return {
    //                 payload: [{
    //                 id: nanoid(),
    //                 title,
    //                 content,
    //                 }]
    //             }
    //         }
    //     }
    // },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1
                const loadPosts = action.payload.map((post: any) => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0,
                    }
                    return post
                })
                state.posts = state.posts.concat(loadPosts)
            })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addnewPost.fulfilled, (state, action) => {
            action.payload.date = new Date().toISOString()
            action.payload.reactions = {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            }
            state.posts.push(action.payload)
        })
     }
})
// export const {addPost} = counterSlice.actions;
export default counterSlice.reducer;

