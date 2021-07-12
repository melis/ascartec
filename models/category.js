const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: { type: String, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  ],
});
module.exports = mongoose.model("Categories", categorySchema);
