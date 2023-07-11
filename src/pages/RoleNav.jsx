import AdminHeader from "./AdminHeader";
import DeliveryPersonHeader from "./DeliveryPersonHeader";
import HeaderUser from "./HeaderUser";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
 

  if (user != null) {
    return <HeaderUser />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
