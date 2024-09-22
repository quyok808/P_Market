import axios from "axios";
import { useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function OrderList({ orders }) {
  const [selectionStatus, setSelectionStatus] = useState({
    status: "canceled", // Set default value to prevent undefined error
  });
  const statuses = [
    { id: "done", status: "Đã giao" },
    { id: "ondelivery", status: "Đang giao" },
    { id: "confirming", status: "Chờ xác nhận" },
    { id: "canceled", status: "Đã huỷ" },
    { id: "cancelrequest", status: "Yêu cầu huỷ" },
  ];

  function notifyUser(textnotify) {
    Toastify({
      text: textnotify,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "right",
      backgroundColor: "#D1E9F6",
      style: {
        color: "black",
      },
    }).showToast();
  }

  function handleDateTime(orderDate) {
    const dateString = orderDate;
    const validDateString = dateString.split(".")[0]; // Remove microseconds
    const date = new Date(validDateString); // Create a valid Date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} - ${formattedTime}`;
  }

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const formatterPaymentMethod = (paymentMethod) => {
    const paymentID = ["momo", "cash", "bankTransfer"];
    const paymentName = [
      "Momo",
      "Thanh toán khi nhận hàng",
      "Chuyển khoản ngân hàng",
    ];

    const index = paymentID.indexOf(paymentMethod);
    return index !== -1 ? paymentName[index] : "Unknown";
  };

  const handleStatusChange = (e) => {
    const selectedId = e.target.value;
    setSelectionStatus({ status: selectedId });
  };

  const handleUpdateStatus = async (id, e) => {
    e.preventDefault();
    if (!selectionStatus.status) {
      notifyUser("Please select a valid status.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/order/orderstatus/${id}`,
        null,
        { params: { status: selectionStatus.status } }
      );
      console.log(response.data);
      notifyUser("Đã cập nhật trạng thái thành công !!!");
    } catch (error) {
      console.log("Error: ", error);
    }
    window.location.reload();
  };

  const handleCanceledOrder = async (id, e) => {
    e.preventDefault();
    const cancel = "canceled";
    setSelectionStatus({ status: cancel });
    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/order/orderstatus/${id}`,
        null,
        { params: { status: cancel } }
      );
      console.log(response.data);
      notifyUser("Duyệt thành công !!!");
    } catch (error) {
      console.log("Error: ", error);
    }
    window.location.reload();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Email</th>
          <th>Tổng tiền hoá đơn</th>
          <th>Phương thức thanh toán</th>
          <th>Trạng thái</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customername}</td>
            <td>{handleDateTime(order.orderdate)}</td>
            <td>{order.email}</td>
            <td>{formatter.format(order.total)}</td>
            <td>{formatterPaymentMethod(order.paymentMethod)}</td>
            <td>
              <select
                name="status"
                defaultValue={order.status}
                onChange={handleStatusChange}
                className="input"
                required
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.status}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <div className="button-container-orderlist">
                <button
                  onClick={(event) => handleUpdateStatus(order.id, event)}
                >
                  Cập nhật trạng thái
                </button>

                <button
                  onClick={(event) => handleCanceledOrder(order.id, event)}
                >
                  Duyệt huỷ đơn hàng
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
