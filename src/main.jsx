import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/users/HomePage";
import ErrorPage from "./pages/error-page";
import "../public/css/styles.css";
import StorePage from "./pages/users/StorePage";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import AddProductForm from "./components/product-management/AddProductForm";
import CategoriesManagement from "./pages/admin/CategoriesManagement";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products-management",
        element: <ProductManagement />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "add-product",
            element: <AddProductForm />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "categories-management",
        element: <CategoriesManagement />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
