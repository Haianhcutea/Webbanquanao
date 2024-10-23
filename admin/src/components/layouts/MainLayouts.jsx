import React, { useState } from "react";
import { DesktopOutlined, FileOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import {  Layout, Menu, theme, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { logoutAdmin } from "../../../../store/admin/auth";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Q.lý danh mục", "1", <PieChartOutlined />),
  getItem("Q.lý sản phẩm", "2", <DesktopOutlined />),
];

const MainLayoutAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authAdmin.user);

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  const handleButtonClick = (e) => {
    console.log("click left button", e);
  };
  const handleMenuClickAcc = (e) => {
    console.log("click", e);

    // đăng xuất
    if (e.key === "2") {
      dispatch(logout());
      navigate("/admin/login");
    }
  };
  const menuAcc = [
    {
      label: "Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <UserOutlined />,
      danger: true,
    },
  ];
  const menuProps = {
    items: menuAcc,
    onClick: handleMenuClickAcc,
  };

  const handleMenuClick = (e) => {
    console.log(e.key); 

    if (e.key === "1") {
      navigate("/admin/dashboard/categories");
    } else if (e.key === "2") {
      navigate("/admin/dashboard/products"); 
    } 
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "32px",
            marginBottom: "24px"
          }}>
          {/* Dropdown show tên user */}
          <Dropdown.Button
            menu={menuProps}
            placement="bottomLeft"
            icon={<UserOutlined />}
            onClick={handleButtonClick}
            style={{ justifyContent: "flex-end" }}>
            {user?.name} - {user.role}
          </Dropdown.Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100%)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "14px"
          }}>
          ADMIN ECOMMERCE LUXURY SHOP ©{new Date().getFullYear()} Created by group
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayoutAdmin;
