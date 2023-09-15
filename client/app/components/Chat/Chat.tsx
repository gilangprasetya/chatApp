'use client'

import { Login } from '../Login'
import { ChatForm } from './ChatForm'
import { ChatList } from './ChatList'
import styles from './chat.module.css'
import { UserList } from '../User/UserList'
import { useSelector, selectReceiver, useDispatch, loadChatAsync } from '@/lib/redux'
import { io } from "socket.io-client";
import { useEffect } from 'react'
import { createContext } from 'react'


// connect to socket server
const socket = io('http://localhost:3001', {
  // path: "/api/socketio",
});

export const SocketContext = createContext(socket)

export const Chat = () => {

  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const receiver = useSelector(selectReceiver)
  const dispatch = useDispatch()

  useEffect((): any => {

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    socket.on("invite", (room: string, receiver: string) => {
      if (receiver == user.username)
        socket.emit('join', room, '')
    });

    // update chat on new message dispatched
    socket.on("messageReceived", (sender: string, receiver: string) => {
      if (user.username === receiver)
        dispatch(loadChatAsync({ sender, receiver: user.username }))
    });

    // socket disconnet onUnmount if exists
    // if (socket) return () => socket.disconnect();
  }, [user, receiver]);

  if (user?.username) {
    return (
      <SocketContext.Provider value={socket} >
        <div className={styles.allChat}>
          <UserList />
          <div className={styles.chatBox}>
            <ChatList />
            <ChatForm />
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
