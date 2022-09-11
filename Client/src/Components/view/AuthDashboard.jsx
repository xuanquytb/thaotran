import React, { useContext } from "react";
import UserContent from "../../Components/layout/Admin/User/UserContent";
import AdminContent from "../../Components/layout/Admin/User/AdminContent";
import CategoryContent from "../../Components/layout/Admin/Category/Category";
import EmployeeContent from "../../Components/layout/Admin/User/EmployeeContent";
import ProductContent from "../../Components/layout/Admin/Product/Product";
import BrandContent from "../../Components/layout/Admin/Brand/Brand";
import OrderContent from "../../Components/layout/Admin/Order/OrderContent";
import NewsContent from "../../Components/layout/Admin/News/News";
import DashboardAdmin from "../../Components/layout/Admin/Dashboard/DashboardAdmin";

const AuthDashboard = ({ authRoute }) => {
  const body = (
    <>
      {authRoute === "customer" && <UserContent />}
      {authRoute === "employee" && <EmployeeContent />}
      {authRoute === "admin" && <AdminContent />}
      {authRoute === "category" && <CategoryContent />}
      {authRoute === "product" && <ProductContent />}
      {authRoute === "brand" && <BrandContent />}
      {authRoute === "order" && <OrderContent />}
      {authRoute === "news" && <NewsContent />}
      {authRoute === "dashboardAdmin" && <DashboardAdmin />}
    </>
  );

  return <>{body}</>;
};

export default AuthDashboard;
