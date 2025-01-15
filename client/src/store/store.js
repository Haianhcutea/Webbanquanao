import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import categoryReducer from "./categories";
import cartReducer from "./cart";

import authAdminReducer from "./admin/auth";
import categoryAdminReducer from "./admin/categories";
import adminGetListReducer from "./admin/adminGetList";

const store = configureStore({
    reducer: {
        // store trong client
        auth: authReducer,
        category: categoryReducer,
        cart: cartReducer,
        // store trong admin
        authAdmin: authAdminReducer,
        categoryAdmin: categoryAdminReducer,
        adminGetList: adminGetListReducer,
    }
})

export default store;