/** @format */

import {
  Card,
  Col,
  Descriptions,
  Row,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  formatCurrency,
  NotificationContext,
  openNotificationWithIcon,
} from "../../../../App";
import { useSelector } from "react-redux";

const OrderDetailAdmin = () => {
  const api = useContext(NotificationContext);
  const orderStatus = useSelector((state) => state.cart.orderStatus);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [listDataUser, setListDataUser] = useState([]);
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order; // Lấy order từ state truyền sang

  if (!order) {
    return <p>Không có dữ liệu đơn hàng.</p>;
  }

  // Thiết lập màu cho trạng thái
  const statusColor =
    order.status === "pending"
      ? "orange"
      : order.status === "completed"
      ? "green"
      : "red";

  // Cấu trúc dữ liệu bảng sản phẩm
  const productColumns = [
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    {
      title: "Ảnh",
      dataIndex: "img_url",
      key: "img_url",
      render: (url) => (
        <img
          src={`http://localhost:5555${url}`}
          alt="product"
          style={{ width: 32 }}
        />
      ),
    },
    {
      title: "Biến thể",
      key: "variants",
      render: (text, record) => (
        <ul>
          {record.variants.map((variant, idx) => (
            <li key={idx}>
              Màu: {variant.color}, Size: {variant.size}, Giá: {variant.price}{" "}
              VNĐ, SL: {variant.quantity}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  // State để quản lý Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Hàm mở modal và thiết lập giá trị mặc định cho form
  const showEditModal = () => {
    form.setFieldsValue({
      receiver_name: order.receiver_name,
      receiver_phone: order.receiver_phone,
      receiver_address: order.receiver_address,
      receiver_email: order.receiver_email,
      note: order.note,
      status: order.status,
    });
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm xử lý chỉnh sửa thông tin
  const handleEditSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/api/order/${order.order_id}`,
        {
          ...values,
          user_id: order.user_id, // Giữ nguyên user_id
        },
        {
          headers: { Authorization: `Bearer ${tokenAdmin}` },
        }
      );

      if (response.status === 200) {
        openNotificationWithIcon(
          api,
          "success",
          "Cập nhật đơn hàng thành công",
          "Cập nhật đơn hàng thành công!"
        );
        setIsModalVisible(false);
        navigate("/admin/dashboard/orders");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      // Xử lý thông báo lỗi nếu cần
    }
  };

  useEffect(() => {
    handleGetListUser();

    return () => {};
  }, []);

  // get danh sách user
  const handleGetListUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/api/users`);

      if (response.status === 200) {
        setListDataUser(response.data);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
    }
  };

  console.log(orderStatus, "111");
  return (
    <div>
      <h4 className="mb-3">Chi tiết Đơn hàng</h4>

      {/* Row 1: Thông tin người đặt và người nhận */}
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Thông tin người đặt"
            bodyStyle={{ padding: "10px" }}
            headStyle={{ padding: "0 16px", minHeight: 38 }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item
                style={{ padding: "6px" }}
                label="ID người đặt"
              >
                {order.user_id}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ padding: "6px" }}
                label="Tên người đặt"
              >
                {listDataUser.find((x) => x._id === order.user_id)?.name ?? ""}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            title="Thông tin người nhận"
            bodyStyle={{ padding: "10px" }}
            headStyle={{ padding: "0 16px", minHeight: 38 }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item
                style={{ padding: "6px" }}
                label="Tên người nhận"
              >
                {order.receiver_name}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ padding: "6px" }}
                label="Số điện thoại"
              >
                {order.receiver_phone}
              </Descriptions.Item>
              <Descriptions.Item style={{ padding: "6px" }} label="Địa chỉ">
                {order.receiver_address}
              </Descriptions.Item>
            </Descriptions>
            <div
              style={{ marginTop: "10px" }}
              className="d-flex justify-content-end"
            >
              <Button type="primary" onClick={showEditModal}>
                Chỉnh sửa
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Row 2: Thông tin khác */}
      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card
            title="Thông tin đơn hàng"
            bodyStyle={{ padding: "10px" }}
            headStyle={{ padding: "0 16px", minHeight: 38 }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item style={{ padding: "6px" }} label="Tổng tiền">
                {formatCurrency(order.total_price)}
              </Descriptions.Item>
              <Descriptions.Item style={{ padding: "6px" }} label="Giảm giá">
                -{formatCurrency(order.discount)}
              </Descriptions.Item>
              <Descriptions.Item style={{ padding: "6px" }} label="Ngày tạo">
                {new Date(order.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item style={{ padding: "6px" }} label="Trạng thái">
                {/* <Tag color={statusColor}>{order.status.toUpperCase()}</Tag> */}
                <Tag color={statusColor}>
                  {orderStatus.find(
                    (status) =>
                      status.englishName.toLowerCase() ===
                      order.status.toLowerCase()
                  )?.name || "Trạng thái không xác định"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Row 3: Danh sách sản phẩm */}
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card
            title="Sản phẩm trong đơn hàng"
            bodyStyle={{ padding: "10px" }}
            headStyle={{ padding: "0 16px", minHeight: 38 }}
          >
            <Table
              columns={productColumns}
              dataSource={order.items}
              pagination={false}
              rowKey="product_id"
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Modal chỉnh sửa thông tin */}
      <Modal
        title="Chỉnh sửa thông tin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="receiver_name"
            label="Tên người nhận"
            rules={[
              { required: true, message: "Vui lòng nhập tên người nhận" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiver_phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiver_address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="receiver_email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập Email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="note"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Chọn trạng thái"
              allowClear
            >
              {orderStatus.map((status) => {
                // Lấy id của trạng thái hiện tại
                const currentStatus = orderStatus.find(
                  (x) =>
                    x.englishName.toLowerCase() === order.status.toLowerCase()
                );
                const currentId = currentStatus?.id || 0;

                // Kiểm tra điều kiện disable
                const isDisabled =
                  (currentId === 1 && status.id !== 8) || // Nếu "Chưa xác nhận", chỉ enable "Hủy đơn hàng"
                  (currentId === 8 && status.id !== 7) || // Nếu "Canceled", chỉ enable "Completed"
                  (currentId === 7 && status.id !== 7) || // Nếu "Completed", chỉ enable chính nó
                  (currentId !== 8 &&
                    currentId !== 7 &&
                    currentId !== 1 &&
                    (status.id < currentId || status.id === 8)); // Disable các trạng thái trước đó hoặc "Canceled"

                return (
                  <Select.Option
                    key={status.id}
                    value={status.englishName}
                    disabled={isDisabled}
                  >
                    {status.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderDetailAdmin;
