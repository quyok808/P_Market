export default function OrderList({ orders }) {
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

    // Format the date as dd/MM/yyyy
    const formattedDate = `${day}/${month}/${year}`;
    // Format the time as hh:mm:ss
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} - ${formattedTime}`;
  }

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Email</th>
          <th>Tổng tiền hoá đơn</th>
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
            <td>Đang giao hàng</td>
            <td>Cập nhật</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
