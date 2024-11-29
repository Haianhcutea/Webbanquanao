const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Mã giảm giá
  discount: { type: Number, required: true }, // Phần trăm giảm giá (0-100)
  maxDiscount: { type: Number, required: true }, // Số tiền giảm tối đa
  expirationDate: { type: Date, required: true }, // Ngày hết hạn
  isActive: { type: Boolean, default: true }, // Trạng thái mã
  usageLimit: { type: Number, default: null }, // Số lần sử dụng tối đa (null = không giới hạn)
  usedCount: { type: Number, default: 0 } // Số lần đã sử dụng
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
    