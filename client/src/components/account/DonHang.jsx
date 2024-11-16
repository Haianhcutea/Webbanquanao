/** @format */
import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../App";
import { useSelector } from "react-redux";
import { Tag } from "antd";
import axios from "axios";
const DonHang = (props) => {
  const { activeTab } = props;
  const cartPayment = useSelector((state) => state.cart.cartPayment);
  const [data, setData] = useState([]);
  console.log(activeTab, "activeTab");
  useEffect(() => {
    if (activeTab === "orders") {
      handleGetCartByProducrIdPayment(); // Chỉ gọi API khi tab là "Đơn hàng"
    }
  }, [activeTab]);
  const handleGetCartByProducrIdPayment = async () => {
    try {
      const payload = {
        app_id: cartPayment.order.app_id,
        app_trans_id: cartPayment.order.app_trans_id,
      };
      const res = await axios.post(`http://localhost:5555/api/check-status-order`, payload);
      console.log(res);
      if (res.status === 200) {
        const { data } = res.data;
        console.log("data", data);
        setData(data);
      }
    } catch (error) {}
  };
  return (
    <div className="myaccount-content">
      <h3>Danh sách đơn hàng</h3>
      <div className="myaccount-table table-responsive text-center">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Tổng cộng</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.receiver_name}</td>
                <td> {new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <Tag color={order.status === "pending" ? "orange" : order.status === "completed" ? "green" : "red"}>{order.status.toUpperCase()}</Tag>
                </td>
                <td>{formatCurrency(order.total_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DonHang;