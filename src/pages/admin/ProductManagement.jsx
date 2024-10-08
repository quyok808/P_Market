import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProductForm from "../../components/product-management/AddProductForm";
import Modal from "react-modal";
import EditProductForm from "../../components/product-management/EditProductForm";
import { useCart } from "../../components/homePage/cart/CartContext";

const ProductManagement = () => {
  const { removeFromCart } = useCart();
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [productBeingEdited, setProductBeingEdited] = useState(null);

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

  const handleAddProduct = () => {
    setModalIsOpen(true);
  };

  const handleAddProductSubmit = (newProduct) => {
    // Xử lý việc thêm sản phẩm mới (gửi dữ liệu đến server, cập nhật danh sách sản phẩm, v.v.)
    console.log("New product added:", newProduct);
    alert(`Sản phẩm ${newProduct.name} được thêm thành công !!!`);
    setModalIsOpen(false); // Ẩn form sau khi thêm sản phẩm
  };

  const handleEditProduct = (id) => {
    setModalIsOpenEdit(true);
    const productEdit = products.find((product) => product.id == id);
    setProductBeingEdited(productEdit);
  };

  // To handle form submission
  const handleSubmitEdit = (updatedProduct) => {
    alert(`Sửa sản phẩm ${updatedProduct.name} thành công !!!`);
    setModalIsOpenEdit(false); // Ẩn form sau khi thêm sản phẩm
  };

  const handleDeleteProduct = async (id) => {
    setProducts(products.filter((product) => product.id !== id));
    try {
      await axios.delete(`http://localhost:8080/v1/api/products/${id}`);
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.id != id)
      );
      removeFromCart(id);
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div>
      <h1>Quản lý Sản Phẩm</h1>
      <button onClick={handleAddProduct} style={styles.button}>
        Thêm Sản Phẩm
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Product Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-addproduct-controller">
          <h2>Thêm Sản Phẩm</h2>
          <button
            onClick={() => setModalIsOpen(false)}
            style={styles.closeButton}
          >
            X
          </button>
        </div>
        <AddProductForm onAddProduct={handleAddProductSubmit} />
      </Modal>
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={() => setModalIsOpenEdit(false)}
        contentLabel="Edit Product Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-addproduct-controller">
          <h2>Sửa Sản Phẩm</h2>
          <button
            onClick={() => setModalIsOpenEdit(false)}
            style={styles.closeButton}
          >
            X
          </button>
        </div>
        <EditProductForm
          onEditProduct={handleSubmitEdit}
          productedit={productBeingEdited}
        />
      </Modal>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Hình Ảnh</th>
            <th>Mô Tả</th>
            <th>Số Lượng</th>
            <th>Loại</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ fontWeight: "bold" }}>{product.id}</td>
              <td>{product.name}</td>
              <td>{formatter.format(product.price)}</td>
              <td>
                <img
                  src={`http://localhost:8080/Product_images/${product.image}`}
                  alt={product.name}
                  style={styles.image}
                />
              </td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.category?.name}</td>
              <td>
                <button
                  onClick={() => handleEditProduct(product.id)}
                  style={styles.actionButton}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={styles.actionButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    minHeight: "100vh",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    position: "fixed",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    padding: "10px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  content: {
    marginLeft: "250px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  button: {
    display: "inline-block",
    padding: "10px 15px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
    textAlign: "center",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  actionButton: {
    display: "inline-block",
    padding: "10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
    textAlign: "center",
    margin: "0 5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  closeButton: {
    padding: "10px",
    fontSize: "14px",
    color: "black",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ProductManagement;
