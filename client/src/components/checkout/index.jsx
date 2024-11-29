/** @format */

import React, { useContext, useEffect } from "react";
import Breadcumb from "../layouts/breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio } from "antd";
import { formatCurrency, NotificationContext, openNotificationWithIcon } from "../../App";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const { totalAmount, discountAmount, shippingFee, finalTotal, coupon_code } = location.state || {};

  const api = useContext(NotificationContext);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartByUserID = useSelector((state) => state.cart);
  const userInfor = JSON.parse(localStorage.getItem("user")) ?? "";

  console.log(userInfor);

  useEffect(() => {
    const newDataReceive = {
      receiver_name: userInfor.name || "",
      receiver_phone: "", // Số điện thoại nếu có, thay "" bằng giá trị cụ thể.
      receiver_email: userInfor.email || "",
      receiver_address: userInfor.addresses[0] || "HA NOI, VIET NAM", // Lấy địa chỉ đầu tiên.
      description: "",
      note: "",
    }

    formCheckout.setFieldsValue(newDataReceive);
  }, [])
  

  const [formCheckout] = Form.useForm();

  const onSubmit = () => {
    formCheckout
      .validateFields()
      .then(async (values) => {
        const token = localStorage.getItem("token");

        if (!token) {
          openNotificationWithIcon(api, "error", "Authentication Failed", "Please log in to place an order.");
          return;
        }

        try {
          let response;
          if (values.bank_code === "cod") {
            response = await axios.post(
              `http://localhost:5555/api/place-order`,
              { ...values, coupon_code },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (response.status === 201) {
              openNotificationWithIcon(api, "success", "Order Successful", "You have successfully placed an order!");
              formCheckout.resetFields();
              navigate("/checkout-result");
            }
          } else if (values.bank_code === "zalopayapp") {
            response = await axios.post(
              `http://localhost:5555/api/place-order-zalo`,
              // { ...values, amount: cartByUserID?.total_price, coupon_code },
              { ...values, coupon_code },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (response.status === 200) {
              openNotificationWithIcon(api, "success", "Order Successful", "You have successfully placed an order!");
              // Lưu response vào localStorage để có thể lấy lại sau khi quay lại trang
              localStorage.setItem("cartPayment", JSON.stringify(response.data));
              const paymentUrl = response.data.orderDetails.paymentUrl;
              if (paymentUrl) {
                window.location.href = paymentUrl; // Redirect to ZaloPay
              }
              formCheckout.resetFields();
            }
          }
        } catch (error) {
          console.error("Error occurred:", error);
          openNotificationWithIcon(api, "error", "Order Failed", "There was an issue placing your order. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Validation Error:", err);
        openNotificationWithIcon(api, "error", "Order Failed", "Please check your values.");
      });
  };

  return (
    <div>
      <Breadcumb parentTitle={"Trang chủ"} title={"Thanh toán"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/*=======  page wrapper  =======*/}
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  {/* Checkout Form s*/}
                  <Form layout="vertical" onFinish={onSubmit} form={formCheckout} className="checkout-form">
                    <div className="row row-40">
                      {/* Billing Address */}
                      <div className="col-lg-7">
                        <div id="billing-form">
                          <h4 className="checkout-title">Thông tin thanh toán</h4>
                          <div className="row">
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_name" label="Họ tên người nhận" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                                <Input placeholder="Họ tên người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_phone" label="Số điện thoại người nhận" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                                <Input placeholder="Số điện thoại người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_email" label="Email người nhận" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                                <Input placeholder="Email người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="receiver_address" label="Địa chỉ người nhận" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
                                <Input placeholder="Địa chỉ người nhận" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="description" label="Mô tả">
                                <Input placeholder="Mô tả" />
                              </Form.Item>
                            </div>
                            <div className="col-md-6 col-md-12">
                              <Form.Item name="note" label="Ghi chú">
                                <Input placeholder="Ghi chú" />
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cart Total */}
                      <div className="col-lg-5">
                        <div className="checkout-cart-total">
                          <h4 className="checkout-title">Giỏ hàng</h4>
                          <ul>
                            {cartByUserID?.cartData?.map((product) =>
                              product.variant.map((variant) => (
                                <li key={`${product.product_id}-${variant.color}-${variant.size}`}>
                                  {product.name} x {variant.quantity} <span>{formatCurrency(variant.price * variant.quantity)}</span>
                                </li>
                              ))
                            )}
                          </ul>
                          <p>
                            Phí ship <span>+ 30.000</span>
                          </p>
                          <p>
                            Giảm giá <span>- {discountAmount}</span>
                          </p>
                          <p>
                            {/* Tổng tiền <span>{formatCurrency(cartByUserID.cartData.reduce((total, product) => total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0), 0))}</span> */}
                            Tổng tiền <span>+ {totalAmount}</span>
                          </p>
                         
                          <h4>
                            {/* Tổng cộng <span>{formatCurrency(cartByUserID.cartData.reduce((total, product) => total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0), 0))}</span> */}
                            Tổng cộng <span>{finalTotal}</span>
                          </h4>
                        </div>

                        {/* Payment Method */}
                        <div className="checkout-payment-method">
                          <h4 className="checkout-title">Phương thức thanh toán</h4>
                          <Form.Item name="bank_code" rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán" }]}>
                            <Radio.Group>
                              <Radio value="cod">COD</Radio>
                              <Radio value="momo">MoMo</Radio>
                              <Radio value="zalopayapp">Zalo Pay</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit" className="place-order">
                          Đặt hàng
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
              {/*=======  End of page wrapper  =======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
