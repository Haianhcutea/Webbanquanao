const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'active' }, // 'active' or 'inactive'
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

<<<<<<< HEAD
=======
// tesst commit 



>>>>>>> ac43ae1ad6d30ea57c35b97186508f2912b2297d
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
