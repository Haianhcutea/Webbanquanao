const Coupon = require('../models/coupon');

const createCoupon = async (req, res) => {
  const { code, discount, maxDiscount, expirationDate, isActive, usageLimit } = req.body;

  try {
    const coupon = new Coupon({
      code,
      discount,
      maxDiscount,
      expirationDate,
      isActive,
      usageLimit
    });

    await coupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon });
  } catch (error) {
    console.error('Error creating coupon:', error.message);
    res.status(500).json({ message: 'Error creating coupon', error: error.message });
  }
};


const getCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.status(200).json(coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error.message);
      res.status(500).json({ message: 'Error fetching coupons', error: error.message });
    }
  };



const getCouponById = async (req, res) => {
const { id } = req.params;

try {
    const coupon = await Coupon.findById(id);

    if (!coupon) {
    return res.status(404).json({ message: 'Coupon not found' });
    }

    res.status(200).json(coupon);
} catch (error) {
    console.error('Error fetching coupon:', error.message);
    res.status(500).json({ message: 'Error fetching coupon', error: error.message });
}
};
  

const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { code, discount, maxDiscount, expirationDate, isActive, usageLimit } = req.body;
  
    try {
      const coupon = await Coupon.findById(id);
  
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      coupon.code = code || coupon.code;
      coupon.discount = discount || coupon.discount;
      coupon.maxDiscount = maxDiscount || coupon.maxDiscount;
      coupon.expirationDate = expirationDate || coupon.expirationDate;
      coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;
      coupon.usageLimit = usageLimit !== undefined ? usageLimit : coupon.usageLimit;
  
      await coupon.save();
      res.status(200).json({ message: 'Coupon updated successfully', coupon });
    } catch (error) {
      console.error('Error updating coupon:', error.message);
      res.status(500).json({ message: 'Error updating coupon', error: error.message });
    }
  };

  
  const deleteCoupon = async (req, res) => {
    const { id } = req.params;
  
    try {
      const coupon = await Coupon.findByIdAndDelete(id);
  
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      console.error('Error deleting coupon:', error.message);
      res.status(500).json({ message: 'Error deleting coupon', error: error.message });
    }
  };

  
  const checkCouponStatus = async (req, res) => {
    const { code } = req.body;
  
    try {
      // Tìm mã giảm giá dựa trên `code`
      const coupon = await Coupon.findOne({ code });
  
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
  
      // Kiểm tra xem mã giảm giá đã hết hạn chưa
      if (new Date(coupon.expirationDate) < new Date()) {
        return res.status(400).json({ message: 'Coupon has expired' });
      }
  
      // Kiểm tra trạng thái kích hoạt của mã
      if (!coupon.isActive) {
        return res.status(400).json({ message: 'Coupon is inactive' });
      }
  
      // Kiểm tra số lần sử dụng (nếu có giới hạn)
      if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({ message: 'Coupon usage limit reached' });
      }
  
      // Mã giảm giá hợp lệ
      res.status(200).json({
        message: 'Coupon is valid',
        coupon: {
          code: coupon.code,
          discount: coupon.discount,
          maxDiscount: coupon.maxDiscount,
          expirationDate: coupon.expirationDate,
          isActive: coupon.isActive,
          usageLimit: coupon.usageLimit,
          usedCount: coupon.usedCount
        }
      });
    } catch (error) {
      console.error('Error checking coupon status:', error.message);
      res.status(500).json({ message: 'Error checking coupon status', error: error.message });
    }
  };

  module.exports = {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    checkCouponStatus,
  };