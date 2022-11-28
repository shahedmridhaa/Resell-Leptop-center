
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import useAdmin from "../Hook/useAdmin";


const Adminprivate = ({children}) => {
  const { user } = useContext(authcontext);
  const [isRole] = useAdmin(user?.email);
  const navigate = useNavigate();

  if (isRole === "Admin") {
    return children;
  }

  return navigate("/");

};

export default Adminprivate;