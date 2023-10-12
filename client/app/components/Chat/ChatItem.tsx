'use client'
import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useContext, useState } from 'react';
import { useDispatch, deleteChatAsync, chatSlice, useSelector, selectReceiver } from '@/lib/redux';
import { SocketContext } from './Chat'

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;
    const time = message.createdAt
    const clock: Date = new Date(time)

    const [isDeleted, setIsDeleted] = useState(false);
    const dispatch = useDispatch()
    const socket = useContext(SocketContext)
    const receiver = useSelector(selectReceiver)
    const [content, setContent] = useState('')

    const handleDelete = useCallback((event: any) => {
        event.preventDefault()
        const _id = Date.now().toString()
        const message: Message = { _id, content, sender: user.username, receiver }
        dispatch(chatSlice.actions.delete(message)) // add to inteface
        dispatch(deleteChatAsync(message)) // add to backend
        socket.emit('message', `${user.username}-${receiver}`, user.username, receiver)
        setContent('message is deleted...')
    }, [content])

    return (
        <div className={styles.messageContainer}>
            {isMessageFromCurrentUser && (
                <div className={styles.trashButton} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            )}
            <div
                className={
                    isMessageFromCurrentUser
                        ? styles.messageRight
                        : styles.messageLeft
                }
            >
                <div className={styles.messageTimeContainer}>
                    {isDeleted ? 'message is deleted...' : message.content}
                    <div className={styles.messageTime}>
                        {time ? clock.toString().slice(15, 21) : new Date(Date.now()).toString().slice(15, 21)}
                    </div>
                </div>
            </div>
        </div>
    )
}