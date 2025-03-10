import React, { useEffect, useState } from "react";

export default function SearchOrder({ orders, filterOrder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchPaymentMethod, setSearchPaymentMethod] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const statuses = [
    { id: "done", status: "Đã giao" },
    { id: "ondelivery", status: "Đang giao" },
    { id: "confirming", status: "Chờ xác nhận" },
    { id: "canceled", status: "Đã huỷ" },
    { id: "cancelrequest", status: "Yêu cầu huỷ" },
  ];
  const paymentMethod = [
    { id: "momo", method: "Momo" },
    { id: "cash", method: "Thanh toán khi nhận hàng" },
    { id: "bankTransfer", method: "Chuyển khoản ngân hàng" },
  ];

  useEffect(() => {
    const filteredOrders = orders.filter((order) => {
      const customerMatch = order.customername
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const dateMatch = searchDate
        ? new Date(order.orderdate).toISOString().slice(0, 10) === searchDate
        : true;

      const paymentMethodMatch = searchPaymentMethod
        ? order.paymentMethod === searchPaymentMethod
        : true;

      const statusMatch = searchStatus
        ? order.status.toLowerCase().includes(searchStatus.toLowerCase())
        : true;

      return customerMatch && dateMatch && paymentMethodMatch && statusMatch;
    });

    filterOrder(filteredOrders); // Update the filtered orders state in parent component
  }, [
    searchTerm,
    searchDate,
    searchPaymentMethod,
    searchStatus,
    orders,
    filterOrder,
  ]);

  return (
    <div className="search-filters">
      <label>Tên khách hàng:</label>
      <input
        type="text"
        placeholder="Tên khách hàng"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      |<label>Ngày đặt hàng:</label>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="search-input"
      />
      |<label>Phương thức thanh toán:</label>
      <select
        value={searchPaymentMethod}
        onChange={(e) => setSearchPaymentMethod(e.target.value)}
        className="search-select"
      >
        <option value="">Tất cả phương thức</option>
        {paymentMethod.map((payment) => (
          <option key={payment.id} value={payment.id}>
            {payment.method}
          </option>
        ))}
      </select>
      <label>Trạng thái:</label>
      <select
        value={searchStatus}
        onChange={(e) => setSearchStatus(e.target.value)}
        className="search-select"
      >
        <option value="">Tất cả trạng thái</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.status}
          </option>
        ))}
      </select>
    </div>
  );
}
