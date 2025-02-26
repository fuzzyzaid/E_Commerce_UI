import React, { useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";

function Logout() {
  const path = useNavigate();
  const { setUser } = useContext(CartContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch("/logout");
        const response = await responseData.json(); // because fetch does not return the json object thats why we have to convert it into jsona dn then use
        if (response.message === "Logout Successfull") {
          setUser(null); // Clear user from context
          localStorage.removeItem("user"); // Remove from storage
          path("/login");
        } else {
          console.log("Logout Failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
    fetchData();
  }, [path]);
  return <div></div>;
}

export default Logout;
