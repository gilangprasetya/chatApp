import { request } from '../../../api'

export const fetchLoadChat = async (sender: string, receiver: string) => {
  const { data } = await request.get('/chats', {params: { sender, receiver }})
  return data
}

export const fetchAddChat = async (message: Message) => {
  const { data } = await request.post('/chats', message)
  return data
}