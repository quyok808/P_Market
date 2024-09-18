import axios from "axios";
import React, { useState } from "react";

const CategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState({
    id: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryName({
      ...categoryName,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", categoryName.name);

    axios
      .post("http://localhost:8080/v1/api/categories", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        onAddCategory(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Tên Danh mục:</label>
      <input
        type="text"
        name="name"
        value={categoryName.name}
        onChange={handleChange}
        className="input"
        required
      />
      <button type="submit" style={styles.button}>
        Thêm Danh mục
      </button>
    </form>
  );
};

const styles = {
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
};
export default CategoryForm;
