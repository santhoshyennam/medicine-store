import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils";


export const useSingleProduct = (id:String) => {
    const [product,setProduct] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(BACKEND_URL+'/medicine?medicine_id='+id)
          .then(response => {
            setProduct(response.data);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      }, []);
    
    return {
        product,
        setProduct,
        loading
    }
}