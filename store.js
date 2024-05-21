import { configureStore } from '@reduxjs/toolkit';//helps us set up the redux data layer
import navReducer from "./slices/navSlice";//navigating in the data layer


export const store = configureStore({
    reducer:{
        nav:navReducer
    },
});