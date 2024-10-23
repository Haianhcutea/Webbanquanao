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
<<<<<<< HEAD
=======
import LoginAdmin from "./components/admin/components/auth/login";
import MainLayoutAdmin from "./components/admin/components/layouts/mainLayouts";
import CategoriesAdmin from "./components/admin/components/category";
import ProductsAdmin from "./components/admin/components/product";
import { setUserAdmin } from "./store/admin/auth";
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d

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
<<<<<<< HEAD
  const isLoading = useSelector((state) => state.auth.isLoading);
=======
  const isAuthenticatedAdmin = useSelector((state) => state.authAdmin.isAuthenticated);
  console.log(isAuthenticatedAdmin, "111111");
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

    if (token && userInfor?.name) {
      dispatch(setUser(userInfor));
    }
<<<<<<< HEAD
  }, [dispatch]);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
=======
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
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
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
<<<<<<< HEAD

=======
          {/* CLIENT */}
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
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
<<<<<<< HEAD
=======
          {/* ADMIN */}
          <Route path="/admin" element={<PrivateRouteAdmin />}>
            <Route path="dashboard" element={<MainLayoutAdmin />}>
              <Route path="categories" element={<CategoriesAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
            </Route>
          </Route>
          <Route path="/admin/login" element={<LoginAdmin />} />
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
        </Routes>
        {/* </Spin> */}
      </div>
    </NotificationContext.Provider>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
