import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("COD");

  // 🛒 Tính tổng tiền
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🛍️ Xử lý đặt hàng
  const handlePayment = (event: React.FormEvent) => {
    event.preventDefault();
    setShowPayment(false);
    setAlertMessage("🎉 Đặt hàng thành công! Chúng tôi sẽ liên hệ bạn sớm nhất.");
    setTimeout(() => setAlertMessage(null), 3000); // Ẩn sau 3 giây
  };

  return (
    <div className="container mt-4 cart-container">
      <h2 className="text-center">🛒 Giỏ hàng của bạn</h2>

      {/* 🛑 Hiển thị thông báo thành công */}
      {alertMessage && <div className="alert alert-success text-center">{alertMessage}</div>}

      {cart.length === 0 ? (
        <p className="text-center">Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card p-3 text-center">
                  <img src={item.image} alt={item.name} className="card-img-top" />
                  <h5 className="mt-2">{item.name}</h5>
                  <p>{item.price.toLocaleString()}đ</p>

                  {/* 🔼 Nút tăng/giảm số lượng */}
                  <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-secondary me-2" onClick={() => decreaseQuantity(item.id)}>➖</button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button className="btn btn-secondary ms-2" onClick={() => increaseQuantity(item.id)}>➕</button>
                  </div>

                  <button className="btn btn-danger mt-2" onClick={() => removeFromCart(item.id)}>Xóa</button>
                </div>
              </div>
            ))}
          </div>

          {/* 🛒 Tổng tiền + Thanh toán */}
          <div className="text-center mt-4">
            <h4>Tổng tiền: <span className="text-success">{totalPrice.toLocaleString()}đ</span></h4>
            <button className="btn btn-success mt-3" onClick={() => setShowPayment(true)}>🛒 Thanh toán</button>
          </div>

          {/* 📌 Overlay khi mở form */}
          {showPayment && (
            <div className="payment-overlay" onClick={() => setShowPayment(false)}></div>
          )}

          {/* 🛍️ Form thanh toán */}
          <div className={`payment-form ${showPayment ? "active" : ""}`}>
            <span className="close-btn" onClick={() => setShowPayment(false)}>×</span>
            <h3 className="text-center">🛍️ Thanh toán</h3>
            <form onSubmit={handlePayment}>
              <label>Họ và tên:</label>
              <input type="text" className="form-control" placeholder="Nhập họ tên" required />

              <label>Địa chỉ:</label>
              <input type="text" className="form-control" placeholder="Nhập địa chỉ giao hàng" required />

              <label>Số điện thoại:</label>
              <input type="tel" className="form-control" placeholder="Nhập số điện thoại" required pattern="[0-9]{10,11}" />

              <label>Zalo (tuỳ chọn):</label>
              <input type="text" className="form-control" placeholder="Nhập số Zalo (nếu có)" />

              <label>Phương thức thanh toán:</label>
              <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="Bank">Chuyển khoản ngân hàng</option>
                <option value="E-Wallet">Thanh toán qua ví điện tử (Momo, ZaloPay,...)</option>
              </select>

              {/* 🏦 Hiển thị thông tin ngân hàng nếu chọn "Chuyển khoản ngân hàng" */}
              {paymentMethod === "Bank" && (
                <div className="bank-info mt-3">
                  <h5>Thông tin chuyển khoản:</h5>
                  <p><strong>Ngân hàng:</strong> Vietcombank</p>
                  <p><strong>Chủ tài khoản:</strong> Nguyễn Văn A</p>
                  <p><strong>Số tài khoản:</strong> 1234 5678 91011</p>
                  <p><strong>Số tiền cần chuyển:</strong> <span className="text-danger">{totalPrice.toLocaleString()}đ</span></p>
                  <img src="https://via.placeholder.com/200" alt="QR Code" className="qr-code mt-2" />
                </div>
              )}

              <button type="submit" className="btn btn-primary mt-3 w-100">✅ Xác nhận đặt hàng</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
