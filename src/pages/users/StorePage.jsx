import Layout from "../../Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StorePage() {
  const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Sử dụng useEffect để gọi API khi component được mount
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/v1/api/products"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };

      fetchProducts();
    }, []);

    // Hàm xử lý khi nhấn vào nút "Mua"
    const handleBuyNow = (product) => {
      alert(`Bạn đã mua sản phẩm: ${product.name}`);
      // Thêm các logic xử lý khi người dùng mua sản phẩm
    };

    // Hàm xử lý khi nhấn vào nút "Thêm vào giỏ hàng"
    const handleAddToCart = (product) => {
      alert(`Sản phẩm ${product.name} đã được thêm vào giỏ hàng`);
      // Thêm các logic xử lý khi người dùng thêm sản phẩm vào giỏ hàng
    };

    return (
      <div>
        <div className="container-storePage">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={`http://localhost:8080/Product_images/${product.image}`}
                alt="Sản phẩm 1"
              />
              <div className="product-info">
                <h2>Mã SP: {product.id}</h2>
                <p>Tên sản phẩm: {product.name}</p>
                <p className="price">Giá: {product.price} VND</p>
                <p>Mô tả: {product.description}</p>
                <p>Số lượng: {product.quantity}</p>
                <p>Loại: {product.category?.name}</p>
                <div className="product-actions">
                  {/* Nút Mua */}
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="buy-now-btn"
                  >
                    Mua
                  </button>
                  {/* Nút Thêm vào giỏ hàng */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return <Layout component={ProductList()} />;
}
