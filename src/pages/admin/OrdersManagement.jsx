import OrderList from "../../components/ordersManagement/OrdersList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchOrder from "../../components/ordersManagement/SearchOrder";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filterOrder, setFilterOrder] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/api/order");
        setOrders(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Quản lý Đơn Hàng</h1>
      <SearchOrder orders={orders} filterOrder={setFilterOrder} />
      <OrderList orders={filterOrder} />
    </div>
  );
}
