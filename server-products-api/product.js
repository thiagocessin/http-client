const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = new Schema({
    name:String,
    department:String,
    price: Number
});

module.exports = mongoose.model("Product", productSchema);
