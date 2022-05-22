import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isLoggedIn: boolean
  loggedInData?: { authToken: string; uid: string; email: string }
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateLoggedInWithData: (
      state: UserState,
      action: PayloadAction<UserState>
    ) => {
      const { payload } = action
      state.isLoggedIn = payload.isLoggedIn
      state.loggedInData = payload.loggedInData
    },
  },
})

export const { updateLoggedInWithData } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer
