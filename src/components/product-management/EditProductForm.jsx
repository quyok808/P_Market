import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProductForm = ({ onEditProduct, productedit }) => {
  const [imagePreview, setImagePreview] = useState(
    `http://localhost:8080/Product_images/${productedit.image}`
  );
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: productedit.id,
    name: productedit.name,
    price: productedit.price,
    image: productedit.image,
    description: productedit.description,
    quantity: productedit.quantity,
    category: productedit.category.id,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/v1/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  // Handle input change in the form
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file, // Lưu tệp hình ảnh
      });
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle submitting the edited product
  const handleSubmitEdit = async (e) => {
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

    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/products/${formData.id}`,
        data
      );

      // Update the product in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === formData.id ? response.data : product
        )
      );
      onEditProduct(response.data);
      // Clear form and close edit mode
      setFormData({
        id: "",
        name: "",
        price: "",
        image: null,
        description: "",
        quantity: "",
        category: "",
      });
    } catch (error) {
      console.error("Error updating product", error);
    }
    window.location.reload();
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setFormData({
      ...formData,
      category: selectedCategoryId, // Set the entire category object
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmitEdit} className="form">
        <label className="label">
          Tên Sản Phẩm:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="input"
            required
          />
        </label>
        <label className="label">
          Hình Ảnh:
          <img
            src={imagePreview}
            alt={formData.name}
            width={"90px"}
            height={"140px"}
          />
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="input"
            accept="image/*"
          />
        </label>
        <label className="label">
          Mô Tả:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea"
          />
        </label>
        <label className="label">
          Số Lượng:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
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
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
