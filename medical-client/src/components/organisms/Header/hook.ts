import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../../../utils";

export const useHeader = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ medicines, setMedicines ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ search, setSearch] = useState("")
    const [ name, setName] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        const user = localStorage.getItem("user_details")
        if(user){
          const firstName = JSON.parse(user)?.customer?.first_name
          const lastName = JSON.parse(user)?.customer?.last_name
          setIsLoggedIn(true)
          setName(firstName.charAt(0).toLocaleUpperCase()+lastName.charAt(0).toLocaleUpperCase())
        }
      },[])
    const logout = ()=>{
      localStorage.removeItem("user_details");
      navigate({ pathname: '/' })
      window.location.reload()
    }

    useEffect(() => {
      if(search.length >= 3) {
        // Call the API after 500ms of inactivity
        const timeoutId = setTimeout(getMedicines, 1000);
        
        // Clear the timeout if the text changes again
        return () => clearTimeout(timeoutId);
      }
    }, [search]);

    const getMedicines = () => {
      setLoading(true)
      axios.get(BACKEND_URL+'/medicines/filter?filter_text='+search)
      .then(response => {
        setMedicines(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
    }
      return {
        isLoggedIn,
        logout,
        search,
        setSearch,
        medicines,
        loading,
        name
      }
}