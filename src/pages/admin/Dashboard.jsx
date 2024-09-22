import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseProduct = await axios.get(
          "http://localhost:8080/v1/api/products"
        );
        setProduct(responseProduct.data);
        console.log(responseProduct.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchProduct();
  }, []);

  function CaculateQuantityProduct() {
    let quantity = 0;
    product.forEach((item) => {
      quantity += item.quantity;
    });
    return quantity;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card">
        <h3>Thống kê sản phẩm</h3>
        <p>Số lượng sản phẩm: {CaculateQuantityProduct()}</p>
        <a href="#" className="btn">
          Xem chi tiết
        </a>
      </div>
      <div className="card">
        <h3>Đơn hàng gần đây</h3>
        <p>Số lượng đơn hàng: 45</p>
        <a href="#" className="btn">
          Xem chi tiết
        </a>
      </div>
      <div className="card">
        <h3>Khách hàng mới</h3>
        <p>Số lượng khách hàng mới: 30</p>
        <a href="#" className="btn">
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
