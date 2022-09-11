import React, { useContext } from "react";
import Infomation from "../../Components/layout/Page/MyInfo/PageInfo/Infomation";
import Order from "../../Components/layout/Page/Order/Order";

const AuthInfoCustomer = ({ authRoute }) => {
  const body = (
    <>
      {authRoute === "info" && <Infomation />}
      {authRoute === "order" && <Order />}
    </>
  );

  return <>{body}</>;
};

export default AuthInfoCustomer;
