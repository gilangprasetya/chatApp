'use client'

/* Core */
import { useEffect } from 'react'

/* Instruments */
import {
  useSelector,
  useDispatch,
  selectChats,
  loadChatAsync,
} from '@/lib/redux'
import styles from './chat.module.css'
import { ChatItem } from './ChatItem'

export const ChatList = () => {
  const dispatch = useDispatch()
  const chats = useSelector(selectChats)

  return (
    <div className={styles.list}>
      {chats.map((item) => (
        <div key={item._id} className={styles.messageContainer}>
          <ChatItem message={item} />
          <br />
        </div>
      ))}
    </div>
  )
}