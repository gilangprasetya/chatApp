'use client'

import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;

    return (
        <div className={isMessageFromCurrentUser ? styles.messageRight : styles.messageLeft}>
            {message.content}
        </div>
    )
}