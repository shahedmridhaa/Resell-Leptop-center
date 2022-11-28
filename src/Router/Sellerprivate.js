import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import useAdmin from "../Hook/useAdmin";


const Sellerprivate = ({children}) => {
  const { user } = useContext(authcontext);
  const [isRole] = useAdmin(user?.email);
  const navigate = useNavigate();

  if (isRole === "Seller") {
    return children;
  }

  return navigate("/");

};

export default Sellerprivate;