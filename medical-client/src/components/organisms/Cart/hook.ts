import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    image_url: string;
  }
  

export const useCart = () => {
    const [cart, setCart] = useState<any>({});
    const [cartExpenses,setCartExpenses] = useState<{[key: string]: any}>({});
    const navigate = useNavigate()
    useEffect(()=>{
        const cartItems = JSON.parse(localStorage.getItem("cart") || "{}")
        if(cartItems){
          setCart(cartItems)
        }
        const expenses = JSON.parse(localStorage.getItem("cartTotal") || "{}")
        if(expenses) {
            setCartExpenses(expenses)
        }
      },[])
    const clearCart = ()=>{
      localStorage.clear()
      navigate({ pathname: "/" })
    }
    const updateCart = (id:any,quantity:number) => {
      if(cart?.hasOwnProperty(id)){
          const cartItems = JSON.parse(localStorage.getItem("cart") || "{}")
          const cartItem = JSON.parse(cart[id].toString())
          if(cartItem.quantity>quantity){
              updateTotalCart(-cartItem.price,-cartItem.discount)
          } else {
              updateTotalCart(cartItem.price,cartItem.discount)
          }
          cartItem.quantity = quantity
          if(quantity > 0) {
              localStorage.setItem("cart", JSON.stringify({
                  ...cartItems,
                  [id]: JSON.stringify(cartItem)
                  }));
          } else {
              const cartItems = JSON.parse(localStorage.getItem("cart") || "{}")
              delete cartItems[id]
              localStorage.setItem("cart", JSON.stringify(cartItems));
          }
          setCart(JSON.parse(localStorage.getItem("cart") || "{}"))
        }
    }
    const addToCart = (medicine:CartItem) => {
          const medicineItem = {
              [medicine.id]: JSON.stringify(medicine)
          }
          const cartItems = JSON.parse(localStorage.getItem("cart") || "{}")
          localStorage.setItem("cart", JSON.stringify({
              ...cartItems,
              ...medicineItem
              }));
          updateTotalCart(medicine.price,medicine.discount)
          setCart(JSON.parse(localStorage.getItem("cart") || "{}"))
    }

    const updateTotalCart = (price:number,discount:number) => {
      const expenses = JSON.parse(localStorage.getItem("cartTotal") || "{}")
      if(expenses) {
          let totalPrice = expenses.totalPrice || 0
          let totalDiscount = expenses.totalDiscount || 0
          totalPrice = totalPrice+Number(price)
          totalDiscount = totalDiscount+Number(discount)
          let deliveryCharges = 0
          // const cartItems = JSON.parse(localStorage.getItem("cart") || "{}")
          if(totalPrice < 1000) {
              deliveryCharges = 0.2*totalPrice
          }
          const details = { totalDiscount,totalPrice, deliveryCharges}
          localStorage.setItem("cartTotal", JSON.stringify(details));
          // setCartExpenses({})
          setCartExpenses(details)
          // setCart(JSON.parse(localStorage.getItem("cart") || "{}"))
      }
    }
    return {
      clearCart,
      cart,
      updateCart,
      addToCart,
      cartExpenses,
      }  
}