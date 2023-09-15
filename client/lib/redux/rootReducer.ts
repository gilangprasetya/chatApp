/* Instruments */
import { counterSlice, chatSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  chat: chatSlice.reducer,
}
