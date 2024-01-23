import React from "react";
import { useUserStore } from "store/useUserStore";
const AdminManage = () => {
  const user = useUserStore((state: any) => state.user);
  console.log("user", user);
  return <div>AdminManage</div>;
};

export default AdminManage;
