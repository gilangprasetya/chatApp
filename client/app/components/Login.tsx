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
            <div className={styles.textLogin}>
                LOGIN
            </div>
            <hr className={styles.hr} />
            <form className={styles.formContainer} onSubmit={submit}>
                <input className={styles.input} type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
                <button className={styles.submit} type="submit">LOG IN</button>
            </form>
        </div>
    )
}
