const Cart = require('../models/cart');
const Order = require('../models/order');

// Lấy toàn bộ đơn hàng
const getAllOrders = async (req, res) => {
  try {
    // Tìm tất cả các đơn hàng trong hệ thống, sắp xếp theo ngày đặt hàng mới nhất
    const orders = await Order.find().sort({ created_at: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      orders: orders.map(order => ({
        order_id: order._id,
        user_id: order.user_id,
        items: order.items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          img_url: item.img_url,
          variants: item.variants.map(variant => ({
            color: variant.color,
            size: variant.size,
            price: variant.price,
            quantity: variant.quantity
          }))
        })),
        total_price: order.total_price,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        receiver_address: order.receiver_address,
        note: order.note,
        status: order.status,
        payment_method: order.payment_method,
        created_at: order.created_at,
        updated_at: order.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

const placeOrder = async (req, res) => {
  const user_id = req.user._id; // Lấy user_id từ req.user (đã có middleware auth)
  const {
    receiver_name,
    receiver_phone,
    receiver_email,
    receiver_address,
    note,
  } = req.body;

  try {
    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ user_id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // Tạo đơn hàng từ giỏ hàng
    const newOrder = new Order({
      user_id,
      items: cart.items, // Lấy các sản phẩm từ giỏ hàng
      total_price: cart.total_price, // Tổng giá trị đơn hàng
      receiver_name,
      receiver_phone,
      receiver_email,
      receiver_address,
      note, // Ghi chú đơn hàng
    });

    // Lưu đơn hàng
    await newOrder.save();

    // Xóa giỏ hàng sau khi đặt hàng thành công (nếu cần)
    await Cart.findOneAndDelete({ user_id });

    return res
      .status(201)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error.message);
    return res
      .status(500)
      .json({ message: 'Error placing order', error: error.message });
  }
};

// Lấy danh sách đơn hàng của người dùng
const getUserOrders = async (req, res) => {
  const user_id = req.user._id; // Lấy user_id từ req.user (đã có middleware auth)

  try {
    // Tìm tất cả các đơn hàng thuộc về người dùng hiện tại
    const orders = await Order.find({ user_id }).sort({ created_at: -1 }); // Sắp xếp theo ngày đặt hàng mới nhất

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Trả về danh sách đơn hàng
    res.status(200).json({
      orders: orders.map(order => ({
        order_id: order._id,
        items: order.items.map(item => ({
          product_id: item.product_id,
          name: item.name,
          img_url: item.img_url,
          variants: item.variants.map(variant => ({
            color: variant.color,
            size: variant.size,
            price: variant.price,
            quantity: variant.quantity
          }))
        })),
        total_price: order.total_price,
        receiver_name: order.receiver_name,
        receiver_phone: order.receiver_phone,
        receiver_email: order.receiver_email,
        receiver_address: order.receiver_address,
        note: order.note,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};


// Cập nhật thông tin đơn hàng
const updateOrder = async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ params
  const { receiver_name, receiver_phone, receiver_email, receiver_address, note, status } = req.body; // Lấy thông tin từ body

  try {
    // Tìm đơn hàng theo ID
    const order = await Order.findById(orderId);

    // Nếu không tìm thấy đơn hàng
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Cập nhật các thông tin đơn hàng
    order.receiver_name = receiver_name || order.receiver_name;
    order.receiver_phone = receiver_phone || order.receiver_phone;
    order.receiver_email = receiver_email || order.receiver_email;
    order.receiver_address = receiver_address || order.receiver_address;
    order.note = note || order.note;
    order.status = status || order.status;

    // Lưu lại thay đổi
    const updatedOrder = await order.save();

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrder
};
