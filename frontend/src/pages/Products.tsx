import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: string; // Giá từ API là string
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // 🔍 State cho tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const { addToCart } = useCart();

  // 🛍️ Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetch("http://localhost:4040/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Ban đầu hiển thị tất cả sản phẩm
      })
      .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
  }, []);

  // 🔍 Xử lý tìm kiếm sản phẩm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products); // Nếu rỗng, hiển thị tất cả sản phẩm
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // 🛒 Thêm vào giỏ hàng
  const handleAddToCart = useCallback((product: Product) => {
    const added = addToCart({
      id: product.id,
      name: product.name,
      price: typeof product.price === "string" ? Number(product.price.replace(/\D/g, "")) : product.price,
      image: product.image,
    });

    if (!added) {
      setMessage({ text: "⚠️ Sản phẩm đã có trong giỏ hàng!", type: "danger" });
    } else {
      setMessage({ text: "✅ Đã thêm vào giỏ hàng!", type: "success" });
    }

    setTimeout(() => setMessage(null), 3000);
  }, [addToCart]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Danh sách sản phẩm</h2>

      {/* 🔍 Ô tìm kiếm */}
      <div className="search-container text-center mb-3">
        <input
          type="text"
          className="form-control search-input"
          placeholder="🔍 Nhập tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🛑 Hiển thị thông báo */}
      {message && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}

      {/* 🔎 Nếu không có sản phẩm phù hợp */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-danger">❌ Không tìm thấy sản phẩm nào!</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card p-3 text-center">
                <img src={product.image} alt={product.name} className="card-img-top" />
                <h5 className="mt-2">{product.name}</h5>
                <p>{product.price}</p>
                <div className="button-group">
                  <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                    Mua ngay
                  </button>
                  <Link to={`/product/${product.id}`} className="btn btn-info">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
