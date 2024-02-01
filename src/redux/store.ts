import { configureStore } from '@reduxjs/toolkit'
import addUser from './counter';
import wallet from './wallet';


export const store = configureStore({
  reducer: {
    user: addUser,
    wallet:wallet
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
