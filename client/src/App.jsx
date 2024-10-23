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
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

    if (token && userInfor?.name) {
      dispatch(setUser(userInfor));
    }
  }, [dispatch]);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <NotificationContext.Provider value={api}>
      <div>
        {contextHolder}
        {/* <Spin spinning={isLoading} tip="Loading...">   */}
        <Routes>
          {/* <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainLayouts />}>
                <Route path="categories" element={<Categories />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Route> */}

          <Route path="/auth" element={<AuthLayouts />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route element={<MainLayouts />}>
              <Route path="home" element={<Home />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="product/:id" element={<ProductDetail />}></Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* </Spin> */}
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
