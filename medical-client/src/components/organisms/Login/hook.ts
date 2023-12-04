import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()
    const login = ()=>{
      if(email === "" || password === "") {
        setError(true);
      }
      else {
        setLoading(true);
        setError(false);
        axios.post(BACKEND_URL+'login',{email,password})
        .then(response => {
          localStorage.setItem('user_details', JSON.stringify(response.data));
          navigate({ pathname: '/' })
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setError(true);
        });
      }
    }

    useEffect(()=>{
      const user = localStorage.getItem("user_details")
      if(user){
        navigate({ pathname:"/"})
      }
    },[navigate])

    return {
        login,
        loading,
        email,
        password,
        setEmail,
        setPassword,
        error
    }
}