/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { fetchLoadChat, fetchAddChat } from './fetchApi'
import { ReduxThunkAction } from '@/lib/redux'

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadChatAsync = createAppAsyncThunk(
  'chat/fetchLoadChat',
  async ({ sender, receiver }: { sender: string, receiver: string }) => {
    const response = await fetchLoadChat(sender, receiver)

    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const addChatAsync = createAppAsyncThunk(
  'chat/fetchAddChat',
  async (message: Message) => {
    const response = await fetchAddChat(message)

    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const addChat =
  (content: string): ReduxThunkAction =>
    (dispatch, getState) => {

      const _id = Date.now().toString()
      // const message: Message = { _id, content }
      // dispatch(chatSlice.actions.add(message))
      // dispatch(addChatAsync(message))

    }
