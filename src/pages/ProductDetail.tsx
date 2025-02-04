import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: string; // Dữ liệu từ API là string
  image: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      const added = addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price.replace(/\D/g, "")), // Chuyển "1.200.000đ" -> 1200000
        image: product.image,
      });

      if (!added) {
        setMessage({ text: "⚠️ Sản phẩm đã có trong giỏ hàng!", type: "danger" });
      } else {
        setMessage({ text: "✅ Đã thêm vào giỏ hàng!", type: "success" });
      }

      // Ẩn thông báo sau 3 giây
      setTimeout(() => setMessage(null), 3000);
    }
  }, [product, addToCart]);

  if (!product) return <h2 className="text-center mt-4">Sản phẩm không tồn tại!</h2>;

  return (
    <div className="container mt-4 text-center">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="img-fluid" />
      <p>{product.price}</p>

      {message && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}

      <button className="btn btn-success" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductDetail;
