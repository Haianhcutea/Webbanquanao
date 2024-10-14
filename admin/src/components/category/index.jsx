import React, { useContext } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { openNotificationWithIcon, NotificationContext } from "../../App";
import axios from "axios";

const Register = () => {
  const api = useContext(NotificationContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post(
        `http://localhost:5555/api/auth/register`,
        values
      );

      if (response.status === 201) {
        openNotificationWithIcon(
          api,
          "success",
          "Register Successful",
          "You have successfully logged in!"
        );
        navigate("/login");
      }
    } catch (error) {
      openNotificationWithIcon(
        api,
        "error",
        "Register Failed",
        "Please check your credentials and try again."
      );
    }
  };

  return (
    <Row
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Col span={8}>
        <Form
          name="normal_Register"
          className="Register-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="role">
            <Select
              showSearch
              placeholder="Select roles"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="Register-form-button"
            >
              Register
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
