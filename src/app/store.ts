import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
//import projectReducer from "../features/project/projectSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    //project: projectReducer
  },
});


export type AppDispatch = typeof store.dispatch;