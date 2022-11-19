import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../features/app/hooks'
import { fetchPosts } from '../features/counter/post_slice'

const PostList = () => {
    const dispatch = useAppDispatch()
    const postList = useAppSelector((state) => state.posts.posts)
    const postsStatus = useAppSelector((state) => state.posts.status)
    const error = useAppSelector((state) => state.posts.error)

    useEffect(() => {
      if (postsStatus == "idle") {
        dispatch(fetchPosts())
      }
    },[postsStatus, dispatch])

    let content;
    if (postsStatus === "loading") {
      content = <p>Loading...</p>
    }
    if (postsStatus === "succeeded") {
      content = postList.map((post) => (
        <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>{post.date}</p>
        </div>
    ))
    }
    if (postsStatus === "rejected") {
      content = <p>{error}</p>
    }

  return (
    <div>
        {content}
    </div>
  )
}

export default PostList