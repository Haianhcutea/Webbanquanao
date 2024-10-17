import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./store/auth-slice"; 
import { notification, Spin } from "antd";  
import { createContext } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Categories from "./components/category";
import MainLayouts from "./components/layouts/mainLayouts";
import Products from "./components/product";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

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
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainLayouts />}>
                <Route path="categories" element={<Categories />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        {/* </Spin> */}
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
