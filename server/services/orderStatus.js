const getOrderStatuses = () => {
    return [
      { id: 1, name: "Chưa xác nhận", englishName: "Pending" },
      { id: 2, name: "Đã xác nhận", englishName: "Confirmed" },
      { id: 3, name: "Chuẩn bị hàng", englishName: "Preparing" },
      { id: 4, name: "Đang giao", englishName: "Transit" },
      { id: 5, name: "Đã giao", englishName: "Delivered" },
      { id: 6, name: "Đã nhận", englishName: "Received" },
      { id: 7, name: "Đơn hàng thành công", englishName: "Completed" },
      { id: 8, name: "Hủy đơn hàng", englishName: "Canceled" },
    ];
  };
  
  module.exports = getOrderStatuses;