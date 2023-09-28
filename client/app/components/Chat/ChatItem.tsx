'use client'

import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;
    const time = message.createdAt
    const clock: Date = new Date(time)

    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async () => {
        if (!isDeleted) {
            try {
                const response = await fetch(`/api/chats/${message._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messageId: message._id,
                        newContent: 'message is deleted...',
                    }),
                });

                if (response.ok) {
                    console.log('Message deleted successfully on the backend.');
                } else {
                    console.error('Failed to delete message on the backend.');
                }
            } catch (error) {
                console.error('Error while deleting message:', error);
            } finally {
                setIsDeleted(true);
            }
        }
    };

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