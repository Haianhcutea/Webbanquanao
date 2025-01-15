/** @format */

import React, { useState } from "react";
import { formatCurrency } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Modal, Input, Select, Button, Form, notification } from "antd";
import axios from "axios";
import { fetchAllOrderByUserId } from "../../store/cart";

const DonHang = (props) => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.cart.orderData);
  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Modal chi tiết đơn hàng
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form] = Form.useForm(); // Form chỉnh sửa đơn hàng
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false); // Modal hủy đơn hàng
  const [cancelReason, setCancelReason] = useState(""); // Lý do hủy đơn hàng
  const token = localStorage.getItem("token");

  // Hàm mở modal chi tiết đơn hàng
  const showDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalVisible(true);
  };
  // Hàm đóng modal chi tiết đơn hàng
  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedOrder(null);
  };

  // Hàm mở modal hủy đơn hàng
  const showCancelModal = (order) => {
    setSelectedOrder(order);
    setIsCancelModalVisible(true);
  };
  // Hàm đóng modal hủy đơn hàng
  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
    setCancelReason(""); // Đặt lý do hủy về rỗng khi đóng modal
  };

  // Hàm hủy đơn hàng
  const handleCancelOrder = async () => {
    try {
      if (!cancelReason) {
        notification.error({
          message: "Lý do hủy không được để trống",
        });
        return;
      }

      // Giả sử bạn sẽ gọi API để cập nhật trạng thái đơn hàng thành "Canceled"
      await axios.put(
        `http://localhost:5555/api/order/${selectedOrder.order_id}`,
        { status: "Canceled", cancel_reason: cancelReason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Cập nhật lại danh sách đơn hàng
      dispatch(fetchAllOrderByUserId({token}));
      notification.success({
        message: "Hủy đơn hàng thành công",
      });
      setIsCancelModalVisible(false);
      setCancelReason("");
    } catch (error) {
      notification.error({
        message: "Hủy đơn hàng thất bại",
        description: error.message,
      });
    }
  };

  // hàm gọi khi đã nhận được đơn hàng
  const handleReceivOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:5555/api/order/${id}`,
        { status: "Completed" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Cập nhật lại danh sách đơn hàng
      dispatch(fetchAllOrderByUserId({token}));
      notification.success({
        message: "Cập nhật đơn hàng thành công",
      });
      setIsCancelModalVisible(false);
      setCancelReason("");
    } catch (error) {
      notification.error({
        message: "Cập nhật đơn hàng thất bại",
        description: error.message,
      });
    }
  };

  // Hàm lọc đơn hàng
  const filteredOrders = orderData?.filter((order) => {
    const isSearchMatch = order.receiver_name.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = selectedStatus ? order.status === selectedStatus : true;
    return isSearchMatch && isStatusMatch;
  });

  // Tạo một hàm để ánh xạ trạng thái đơn hàng thành tên và màu sắc phù hợp
  const getStatusTag = (status) => {
    const statusData = orderStatus.find((item) => item.englishName === status);
    if (statusData) {
      let color;
      switch (statusData.englishName) {
        case "Pending":
          color = "orange";
          break;
        case "Confirmed":
          color = "blue";
          break;
        case "Paid":
          color = "green";
          break;
        case "Preparing":
          color = "yellow";
          break;
        case "Transit":
          color = "geekblue";
          break;
        case "Delivered":
          color = "green";
          break;
        case "Received":
          color = "purple";
          break;
        case "Completed":
          color = "success";
          break;
        case "Canceled":
          color = "red";
          break;
        default:
          color = "default";
          break;
      }
      return <Tag color={color}>{statusData.name}</Tag>;
    }
    return null;
  };

  return (
    <div className="myaccount-content">
      <h3>Danh sách đơn hàng</h3>

      <div className="d-flex" style={{ gap: 10 }}>
        {/* Lọc theo trạng thái đơn hàng */}
        <div className="form-control mb-3">
          <label htmlFor="">Lọc trạng thái đơn hàng</label>
          <Select value={selectedStatus} onChange={setSelectedStatus} placeholder="Chọn trạng thái" allowClear>
            {orderStatus.map((x) => (
              <Select.Option value={x.englishName}>{x.name}</Select.Option>
            ))}
          </Select>
        </div>

        {/* Tìm kiếm theo tên khách hàng */}
        <div className="form-control mb-3">
          <label htmlFor="">Tìm kiếm</label>
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm theo tên khách hàng" />
        </div>
      </div>

      <div className="myaccount-table table-responsive text-center">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Tổng cộng</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.receiver_name}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{getStatusTag(order.status)}</td>
                  <td>{formatCurrency(order.total_price)}</td>
                  <td>
                    {["Pending", "Paid"].includes(order.status) && <Button type="danger" onClick={() => showCancelModal(order)} icon={<i className="fa fa-times" aria-hidden="true"></i>}></Button>}
                    {["Delivered"].includes(order.status) && (
                      <Button type="danger" onClick={() => handleReceivOrder(order.order_id)} icon={<i className="fa fa-times" aria-hidden="true"></i>}>
                        Đã nhận
                      </Button>
                    )}
                    <button className="btn" onClick={() => showDetailModal(order)}>
                      <i className="fa fa-eye" aria-hidden="true"></i> {/* Xem chi tiết */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  Không có đơn hàng nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết đơn hàng */}
      <Modal title="Chi tiết đơn hàng" visible={isDetailModalVisible} onCancel={handleDetailCancel} footer={null}>
        {selectedOrder && (
          <div>
            <p>
              <strong>Mã đơn hàng:</strong> {selectedOrder.order_id}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {new Date(selectedOrder.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Khách hàng:</strong> {selectedOrder.receiver_name}
            </p>
            <p>
              <strong>Địa chỉ giao hàng:</strong> {selectedOrder.receiver_address}
            </p>
            <p>
              <strong>Tổng cộng:</strong> {formatCurrency(selectedOrder.total_price)}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Danh sách sản phẩm:</strong>
            </p>
            {/* Render danh sách sản phẩm nếu có */}
            <table className="table">
              <thead>
                <tr>
                  <th className="pro-title">Sản phẩm</th>
                  <th className="pro-price">Giá</th>
                  <th className="pro-quantity">Số lượng</th>
                  <th className="pro-subtotal">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items.length > 0 ? (
                  selectedOrder?.items?.map((product) =>
                    product.variants.map((variant) => (
                      <tr key={`${product.product_id}-${variant.color}-${variant.size}`}>
                        <td className="pro-title">
                          {product.name} - {variant.color} {variant.size}
                        </td>
                        <td className="pro-price">
                          <span>{formatCurrency(variant.price)}</span>
                        </td>
                        <td className="pro-quantity">
                          <div className="quantity-control">{variant.quantity}</div>
                        </td>
                        <td className="pro-subtotal">
                          <span>{formatCurrency(variant.price * variant.quantity)}</span>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <td colSpan={7} className="text-center py-5">
                    Không có sản phẩm nào trong giỏ hàng
                  </td>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      {/* Modal hủy đơn hàng */}
      <Modal title="Nhập lý do hủy đơn hàng" visible={isCancelModalVisible} onCancel={handleCancelCancel} onOk={handleCancelOrder}>
        <Form>
          <Form.Item label="Lý do hủy" name="cancelReason" rules={[{ required: true, message: "Lý do hủy không được để trống!" }]}>
            <Input.TextArea rows={4} value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DonHang;
