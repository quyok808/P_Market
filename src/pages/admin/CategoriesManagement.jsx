import React, { useState, useEffect } from "react";
import CategoryForm from "../../components/categories-management/CategoryForm";
import CategoryList from "../../components/categories-management/CategoryList";
import axios from "axios";

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = (name) => {
    alert(`Thêm danh mục ${name.name} thành công`);
    window.location.reload();
  };

  const editCategory = async (id) => {
    const newName = prompt("Nhập tên mới cho danh mục:");
    if (newName) {
      const dataEdit = new FormData();
      dataEdit.append("id", id);
      dataEdit.append("name", newName);

      const response = await axios.put(
        `http://localhost:8080/v1/api/categories/${id}`,
        dataEdit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCategories((prevCategory) =>
        prevCategory.filter((category) => category.id != id)
      );
      alert(`Sửa sản phẩm ${response.data.name} thành công !!!`);
      window.location.reload();
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    try {
      axios.delete(`http://localhost:8080/v1/api/categories/${id}`);
      setCategories((prevCategory) =>
        prevCategory.filter((category) => category.id != id)
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <h1>Quản lý Danh mục</h1>
      <CategoryForm onAddCategory={addCategory} />
      <CategoryList
        categories={categories}
        onEditCategory={editCategory}
        onDeleteCategory={deleteCategory}
      />
    </div>
  );
}
