import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../public/css/adminPage/addProduct.css";

const AddProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: null, // Thay đổi từ string thành null hoặc file
    description: "",
    quantity: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch categories from the server when the component mounts
    axios
      .get("http://localhost:8080/v1/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => setError("Failed to load categories(" + error + ")"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Lưu tệp hình ảnh
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setFormData({
      ...formData,
      category: selectedCategoryId, // Set the entire category object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();

    // Append the product data
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);

    // Append the image file (if any)
    if (formData.image) {
      data.append("image", formData.image);
    }

    // Make the POST request
    axios
      .post("http://localhost:8080/v1/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle the response
        onAddProduct(response.data);

        // Reset the form after submission
        setFormData({
          id: "",
          name: "",
          price: "",
          image: null,
          description: "",
          quantity: "",
          category: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <p className="error">{error}</p>}
      <label className="label">
        Tên Sản Phẩm:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Giá:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Hình Ảnh:
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="input"
          required
          accept="image/*"
        />
      </label>
      <label className="label">
        Mô Tả:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea"
          required
        />
      </label>
      <label className="label">
        Số Lượng:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input"
          required
        />
      </label>
      <label className="label">
        Loại:
        <select
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          className="input"
          required
        >
          <option value="">Chọn loại</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="button">
        Thêm Sản Phẩm
      </button>
    </form>
  );
};

export default AddProductForm;
