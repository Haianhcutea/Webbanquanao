import React, { useEffect, useState, useContext } from "react";
import { Button, Space, Table, Drawer, Form, Row, Col, Input, Select, Popconfirm, Tag } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { openNotificationWithIcon, NotificationContext } from "@/App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setListCategory } from "../../../../store/admin/categories";

const AccountAdmin = () => {
  const api = useContext(NotificationContext);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("ADD");
  const [formCurd] = Form.useForm();

  //
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      ellipsis: true,
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "InActive",
          value: "inactive",
        },
        {
          text: "Closed",
          value: "closed",
        },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (value, record) => {
        let color = value === "active" ? "green" : "gray";
        if (value === "closed") {
          color = "red";
        }
        return <Tag color={color}>{value.toUpperCase()}</Tag>;
      },
    },
    
    {
      title: "Chức năng",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", gap: 16, justifyContent: "center" }}>
           <Button
        icon={<EditOutlined />}
        onClick={async () => {
          await handleGetDetail(record?._id); // Gọi hàm lấy chi tiết
          showDrawer();
          setAction("UPDATE");
        }}
      />
          <Popconfirm
            title="Xoá tài khoản admin"
            description="Bạn có chắc muốn xoá tài khoản admin này?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // hàm chạy lần đầu lấy data
  useEffect(() => {
    handleGetList();
  }, []);

  // hàm thêm sửa
  const handleAddorUpdate = async () => {
    if (action === "ADD") {
      formCurd
        .validateFields()
        .then(async (values) => {
          const response = await axios.post(`http://localhost:5555/api/auth/register-admin`, values);

          if (response.status === 201) {
            openNotificationWithIcon(api, "success", "Thành công", "Thêm tài khoản admin thành công!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Thất bại", "Vui lòng kiểm tra lại.");
        })
        .finally(() => {});
    } else {
      formCurd
        .validateFields()
        .then(async (values) => {
          const response = await axios.put(`http://localhost:5555/api/users/${values?._id}`, values);

          if (response.status === 200) {
            openNotificationWithIcon(api, "success", "Thành công", "Sửa tài khoản admin thành công!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Thất bại", "Vui lòng kiểm tra lại.");
        })
        .finally(() => {});
    }
  };

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/users`);

      if (response.status === 200) {
        setData(response.data);
        // lưu list category vào store
        dispatch(setListCategory(response.data));
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  const handleGetDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/users/${id}`);
      if (response.status === 200) {
        console.log(response.data, "response.data 111");
        
        formCurd.setFieldsValue(response.data); // Điền dữ liệu vào form
      }
    } catch (error) {
      console.error("Error occurred:", error);
      openNotificationWithIcon(api, "error", "Thất bại", "Không thể tải dữ liệu chi tiết.");
    }
  };
  

  // hàm xoá
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5555/api/users/${id}`);
      console.log(response, "!111");
      
      if (response.status === 200) {
        openNotificationWithIcon(api, "success", "Thành công", "Xoá thành công tài khoản admin!");
        handleGetList();
      } else {
        openNotificationWithIcon(api, "error", "Thất bại", "Không được xoá tài khoản này");
        handleGetList();
      }
    } catch (error) {
      openNotificationWithIcon(api, "error", "Thất bại", "Không được xoá tài khoản này.");
    } finally {
    }
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}>
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            formCurd.resetFields();
            setAction("ADD");
          }}
          icon={<PlusOutlined />}>
          Thêm
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          y: "calc(100vh - 350px)",
        }}
      />

      <Drawer
        title={action === "ADD" ? "Thêm mới tài khoản admin" : "Cập nhật tài khoản admin"}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Đóng</Button>
            <Button onClick={() => handleAddorUpdate("ADD")} type="primary">
              Lưu
            </Button>
          </Space>
        }>
        <Form layout="vertical" hideRequiredMark form={formCurd}>
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email",
                  },
                ]}>
                               <Input placeholder="Vui lòng nhập Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}>
                <Input.Password rows={4} placeholder="Vui lòng nhập mật khẩu" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AccountAdmin;