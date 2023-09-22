'use client'

import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;

    const [isDeleted, setIsDeleted] = useState(false);

    // Step 2: Create a function to handle the delete action
    const handleDelete = async () => {
        // Check if the message is already deleted
        if (!isDeleted) {
            // Update the local state to mark the message as deleted
            setIsDeleted(true);

            try {
                // Send a request to the backend to update the message content
                const response = await fetch(`/api/chats/${message._id}`, {
                    method: 'PATCH', // Use the appropriate HTTP method (e.g., PATCH)
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messageId: message._id, // Pass the unique identifier of the message
                        newContent: 'message is deleted...', // Update the message content
                    }),
                });

                if (response.ok) {
                    // Handle success
                    console.log('Message deleted successfully on the backend.');
                } else {
                    // Handle error
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