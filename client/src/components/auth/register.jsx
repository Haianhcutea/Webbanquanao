<<<<<<< HEAD
import React, { useContext } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationContext, openNotificationWithIcon } from "../../App";
import axios from "axios";


const Register = () => {
  const api = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post(`http://localhost:5555/api/auth/register`, values);

      if (response.status === 201) {
        openNotificationWithIcon(api, "success", "Register Successful", "You have successfully logged in!");
        navigate("/auth/login");
      }
    } catch (error) {
      openNotificationWithIcon(api, "error", "Register Failed", "Please check your credentials and try again.");
    }
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xs-12">
      <form action="#">
        <div className="login-form">
          <h4 className="login-title">Đăng ký</h4>
          <div className="row">
            <div className="col-md-6 col-12 mb-20">
              <label>Họ Tên</label>
              <Form.Item
              name="name"
             >
              <Input placeholder="Họ tên" />
            </Form.Item>
            </div>
            <div className="col-md-6 col-12 mb-20">
              <label>Email</label>
              <Form.Item
              name="email"
             >
              <Input placeholder="Email" />
            </Form.Item>
            </div>
            <div className="col-md-12 mb-20">
              <label>Password</label>
              <Form.Item name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>
            </div>
            <div className="col-md-12 mb-20">
              <label>Quyền</label>
              <Form.Item name="role">
            <Select
              showSearch
              placeholder="Select roles"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                {
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "user",
                  label: "User",
                },
              ]}
            />
          </Form.Item>
            </div>
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6 text-start text-sm-end">
              <Link to="/auth/login" className="forget-pass-link">
                Đăng nhập?
              </Link>
            </div>
            <div className="col-md-12">
              <Button className="register-button" htmlType="submit">
                Đăng ký
              </Button>
=======
import React from "react";

const Register = () => {

  // call api
  return (
    <div className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
      <form action="#">
        <div className="login-form">
          <h4 className="login-title">Register</h4>
          <div className="row">
            <div className="col-md-6 col-12 mb-20">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="col-md-6 col-12 mb-20">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="col-md-12 mb-20">
              <label>Email Address*</label>
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="col-md-6 mb-20">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="col-md-6 mb-20">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div className="col-12">
              <button className="register-button mt-0">Register</button>
>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
