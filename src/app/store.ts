import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import { firestoreApi } from '../features/sample/sampleSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(firestoreApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
