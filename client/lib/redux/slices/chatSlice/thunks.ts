import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchLoadChat, fetchAddChat } from './fetchApi'

export const loadChatAsync = createAppAsyncThunk(
  'chat/fetchLoadChat',
  async ({ sender, receiver }: { sender: string, receiver: string }) => {
    const response = await fetchLoadChat(sender, receiver)
    return response.data
  }
)

export const addChatAsync = createAppAsyncThunk(
  'chat/fetchAddChat',
  async (message: Message) => {
    const response = await fetchAddChat(message)
    return response.data
  }
)
