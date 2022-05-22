import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@redux-imports/tools/store'

interface PostsState {
  value: number
}

// Define the initial state using that type
const initialState: PostsState = {
  value: 0,
}

export const postsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts.value

export default postsSlice.reducer
