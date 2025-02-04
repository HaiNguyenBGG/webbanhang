const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Hỗ trợ đọc dữ liệu JSON từ request body

const products = [
  { id: 1, name: "Camera hành trình", price: 1200000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Cảm biến áp suất lốp", price: 850000, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bọc vô lăng cao cấp", price: 450000, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Gương chiếu hậu chống chói", price: 750000, image: "https://via.placeholder.com/150" }
];

// ✅ API danh sách sản phẩm
app.get("/api/products", (req, res) => {
  res.json({ products });
});

// ✅ API chi tiết sản phẩm
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: "❌ Sản phẩm không tồn tại" });
  }
  
  res.json(product);
});

// ✅ API đặt hàng (Demo, chưa có database)
app.post("/api/orders", (req, res) => {
  const { name, phone, address, paymentMethod, items, totalPrice } = req.body;

  if (!name || !phone || !address || !paymentMethod || !items || !totalPrice) {
    return res.status(400).json({ message: "❌ Thiếu thông tin đặt hàng" });
  }

  console.log("📦 Đơn hàng mới:", { name, phone, address, paymentMethod, items, totalPrice });
  res.status(201).json({ message: "✅ Đơn hàng đã được xác nhận!" });
});

// 🛠 Khởi chạy server
const PORT = 4040;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
