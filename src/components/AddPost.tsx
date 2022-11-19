import React, { useState } from 'react'
import { useAppDispatch } from '../features/app/hooks'
import { addnewPost } from '../features/counter/post_slice'

const AddPost = () => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle'
    const savePost = () => {
        if (canSave) {
          try {
            setAddRequestStatus('pending')
            dispatch(addnewPost({title, body: content})).unwrap()
          } catch (error) {
            console.error('failed to save post', error)
          }
          finally {
            setAddRequestStatus('idle')
          }
        }
        setTitle("")
        setContent("")
    }
  return (
    <div style={{padding: '10px', height: '50vh',width: '30vw', border: '1px solid black'}}>
        <h1>Add Post</h1>
        <div style={{flexDirection: 'column', display: 'flex', marginBottom: '20px'}}>
            <h2>Title</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='title'/>
            <h2>Content</h2>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='content'/>
        </div>
        <button disabled={!canSave} onClick={savePost} >Add Post</button>
    </div>
  )
}

export default AddPost