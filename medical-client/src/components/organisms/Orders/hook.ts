import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";


export const useOrders = () => {
    const [orders, setOrders] = useState<any>([]);
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true);
    useEffect(()=>{
      // console.log("rd",orders.length)
        const user = JSON.parse(localStorage.getItem("user_details") || "{}")
        if(!user || Object.keys(user).length === 0){
            navigate({ pathname: "/login" })
        } else {
            setLoading(true)
            axios.get(BACKEND_URL+'/orders-for-customer?customer_id='+user.customer.id)
            .then(response => {
              setOrders(response.data);
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              setOrders([]);
            });
        }
      },[navigate])

      useEffect(()=>{
          console.log("orders",orders)
      },[orders])
 
      return {
        orders,
        loading
       }  
}