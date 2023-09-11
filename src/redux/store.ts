import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '@/redux/features/counterSlice'
import userReducer from '@/redux/features/userSlice'
import {userApi} from "@/redux/services/userApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:{
        counterReducer,
        userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([userApi.middleware])
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch