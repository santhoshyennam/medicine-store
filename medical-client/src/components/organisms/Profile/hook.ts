import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const useProfile = () => {

    const [user,setUser] = useState<any>()
    const navigate = useNavigate()

    useEffect(()=>{
        const customer = JSON.parse(localStorage.getItem("user_details") || "")
        if(!customer){
          navigate({ pathname:"/"})
        } else {
            setUser(customer.customer)
        }
      },[])

      return {
        user
      }
    
}