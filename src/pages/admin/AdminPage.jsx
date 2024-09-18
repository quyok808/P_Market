import Layout from "../../Layout";
import "../../../public/css/adminPage/adminpage.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminPage() {
  function content() {
    return (
      <div>
        <div className="container1">
          <div className="sidebar">
            <h2>Quản lý Admin</h2>
            <ul>
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/product-management">Sản phẩm</Link>
              </li>
              <li>
                <a href="#">Đơn hàng</a>
              </li>
              <li>
                <a href="#">Khách hàng</a>
              </li>
              <li>
                <a href="#">Báo cáo</a>
              </li>
              <li>
                <a href="#">Cài đặt</a>
              </li>
            </ul>
          </div>
          <div className="content-admin">
            <div id="detail">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Layout component={content()} />;
}
