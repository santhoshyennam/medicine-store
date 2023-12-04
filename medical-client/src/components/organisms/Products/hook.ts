import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils";
import { useParams } from "react-router-dom";


export const useProducts = () => {
  const { id } = useParams();
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let route = ""
        if(id) {
          if(id == "offers") {
            route = "medicines/offers"
          } else {
            route = "get-products-by-category?category_id="+id
          }
        } else {
          route = "medicines"
        }
        setLoading(true);
        axios.get(BACKEND_URL+route)
          .then(response => {
            setProducts(response.data);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
          });
      }, [id]);
    
    return {
        products,
        setProducts,
        loading
    }
}