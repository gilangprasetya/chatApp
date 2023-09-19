'use client'

import styles from './chat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { chatSlice } from '../../../lib/redux/slices/chatSlice/chatSlice';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const { deleteMessage } = chatSlice.actions;

const socket = io('http://localhost:3001', {
});

export const ChatItem = ({ message }: { message: Message }) => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const isMessageFromCurrentUser = message.sender === user?.username;
    const dispatch = useDispatch();
    const [isDeleted, setIsDeleted] = useState(message.isDeleted);

    useEffect(() => {
        socket.on('messageDeleted', (deletedMessageId) => {
            if (deletedMessageId === message._id) {
                setIsDeleted(true);
            }
        });
    }, [message._id]);

    const handleDelete = async () => {
        if (isMessageFromCurrentUser) {
            try {
                const response = await fetch(`http://localhost:3000/api/chats?chatItemId=${message._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    dispatch(deleteMessage(message._id));
                } else {
                    console.error('Failed to delete chat item:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred while deleting the chat item:', error);
            }
        }
    };

    if (message.isDeleted) {
        return null;
    }

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
                {message.content}
            </div>
        </div>
    )
}
