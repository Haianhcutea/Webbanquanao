const express = require('express');

const { registerUser, loginUser, getUserById, registerAdmin, getUsers, updateUser, deleteUser  } = require('../controllers/authController');
=======
const { registerUser, loginUser, getUserById } = require('../controllers/authController');

const { addCategory, getCategories, updateCategory, softDeleteCategory } = require('../controllers/categoryController');
const { addProduct, getProductById, getProductsByCategory,  getAllProducts, updateProduct, softDeleteProduct } = require('../controllers/productController');
const { addToCart, getCartDetails, updateCart, deleteVariantFromCart } = require('../controllers/cartController');
const { placeOrder, getUserOrders, getAllOrders, updateOrder, createZaloPayOrder, handleZaloPayCallback, checkOrderStatus } = require('../controllers/orderController.js');

const { createCoupon, getCoupons, getCouponsUser, getCouponById, updateCoupon, deleteCoupon, checkCouponStatus, } = require('../controllers/couponController.js');
=======
const { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon, checkCouponStatus, } = require('../controllers/couponController.js');

const { getOrderStatusesAPI } = require('../controllers/statusOrder.js');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = require('../config/multerConfig'); // Cấu hình multer để upload file

const router = express.Router();

// QUẢN LÝ NGƯỜI DÙNG
// Route đăng ký người dùng
router.post('/auth/register', registerUser);

// Route đăng nhập người dùng
router.post('/auth/login', loginUser);

// Lấy thông tin người dùng theo id
router.get('/users/:id', getUserById);

// Thêm tài khoản admin
router.post('/auth/register-admin', registerAdmin);
// Lấy danh sách người dùng 
router.get('/users', getUsers);
// Sửa thông tin người dùng
router.put('/users/:id', updateUser);
// Xóa mềm người dùng 
router.delete('/users/:id', deleteUser);
=======

// Lấy thông tin người dùng theo id
router.get('/users/:id', getUserById);


// QUẢN LÝ DANH MỤC
// Route thêm danh mục mới
router.post('/categories/add', addCategory);

// Route lấy tất cả danh mục (chỉ danh mục 'active')
router.get('/categories/', getCategories);

// Route cập nhật danh mục
router.put('/categories/update/:id', updateCategory);

// Route xóa mềm danh mục
router.delete('/categories/delete/:id', softDeleteCategory);

// QUẢN LÝ SẢN PHẨM
// Route thêm sản phẩm mới
router.post('/product/add', upload.array('images', 10), addProduct);

// Route sửa sản phẩm
router.put('/product/update/:id', upload.array('images', 10), updateProduct);

// Route lấy sản phẩm theo ID
router.get('/product/:id', getProductById);

// Route lấy sản phẩm theo danh mục
router.get('/product-category/:categoryId', getProductsByCategory);

// Route lấy tất cả sản phẩm (chỉ sản phẩm 'active')
router.get('/product/', getAllProducts);

// Route cập nhật sản phẩm
router.put('/product/update/:id', updateProduct);

// Route xóa mềm sản phẩm
router.delete('/product/delete/:id', softDeleteProduct);



// GIỎ HÀNG - CART
// Thêm giỏ hàng
router.post('/add-to-cart', authMiddleware, addToCart);

// list giỏ hàng
router.get('/cart', authMiddleware, getCartDetails);

// Sửa giỏ hàng
router.put('/cart/update', authMiddleware, updateCart);

// Xóa sản phẩm trong giỏ hàng
router.delete('/cart/delete', authMiddleware, deleteVariantFromCart);


// ĐƠN HÀNG 
// đặt hàng  
router.post('/place-order', authMiddleware, placeOrder);


// đặt hàng  
router.post('/place-order-zalo', authMiddleware, createZaloPayOrder);


// Route callback ZaloPay
router.post('/callback', handleZaloPayCallback);

// Route kiểm tra trạng thái đơn hàng
router.post('/check-status-order', checkOrderStatus);

// lấy danh sách đơn hàng của người dùng
router.get('/orders', authMiddleware, getUserOrders);

// Admin lấy toàn bộ đơn hàng
router.get('/all-orders', getAllOrders);

// Route cập nhật đơn hàng
router.put('/order/:orderId', authMiddleware, updateOrder);


// TRẠNG THÁI ĐƠN HÀNG

router.get('/all-status', getOrderStatusesAPI);


// MÃ GIẢM GIÁ

// Tạo mã giảm giá
router.post('/coupons/create', createCoupon);


// Lấy danh sách mã giảm giá cho admin
router.get('/coupons/', getCoupons);

// Lấy danh sách mã giảm giá cho người dùng
router.get('/coupons-user/', getCouponsUser);

=======
// Lấy danh sách mã giảm giá
router.get('/coupons/', getCoupons);

// Lấy mã giảm giá cụ thể
router.get('/coupons/:id', getCouponById);

// Cập nhật mã giảm giá
router.put('/coupons/:id', updateCoupon);

// Xóa mã giảm giá
router.delete('/coupons/:id', deleteCoupon);



// Kiểm tra tình trạng mã giảm giá
router.post('/coupons/check-status', checkCouponStatus);


// Kiểm tra tình trạng mã giảm giá
router.post('/coupons/check-status', checkCouponStatus);

module.exports = router;