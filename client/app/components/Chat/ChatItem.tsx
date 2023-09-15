'use client'

import styles from './chat.module.css'

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;

    return (
        <div>
            <div className={isMessageFromCurrentUser ? styles.messageRight : styles.messageLeft}>
                    {message.content}
            </div>
        </div>
    )
}