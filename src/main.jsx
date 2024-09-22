import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/users/HomePage";
import ErrorPage from "./pages/error-page";
import "../public/css/styles.css";
import StorePage from "./pages/users/StorePage";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import AddProductForm from "./components/product-management/AddProductForm";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import { CartProvider } from "../src/components/homePage/cart/CartContext";
import Checkout from "./components/homePage/CheckOut";
import ShoppingCart from "./pages/users/ShoppingCart";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ContactForm from "./components/homePage/ContactForm";

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
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="dashboard" replace />, // Điều hướng mặc định tới Dashboard
      },
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
      {
        path: "orders-management",
        element: <OrdersManagement />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/contact",
    element: <ContactForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CartProvider>
);
