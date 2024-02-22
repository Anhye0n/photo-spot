import { createSlice } from '@reduxjs/toolkit'

export interface UserInfo {
    userUUID: string
    userName: string
    accessToken: string
}

const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        userUUID: '',
        userName: '',
        accessToken: '',
    },
    reducers: {
        setUserUUID(state: UserInfo, { payload }: { payload: string }) {
            state.userUUID = payload
        },
        setUserName(state: UserInfo, { payload }: { payload: string }) {
            state.userName = payload
        },
        setAccessToken(state: UserInfo, { payload }: { payload: string }) {
            state.accessToken = payload
        },
    },
})

export const { setUserUUID, setUserName, setAccessToken } = userInfo.actions

export default userInfo