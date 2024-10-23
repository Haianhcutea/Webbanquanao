import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import categoryReducer from "./categories";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
    }
})

export default store;