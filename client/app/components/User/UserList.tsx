'use client'

/* Core */
import { useEffect, useState } from 'react'
import styles from './user.module.css'
import { UserItem } from './UserItem'

export const UserList = () => {

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const [users, setUsers] = useState([] as UserData[])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            const data = await response.json()
            setUsers(data.data)
        }
    }

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem('user');
            window.location.reload();
        }
    };

    return (
        <div className={styles.list}>
            <div>
                <div className={styles.kontak}>Contacts</div>
                <hr className={styles.hr} />
                <div className={styles.userlist}>
                    {users.filter(item => item.username !== user.username).map(item => <UserItem key={item._id} username={item.username} sender={user.username} />)}
                </div>
            </div>
            <div className={styles.bglist}>
                <div className={styles.logout} onClick={handleLogout}>LOG OUT</div>
            </div>
        </div>
    )
}
