import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "../counter/post_slice"

export const store = configureStore({
    reducer: {
        posts: PostSlice
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>