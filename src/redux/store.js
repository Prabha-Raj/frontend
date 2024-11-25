import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'; // Adjust the path accordingly
import jobSlice from "./jobSlice"
import companySlice from "./companySlice"
import applicationSlice from './applicationSlice' 

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice, // Use 'auth' as the key for clarity
    job: jobSlice,
    company:companySlice,
    application:applicationSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Optional: If you want to set up listeners or perform other store enhancements, you can do that here

export default store;