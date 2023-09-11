import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {},
    session: {}
}

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = []
        },
        addSession: (state, action) => {

            state.session = action.payload
        },
        removeSession: (state) => {
            state.session = []
        }
    }
})
export const {addUser, removeUser,addSession,removeSession} = userSlice.actions
export default userSlice.reducer