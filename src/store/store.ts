import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userSlice, { UserInfo } from '@store/userSlice.ts'
import markersSlice, { MarkersType } from '@store/markers/markers-slice.ts'

export interface RootState {
   userInfo: UserInfo
   markers: MarkersType
}

const reducers = combineReducers({
   userInfo: userSlice.reducer,
   markers: markersSlice.reducer,
})

const persistConfig = {
   key: 'root', // localStorage key
   storage, // localStorage
   whitelist: ['userInfo', 'markers'], // target (reducer name)
}

const persistStore = persistReducer(persistConfig, reducers)

export default configureStore({
   reducer: persistStore,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})