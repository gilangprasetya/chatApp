import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchLoadChat, fetchAddChat } from './fetchApi'
import { ReduxThunkAction } from '@/lib/redux'

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

export const addChat =
  (content: string): ReduxThunkAction =>
    (dispatch, getState) => {

      const _id = Date.now().toString()
    }
