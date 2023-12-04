import { useEffect, useState } from "react"

export const useCartTotal = () => {
    const [ deliveryAddress, setDeliveryAddress ] = useState("");
    useEffect(()=>{
        const address = localStorage.getItem("deliveryAddress")
        if(address){
          setDeliveryAddress(address)
        }
      },[])

    const updateDeliveryAddress = (address:string)=>{
        localStorage.setItem("deliveryAddress", address);
        setDeliveryAddress(address)
      }

      return {
        deliveryAddress,
        updateDeliveryAddress
      }
}