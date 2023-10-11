'use client'
import { Login } from '../Login'
import { ChatForm } from './ChatForm'
import { ChatList } from './ChatList'
import styles from './chat.module.css'
import { UserList } from '../User/UserList'
import { useSelector, selectReceiver, useDispatch, loadChatAsync } from '@/lib/redux'
import { io } from "socket.io-client";
import { useEffect, useState } from 'react'
import { createContext } from 'react'

const socket = io('http://localhost:3001', {
});

export const SocketContext = createContext(socket)

export const Chat = () => {

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const receiver = useSelector(selectReceiver)
  const dispatch = useDispatch()
  const [chatSelected, setChatSelected] = useState(false)

  useEffect((): any => {

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    socket.on("invite", (room: string, receiver: string) => {
      if (receiver == user.username)
        socket.emit('join', room, '')
    });

    socket.on("messageReceived", (sender: string, receiver: string) => {
      if (user.username === receiver)
        dispatch(loadChatAsync({ sender, receiver: user.username }))
    });

    if (receiver) {
      setChatSelected(true);
    }
  }, [user, receiver]);

  if (user?.username) {
    return (
      <SocketContext.Provider value={socket}>
        <div className={styles.allChat}>
          <UserList />
          <div className={styles.box}>
            {chatSelected ? (
              <div className={styles.nameRcvr}>{receiver}</div>
            ) : (
              <div className={styles.selectChatMessage}>
                Select user to start messaging . . .
              </div>
            )}
            {chatSelected ? (
              <div className={styles.chatBox}>
                <ChatList />
                <ChatForm />
              </div>
            ) : null}
          </div>
        </div>
      </SocketContext.Provider>
    )
  } else {
    return (
      <Login />
    )
  }
}