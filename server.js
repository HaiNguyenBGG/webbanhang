const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const products = [
  { id: 1, name: "Camera hành trình", price: "1.200.000đ", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Cảm biến áp suất lốp", price: "850.000đ", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bọc vô lăng cao cấp", price: "450.000đ", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Gương chiếu hậu chống chói", price: "750.000đ", image: "https://via.placeholder.com/150" }
];

// API danh sách sản phẩm
app.get("/api/products", (req, res) => {
  res.json({ products });
});

// API chi tiết sản phẩm
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Sản phẩm không tồn tại" });
  }
  res.json(product);
});

// Khởi chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
