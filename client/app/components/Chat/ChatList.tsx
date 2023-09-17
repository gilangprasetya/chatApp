'use client'

/* Core */
import { useEffect, useRef } from 'react'

/* Instruments */
import {
  useSelector,
  selectChats,
} from '@/lib/redux'
import styles from './chat.module.css'
import { ChatItem } from './ChatItem'

export const ChatList = () => {
  const chats = useSelector(selectChats)
  const chatListRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className={styles.list} ref={chatListRef}>
      {chats.map((item) => (
        <div key={item._id} className={styles.messageContainer}>
          <ChatItem message={item} />
        </div>
      ))}
    </div>
  )
}