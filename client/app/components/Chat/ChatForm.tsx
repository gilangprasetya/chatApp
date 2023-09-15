'use client'

/* Core */
import { useCallback, useContext, useState } from 'react'

/* Instruments */
import {
  useDispatch,
  chatSlice,
  addChatAsync,
  selectReceiver,
  useSelector
} from '@/lib/redux'
import styles from './chat.module.css'
import { SocketContext } from './Chat'

export const ChatForm = () => {
  const socket = useContext(SocketContext)
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const receiver = useSelector(selectReceiver)
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const send = useCallback((event: any) => {
    event.preventDefault()
    const _id = Date.now().toString()
    const message: Message = { _id, content, sender: user.username, receiver }
    dispatch(chatSlice.actions.add(message)) // add to inteface
    dispatch(addChatAsync(message)) // add to backend
    socket.emit('message', `${user.username}-${receiver}`, user.username, receiver)
    setContent('')
  }, [content])

  return (
    <form onSubmit={send}>
      <div className={styles.divForm}>
        <input className={styles.input} type="text" name="chat" value={content} onChange={event => setContent(event.target.value)} />
        <button className={styles.button} type="submit">send</button>
      </div>
    </form>
  )
}
