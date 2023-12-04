import { Box, Button, Grid, Paper } from '@mui/material';
import PlusAndMinus from '../../molecules/PlusAndMinus';
import ProductContent from '../../molecules/ProductContent';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../organisms/Cart/hook';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Product(props:any) {
  const {id,name,price,discount,images} = props.product
  const navigate = useNavigate()
  const { cart, addToCart, updateCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  // This useEffect hook is called whenever the `cart` state changes
  useEffect(()=>{
    if(cart?.hasOwnProperty(id)){
      setQuantity(JSON.parse(cart[id].toString()).quantity)
    }
  },[cart,id]);

  return (
    <Grid item xs={12} sm={6} md={3} lg={2.3} key={id} marginTop={1} height={300}>
      <Box>
        <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
          <img src={images[0]?.url} alt={name} style={{ width: '100px',height:'110px',cursor:'pointer' }} onClick={()=>{navigate({ pathname: '/product/'+id })}} />
          <ProductContent name={name} price={price} discount={discount} />
        {!quantity ? 
          <Button variant="contained" color="primary" sx={{ width:'100%' }} onClick={() => { addToCart({id,name,price,quantity: 1,discount,image_url: images[0]?.url})}}>
                    Add to Cart
          </Button> :
          <PlusAndMinus quantity={quantity}  setQuantity={setQuantity} id={id} updateCart={updateCart}/>
        }
        </Paper>
      </Box>  
    </Grid>
  );  
}