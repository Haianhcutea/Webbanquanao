/** @format */

import React, { useEffect, useState, useContext } from "react";
import { Button, Space, Table, Drawer, Form, Row, Col, Input, Select, Popconfirm, Tag, InputNumber, DatePicker } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { openNotificationWithIcon, NotificationContext } from "@/App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setListCategory } from "../../../../store/admin/categories";
import dayjs from "dayjs";

const CouponsAdmin = () => {
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
      title: "Mã giảm gía",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      ellipsis: true,
      render: (value, record) => {
        let color = value === true ? "green" : "gray";
        if (value === "closed") {
          color = "red";
        }
        return <Tag color={color}>{value === true ? "Hoạt động" : "Không hoạt động"}</Tag>;
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      ellipsis: true,
    },
    {
      title: "Tổng giá được giảm",
      dataIndex: "maxDiscount",
      key: "maxDiscount",
      ellipsis: true,
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "usageLimit",
      key: "usageLimit",
      ellipsis: true,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expirationDate",
      key: "expirationDate",
      ellipsis: true,
    },
    {
      title: "Chức năng",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              showDrawer();
              setAction("UPDATE");
              handleGetCouponDetails(record._id); // Gọi API lấy chi tiết khi nhấn vào sửa
            }}
          />
          <Popconfirm title="Delete the product" description="Are you sure to delete this product?" onConfirm={() => handleDelete(record?._id)} okText="Yes" cancelText="No">
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
          const response = await axios.post(`http://localhost:5555/api/coupons/create`, values);

          if (response.status === 201) {
            openNotificationWithIcon(api, "success", "Thành công", "Thêm mã giảm giá thành công!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Thất bại", "Vui lòng kiểm tra dữ liệu");
        })
        .finally(() => {});
    } else {
      formCurd
        .validateFields()
        .then(async (values) => {
          const response = await axios.put(`http://localhost:5555/api/coupons/${values?._id}`, values);

          if (response.status === 200) {
            openNotificationWithIcon(api, "success", "Thành công", "Sửa mã giảm giá thành công!");
            handleGetList();
            onClose();
            formCurd.resetFields();
          }
        })
        .catch((err) => {
          console.error("Error occurred:", err);
          openNotificationWithIcon(api, "error", "Thất bại", "Vui lòng kiểm tra lại");
        })
        .finally(() => {});
    }
  };

  // Lấy chi tiết mã giảm giá theo ID
  const handleGetCouponDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5555/api/coupons/${id}`);
      if (response.status === 200) {
        const coupon = response.data;
  
        // Chuyển đổi expirationDate từ chuỗi ISO sang moment
        coupon.expirationDate = dayjs(coupon.expirationDate);
  
        // Set giá trị vào form
        formCurd.setFieldsValue(coupon);
  
        // Mở drawer
        showDrawer();
        setAction("UPDATE");
      }
    } catch (error) {
      console.error("Error occurred while fetching coupon details:", error);
    }
  };

  // lấy toàn bộ ds
  const handleGetList = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/coupons`);

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

  // hàm xoá
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5555/api/coupons/${id}`);
      if (response.status === 200) {
        openNotificationWithIcon(api, "success", "Thành công", "Bạn đã xoá thành công mã giảm giá!");
        handleGetList();
      }
    } catch (error) {
      console.error("Error occurred:", err);
      openNotificationWithIcon(api, "error", "Thất bại", "Vui lòng kiểm tra lại.");
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
        title={action === "ADD" ? "Thêm mới mã giảm giá" : "Cập nhật mã giảm giá"}
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
                name="code"
                label="Mã giảm giá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã giảm giá",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập mã giảm giá" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isActive"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập trạng thái",
                  },
                ]}>
                <Select placeholder="Vui lòng nhập trạng thái">
                  <Select.Option value="true">Hoạt động</Select.Option>
                  <Select.Option value="false">Không hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="discount"
                label="giảm giá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giảm giá",
                  },
                ]}>
                <InputNumber placeholder="Vui lòng nhập giảm giá" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxDiscount"
                label="Tổng được giảm giá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tổng được giảm giá",
                  },
                ]}>
                <InputNumber placeholder="Vui lòng nhập Tổng được giảm giá" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="usageLimit"
                label="Giới hạn sử dụng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Giới hạn sử dụng",
                  },
                ]}>
                <InputNumber placeholder="Vui lòng nhập Giới hạn sử dụng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="expirationDate"
                label="Ngày hết hạn"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Ngày hết hạn",
                  },
                ]}>
                <DatePicker placeholder="Vui lòng nhập Ngày hết hạn" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CouponsAdmin;
