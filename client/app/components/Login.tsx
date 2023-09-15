'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react"
import styles from './login.module.css'

export const Login = () => {

    const { push } = useRouter()

    const [username, setUsername] = useState('')

    const submit = async (event: any) => {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/api/users/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('user', JSON.stringify(data))
                push('/chat')
                window.location.reload()
            }
        } catch (error) {
            console.error('Login error', error)
        }
    }

    return (
        <div className={styles.bigBox}>
            <form onSubmit={submit}>
                <div className={styles.textLogin}>LOGIN</div>
                <input type="text" placeholder="username" value={username} onChange={event => setUsername(event.target.value)} />
                <button type="submit">sign in</button>
            </form>
        </div>
    )
}
