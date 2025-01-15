const getOrderStatuses = require("../services/orderStatus.js");

// Controller trả về danh sách trạng thái
const getOrderStatusesAPI = (req, res) => {
  try {
    const statuses = getOrderStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Error fetching order statuses:", error.message);
    res.status(500).json({ message: "Error fetching order statuses", error: error.message });
  }
};

module.exports = {
  getOrderStatusesAPI,
};