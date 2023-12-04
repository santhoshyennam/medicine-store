import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils";


export const useCategories = () => {
    const [categories,setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(BACKEND_URL+'/categories')
          .then(response => {
            setCategories(response.data);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      }, []);
    
    return {
        categories,
        setCategories,
        loading
    }
}