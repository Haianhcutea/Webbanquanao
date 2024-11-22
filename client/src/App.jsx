import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthLayouts from "./components/layouts/AuthLayouts";
import Login from "./components/auth/login";
import Home from "./components/home";
import MainLayouts from "./components/layouts/MainLayouts";
import Product from "./components/product";
import ProductDetail from "./components/product/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useEffect } from "react";
import { notification } from "antd";
import Register from "./components/auth/register";
import { setUser } from "./store/auth";
import LoginAdmin from "./components/admin/components/auth/login";
import MainLayoutAdmin from "./components/admin/components/layouts/mainLayouts";
import CategoriesAdmin from "./components/admin/components/category";
import ProductsAdmin from "./components/admin/components/product";
import { setUserAdmin } from "./store/admin/auth";
import { fetchCategories } from "./store/categories";
import { fetchCartDetailByUserID } from "./store/cart";
import Order from "./components/order";

export const NotificationContext = createContext(null);

export const openNotificationWithIcon = (api, type, title, description) => {
  if (api) {
    return api[type]({
      message: title,
      description: description,
    });
  }
};

function App() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticatedAdmin = useSelector(
    (state) => state.authAdmin.isAuthenticated
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

    if (token && userInfor?.name) {
      dispatch(setUser(userInfor));
      // lưu danh sách categories khi có user
      
      dispatch(fetchCartDetailByUserID({ token, userId: userInfor._id }));
    }
    dispatch(fetchCategories());

    // admin
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const userInforAdmin = JSON.parse(localStorage.getItem("userAdmin")) ?? "";

    if (tokenAdmin && userInforAdmin?.name) {
      dispatch(setUserAdmin(userInforAdmin));
    }
  }, [dispatch]);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
  };

  const PrivateRouteAdmin = () => {
    return isAuthenticatedAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
  };

  return (
    <NotificationContext.Provider value={api}>
      <div>
        {contextHolder}
        <Routes>
          {/* CLIENT */}
          <Route path="/auth" element={<AuthLayouts />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="/" element={<Navigate to="/home" />} />{" "}
          {/* Redirect / to /home */}
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<MainLayouts />}>
              <Route path="home" element={<Home />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="product/:id" element={<ProductDetail />}></Route>
              <Route path="order" element={<Order />}></Route>
            </Route>
          </Route>
          {/* ADMIN */}
          <Route path="/admin" element={<PrivateRouteAdmin />}>
            <Route path="dashboard" element={<MainLayoutAdmin />}>
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
            </Route>
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
          {/* Fallback Route */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
        </Routes>
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
