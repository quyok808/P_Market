export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card">
        <h3>Thống kê sản phẩm</h3>
        <p>Số lượng sản phẩm: 120</p>
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
