import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils";
import { useNavigate } from "react-router-dom";


export const useOrder = (id:String) => {
    const [order,setOrder] = useState<any>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user_details") || "{}")
      if(!user || Object.keys(user).length === 0){
          navigate({ pathname: "/login" })
      } else {
        axios.get(BACKEND_URL+'/order?order_id='+id)
          .then(response => {
            setOrder(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(error.response.data.error);
            setLoading(false);
          });
        }
      }, [id, navigate]);
    
    return {
        order,
        setOrder,
        loading
    }
}