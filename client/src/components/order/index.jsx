/** @format */

import React, { useState } from "react";
import Breadcumb from "../layouts/breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../App";
import { AutoComplete, Button, Select, message } from "antd";
import axios from "axios";
import { fetchAllOrderByUserId, fetchCartDetailByUserID } from "../../store/cart";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const cartByUserID = useSelector((state) => state.cart);
  const lstCoupons = useSelector((state) => state.adminGetList.listCoupons);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Tính tổng tiền giỏ hàng
  const totalCartAmount = cartByUserID.cartData.reduce((total, product) => total + product.variant.reduce((subtotal, variant) => subtotal + variant.price * variant.quantity, 0), 0);

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      message.error("Vui lòng chọn mã giảm giá hợp lệ");
      return;
    }
  
    const coupon = lstCoupons.find((coupon) => coupon.code === selectedCoupon);
    if (coupon) {
      const calculatedDiscount = (totalCartAmount * coupon.discount) / 100;
      const finalDiscount = calculatedDiscount <= coupon.maxDiscount ? calculatedDiscount : coupon.maxDiscount;
  
      setDiscountAmount(finalDiscount);
      message.success("Mã giảm giá đã được áp dụng!");
    } else {
      message.error("Mã giảm giá không hợp lệ!");
    }
  };
  

  //
  const handleQuantityChange = async (product_id, color, size, newQuantity) => {
    if (newQuantity < 1) return; // Ngăn giảm số lượng xuống dưới 1.

    const payload = {
      product_id,
      variant: { color, size, quantity: newQuantity },
    };

    try {
      const response = await axios.put("http://localhost:5555/api/cart/update", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token trong header
        },
      });

      if (response.status === 200) {
        message.success("Số lượng sản phẩm đã được cập nhật.");
        // Dispatch action để cập nhật lại Redux
      } else {
        message.error("Không thể cập nhật số lượng.");
      }
    } catch (error) {
      message.error("Lỗi kết nối. Vui lòng thử lại.");
      console.error("Error updating quantity:", error);
    } finally {
      dispatch(fetchCartDetailByUserID({ token }));
    }
  };

  const handleDeleteItem = async (product_id, color, size) => {
    const payload = {
      product_id,
      variant: { color, size },
    };

    try {
      const response = await axios.delete("http://localhost:5555/api/cart/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload, // `data` trong DELETE dùng để gửi payload
      });

      if (response.status === 200) {
        message.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
        // Dispatch action để cập nhật Redux
      } else {
        message.error("Không thể xóa sản phẩm.");
      }
    } catch (error) {
      message.error("Lỗi khi kết nối tới server. Vui lòng thử lại.");
      console.error("Error deleting item:", error);
    } finally {
      dispatch(fetchCartDetailByUserID({ token }));
    }
  };

  // kiem tra ma giam gia
  const checkCouponStatus = async (couponCode) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/coupons/check-status",
        { code: couponCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        const { coupon } = response.data;
        message.success(`Mã giảm giá hợp lệ: ${coupon.code}`);
        setSelectedCoupon(couponCode); // Lưu mã giảm giá
      } else {
        message.error("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
        setSelectedCoupon(null);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái mã giảm giá:", error);
      message.error("Không thể kiểm tra trạng thái mã giảm giá. Vui lòng thử lại.");
      setSelectedCoupon(null);
    }
  };
  
  

  return (
    <div>
      <Breadcumb parentTitle={"Trang chủ"} title={"Giỏ hàng"} />

      <div className="page-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-wrapper">
                <div className="page-content-wrapper">
                  <form action="#">
                    <div className="cart-table table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="pro-thumbnail">Ảnh</th>
                            <th className="pro-title">Sản phẩm</th>
                            <th className="pro-price">Giá</th>
                            <th className="pro-quantity">Số lượng</th>
                            <th className="pro-subtotal">Tổng</th>
                            <th className="pro-remove">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartByUserID?.cartData.length > 0 ? (
                            cartByUserID?.cartData?.map((product) =>
                              product.variant.map((variant) => (
                                <tr key={`${product.product_id}-${variant.color}-${variant.size}`}>
                                  <td className="pro-thumbnail">
                                    <img src={`http://localhost:5555${product.img_url}`} width={80} height={106} className="img-fluid" alt={product.name} />
                                  </td>
                                  <td className="pro-title">
                                    {product.name} - {variant.color} {variant.size}
                                  </td>
                                  <td className="pro-price">
                                    <span>{formatCurrency(variant.price)}</span>
                                  </td>
                                  <td className="pro-quantity">
                                    <div className="quantity-control">
                                      <button
                                        className="btn "
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleQuantityChange(product.product_id, variant.color, variant.size, variant.quantity - 1);
                                        }}
                                        disabled={variant.quantity <= 1}>
                                        -
                                      </button>
                                      <input type="number" value={variant.quantity} readOnly style={{ width: "50px", textAlign: "center", background: "#ebebeb" }} />
                                      <button
                                        className="btn "
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleQuantityChange(product.product_id, variant.color, variant.size, variant.quantity + 1);
                                        }}>
                                        +
                                      </button>
                                    </div>
                                  </td>

                                  <td className="pro-subtotal">
                                    <span>{formatCurrency(variant.price * variant.quantity)}</span>
                                  </td>
                                  <td className="pro-remove">
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteItem(product.product_id, variant.color, variant.size);
                                      }}>
                                      <i className="fa fa-trash-o" />
                                    </a>
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
                  </form>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="discount-coupon">
                        <h4>Mã giảm giá</h4>
                        <div className="row">
                          <div className="col-md-6 col-12">
                          <AutoComplete
  placeholder="Chọn mã giảm giá"
  onChange={(value) => {
    setSelectedCoupon(value);
  }}
  onSelect={(value) => checkCouponStatus(value)} // Kiểm tra trạng thái khi chọn
  style={{ width: "100%" }}
  options={lstCoupons.map((item) => ({
    value: item.code,
    label: `${item.code} - Giảm ${item.discount}% (Tối đa ${formatCurrency(item.maxDiscount)} VNĐ)`,
  }))}
/>


                          </div>
                          <div className="col-md-6 col-12">
                            <Button type="primary" onClick={handleApplyCoupon} disabled={selectedCoupon === null}>
                              Áp dụng mã
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12 d-flex">
                      <div className="cart-summary">
                        <div className="cart-summary-wrap">
                          <h4>Tổng giỏ hàng</h4>
                          <p>
                            Tổng tiền <span>{formatCurrency(totalCartAmount)}</span>
                          </p>

                          <p>
                            Phí ship <span>30.000 VNĐ</span>
                          </p>
                          <p>
                            Giảm giá <span>-{formatCurrency(discountAmount)}</span>
                          </p>
                          <h2>
                            Tổng cộng <span>{formatCurrency(totalCartAmount - discountAmount + 30000)}</span>
                          </h2>
                        </div>
                        <div className="cart-summary-button">
                          <button
                            className="checkout-btn"
                            onClick={() => {
                              if (cartByUserID?.cartData.length > 0) {
                                navigate("/checkout", {
                                  state: {
                                    coupon_code: selectedCoupon,
                                    totalAmount: formatCurrency(totalCartAmount),
                                    discountAmount: formatCurrency(discountAmount),
                                    shippingFee: 30000, // Phí ship cố định
                                    finalTotal: formatCurrency(totalCartAmount - discountAmount + 30000), // Tổng cộng
                                  },
                                });
                              } else {
                                alert("Giỏ hàng không có sản phẩm để thanh toán");
                              }
                            }}>
                            Thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
