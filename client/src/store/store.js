import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import authReducer from "./auth";
import categoryReducer from "./categories";

const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
=======
import authReducer from "./auth-slice";

const store = configureStore({
    reducer: {
        auth: authReducer
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
    }
})

export default store;