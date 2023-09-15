'use client'

import styles from './chat.module.css'

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;
    
    return (
        <div className={isMessageFromCurrentUser ? styles.messageRight : styles.messageLeft}>
            <div className={styles.msgContent}>{message.content}</div>
        </div>
    )
}