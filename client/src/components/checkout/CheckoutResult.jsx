/** @format */

import React, { useEffect, useState } from "react";
import Breadcumb from "../layouts/breadcumb";
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartPayment, fetchCartDetailByUserID } from "../../store/cart";
import axios from "axios";

const CheckoutResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const userInfor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    handleGetCartByProductIdPayment();
  }, []);

  const handleGetCartByProductIdPayment = async () => {
    const cartPaymentData = JSON.parse(localStorage.getItem("cartPayment")) || null;

    try {
      console.log(cartPaymentData, "cartPayment");

      const payload = {
        app_id: cartPaymentData ? cartPaymentData.orderDetails.app_id : "",
        app_trans_id: cartPaymentData ? cartPaymentData.orderDetails.app_trans_id : "",
      };

      const res = await axios.post(`http://localhost:5555/api/check-status-order`, payload);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      localStorage.removeItem("cartPayment");
      dispatch(fetchCartDetailByUserID({ token, userId: userInfor._id }));
    }
  };

  console.log(data, "11111");

  return (
    <div>
      <Breadcumb parentTitle="Trang chủ" title="Thông báo thanh toán" />

      <div className="page-content-area my-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Kiểm tra nếu có dữ liệu trả về thì hiển thị thông báo từ dữ liệu đó */}
              {data ? (
                <Alert
                  message={data.message || "Thanh toán thành công!"}
                  description={`Cảm ơn bạn đã đặt hàng với mã giao dịch ${data?.zp_trans_id}. Tổng tiền: ${data?.order.total_price} VND. ${data?.order.description || ""} với phương thức thanh toán là ${data?.order.payment_method}`}
                  type="success"
                  showIcon
                  className="mb-4"
                  style={{ fontSize: "16px", padding: "20px" }}
                />
              ) : (
                <Alert message="Thanh toán thành công!" description="Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất." type="success" showIcon className="mb-4" style={{ fontSize: "16px", padding: "20px" }} />
              )}

              <div className="text-left">
                <Button type="primary" size="large" onClick={() => navigate("/home")}>
                  Quay về trang chủ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutResult;
