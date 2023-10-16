import { User } from '@firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    removeUser: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
