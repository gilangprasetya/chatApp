'use client'

import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;

    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async () => {
        if (!isDeleted) {
            setIsDeleted(true);
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
                {isDeleted ? 'message is deleted...' : message.content}
            </div>
        </div>
    )
}