import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    navigate(token ? "/storage" : "/login");
  }, [navigate]);

  return null;
};

export default HomeRedirect;