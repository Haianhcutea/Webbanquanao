const Cart = require('../models/cart');
const Product = require('../models/product');
const addToCart = async (req, res) => {
  const user_id = req.user._id; // Lấy user_id từ req.user (đã có middleware auth)
  const { product_id, variant } = req.body; // `variant` là mảng các biến thể sản phẩm
  try {
    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ user_id });
    // Nếu chưa có giỏ hàng, tạo mới
    if (!cart) {
      cart = new Cart({ user_id, items: [] });
    }
    // Tìm sản phẩm trong giỏ hàng
    const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật biến thể
      variant.forEach(v => {
        const existingVariantIndex = cart.items[existingItemIndex].variants.findIndex(
          item => item.color === v.color && item.size === v.size
        );
        if (existingVariantIndex !== -1) {
          // Nếu biến thể đã tồn tại, cập nhật số lượng và giá trị
          cart.items[existingItemIndex].variants[existingVariantIndex].quantity += v.quantity;
        } else {
          // Nếu biến thể chưa có, thêm mới biến thể vào sản phẩm
          cart.items[existingItemIndex].variants.push(v);
        }
      });
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm cùng với các biến thể
      const newItem = {
        product_id,
        name: product.name,
        img_url: product.image[0]?.img_url || '', // Lấy ảnh đầu tiên (nếu có)
        variants: variant // Mảng biến thể được gửi từ client
      };
      cart.items.push(newItem);
    }
    // Cập nhật tổng tiền và tổng số lượng biến thể trong giỏ hàng
    cart.total_price = cart.items.reduce((total, item) => {
      return total + item.variants.reduce((variantTotal, v) => variantTotal + v.price * v.quantity, 0);
    }, 0);
    cart.total_items = cart.items.reduce((total, item) => {
      return total + item.variants.reduce((variantTotal, v) => variantTotal + v.quantity, 0);
    }, 0);
    // Lưu giỏ hàng
    await cart.save();
    return res.status(200).json({ message: 'Added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    return res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};
module.exports = {
  addToCart
};