const mongoose = require('mongoose');

// Mô hình chi tiết từng biến thể sản phẩm trong đơn hàng tạm thời
const pendingOrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  img_url: { type: String },
  variants: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

// Mô hình đơn hàng tạm thời (PendingOrder)
const pendingOrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Liên kết tới người dùng
  transID: { type: String, required: true, unique: true }, // ID giao dịch duy nhất
  items: [pendingOrderItemSchema], // Các sản phẩm và biến thể trong đơn hàng
  total_price: { type: Number, required: true }, // Tổng tiền của đơn hàng
  discount: { type: Number, default: 0 }, // Giá trị giảm giá
  coupon_code: { type: String, default: null }, // Mã giảm giá
  receiver_name: { type: String, required: true }, // Tên người nhận
  receiver_phone: { type: String, required: true }, // Số điện thoại người nhận
  receiver_email: { type: String, required: true }, // Email người nhận
  receiver_address: { type: String, required: true }, // Địa chỉ nhận hàng
  note: { type: String }, // Ghi chú đơn hàng (nếu có)
  payment_method: { type: String, default: 'COD' }, // Phương thức thanh toán (COD, ZaloPay, etc.)
  created_at: { type: Date, default: Date.now }, // Ngày tạo đơn hàng tạm thời
});

const PendingOrder = mongoose.model('PendingOrder', pendingOrderSchema);

module.exports = PendingOrder;
