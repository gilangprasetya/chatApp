import type { ReduxState } from '@/lib/redux'
export const selectChats = (state: ReduxState) => state.chat.value
export const selectSender = (state: ReduxState) => state.chat.sender
export const selectReceiver = (state: ReduxState) => state.chat.receiver