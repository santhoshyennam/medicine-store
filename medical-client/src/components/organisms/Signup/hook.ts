import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../../utils";
import { useNavigate } from "react-router-dom";


export const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const navigate = useNavigate()

    const signUp = (data:any)=>{
      if(data.email_1 === "") {
        setErrorMessage("Email is empty!")
        setError(true);
      } else if (!/\S+@\S+\.\S+/.test(data.email_1)) {
        setErrorMessage('Invalid email format');
        setError(true)
      } else if (!/\S+@\S+\.\S+/.test(data.email_2) && data.email_2 !== "") {
        setErrorMessage('Invalid email format for optional email');
        setError(true)
      }
       else if(data.first_name === "") {
        setErrorMessage("First Name is empty!")
        setError(true);
      } else if(data.last_name === "") {
        setErrorMessage("Last Name is empty!")
        setError(true);
      } else if(data.password === "") {
        setErrorMessage("password is empty!")
        setError(true);
      } else if (data.password.length < 8) {
        setErrorMessage('Password must be at least 8 characters');
        setError(true);
      } else if (!/[a-z]/.test(data.password)) {
        setErrorMessage('Password must contain at least one lowercase letter');
        setError(true);
      } else if (!/[A-Z]/.test(data.password)) {
        setErrorMessage('Password must contain at least one uppercase letter');
        setError(true);
      } else if (!/\d/.test(data.password)) {
        setErrorMessage('Password must contain at least one digit');
        setError(true);
      } else if (!/[@$!%*#?&]/.test(data.password)) {
        setErrorMessage('Password must contain at least one special symbol (@$!%*#?&)');
        setError(true);
      }  else if(data.phone_1 === ""){
        setErrorMessage("Phone Number is empty!")
        setError(true);
      }
      else {
        setLoading(true);
        setError(false);
        axios.post(BACKEND_URL+'/signup',data)
        .then(response => {
          setLoading(false);
          alert("Succefully Created!")
          navigate({ pathname: '/login' })
        })
        .catch(error => {
          setLoading(false);
          setError(true);
          console.log("error",JSON.stringify(error))
          setErrorMessage(error.message)
        });
      }
    }

    return {
        signUp,
        loading,
        error,
        errorMessage
    }
}