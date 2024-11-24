const getOrderStatuses = () => {
    return [
      { id: 1, name: "Chưa xác nhận", englishName: "Pending" },
      { id: 2, name: "Đã xác nhận", englishName: "Confirmed" },
      { id: 3, name: "Đã thanh toán", englishName: "Paid" },
      { id: 4, name: "Chuẩn bị hàng", englishName: "Preparing" },
      { id: 5, name: "Đang giao", englishName: "Transit" },
      { id: 6, name: "Đã giao", englishName: "Delivered" },
      { id: 7, name: "Đã nhận", englishName: "Received" },
      { id: 8, name: "Đơn hàng thành công", englishName: "Completed" },
      { id: 9, name: "Hủy đơn hàng", englishName: "Canceled" },
    ];
  };
  
  module.exports = getOrderStatuses;