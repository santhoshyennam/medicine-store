import axios from "axios";
import { BACKEND_URL } from "../../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useBillSummary = () => {
    const [paymentPage,setPaymentPage] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const cashOnDelivery = ()=>{
        const user = localStorage.getItem("user_details")
        const deliveryAddress = localStorage.getItem("deliveryAddress")
        if(!user){
            alert("please Login")
        }  else if(!deliveryAddress){
            alert("please add Delivery Address")
        }  else {
            const cart = JSON.parse(localStorage.getItem("cart") || "")
            const cartTotal = JSON.parse(localStorage.getItem("cartTotal") || "")
            let cartItems: any[] = []
            for( let key in cart) {
                const item = JSON.parse(cart[key])
                cartItems.push({ medicine_id: item.id, quantity: item.quantity, amount: item.price })
            }
            const data = {
                order_items: cartItems,
                customer_id:JSON.parse(user).customer.id,
                payment_type: "CASH",
                amount: cartTotal.totalPrice - cartTotal.totalDiscount + cartTotal.deliveryCharges,
                delivery_address: deliveryAddress
            }
            axios.post(BACKEND_URL+'create-order', data)
            .then(response => {
                setLoading(false);
                localStorage.removeItem("cart")
                localStorage.removeItem("cartTotal")
                alert("Order is placed Successfully!")
                navigate({ pathname: '/' })
            })
            .catch(error => {
                alert("Error in placing an Order, Try again after sometime!")
                setLoading(false);
            });
        }
    }
    const payOnline = async (paymentId:any) => {
        const user = localStorage.getItem("user_details")
        const deliveryAddress = localStorage.getItem("deliveryAddress")
        if(!user){
            alert("please Login")
        }  else if(!deliveryAddress){
            alert("please add Delivery Address")
        }  else {
            const cart = JSON.parse(localStorage.getItem("cart") || "")
            const cartTotal = JSON.parse(localStorage.getItem("cartTotal") || "")
            let cartItems: any[] = []
            for( let key in cart) {
                const item = JSON.parse(cart[key])
                cartItems.push({ medicine_id: item.id, quantity: item.quantity, amount: item.price })
            }
            const data = {
                order_items: cartItems,
                customer_id:JSON.parse(user).customer.id,
                payment_type: "ONLINE",
                amount: cartTotal.totalPrice - cartTotal.totalDiscount + cartTotal.deliveryCharges,
                delivery_address: deliveryAddress,
                payment_id: paymentId
            }
            axios.post(BACKEND_URL+'create-order', data)
            .then(response => {
                setLoading(false);
                localStorage.removeItem("cart")
                localStorage.removeItem("cartTotal")
                alert("Order is placed Successfully!")
                // navigate({ pathname: '/' })
            })
            .catch(error => {
                alert("Error in placing an Order, Try again after sometime!")
                setLoading(false);
            });
        }
    };
    
    return {
        paymentPage,
        setPaymentPage,
        loading,
        payOnline,
        cashOnDelivery
    }
}