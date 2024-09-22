import Layout from "../../Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../components/homePage/cart/CartContext";

export default function StorePage() {
  const { addProductToCart } = useCart();
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
                  <button
                    onClick={() => addProductToCart(product)}
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
