import { Box, Button, Grid, Typography } from '@mui/material';
import PlusAndMinus from '../../molecules/PlusAndMinus';
import  { HtmlTooltip } from '../../molecules/ProductContent';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../organisms/Cart/hook';
import { useEffect, useState } from 'react';
import React from 'react';

export default function SearchItem(props:any) {
  const {id,name,price,discount,images} = props.product
  const navigate = useNavigate()
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  // This useEffect hook is called whenever the `cart` state changes
  useEffect(()=>{
    if(cart?.hasOwnProperty(id)){
      setQuantity(JSON.parse(cart[id].toString()).quantity)
    }
  },[cart,id]);
  
  return (
    <Grid item xs={12}  key={id} height={100}>
      <Box sx={{display:'flex',justifyItems:'center',paddingTop: '32px',paddingRight:'32px',paddingBottom:'34px',paddingLeft:'32px'}}>
        <img src={images[0]?.url} alt={name} style={{ width: '50px',height:'50px',marginRight:'20px',cursor:'pointer' }} onClick={()=>{navigate({ pathname: '/product/'+id }); props.setAnchorElMedicines(null); window.location.reload()}} />
        <Box style={{ width: '45%',height:'70%',marginRight:'20px',cursor:'pointer' }} onClick={()=>{ navigate({ pathname: '/product/'+id }); props.setAnchorElMedicines(null); window.location.reload()}}>
                <Box sx={{ display: 'flex'}}>
                <HtmlTooltip
                        title={
                        <React.Fragment>
                            <Typography color="inherit">{name}</Typography>
                            <Typography color="inherit">you will get ${discount} off on this Product</Typography>
                        </React.Fragment>
                        }>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                            {name.length < 20 ? name : name.substring(0,20)+"..."}
                        </Typography>
                    </HtmlTooltip>
                </Box>
                    <Box sx={{ display: 'flex'}}>
                        <Typography variant="subtitle1" sx={{ color: '#8897A2', fontSize: '14px', marginTop: 1 }}>
                        MRP <span >${price-discount}</span>
                        </Typography>
                    </Box>
                </Box>
        {!quantity ? 
          <Button variant="contained" color="primary" sx={{ width:'20%',height:'30px' }} onClick={() => { addToCart({id,name,price,quantity: 1,discount,image_url: images[0]?.url})}}>
                    <Typography variant="body1" sx={{ fontSize: '12px'}}>
                            Add
                        </Typography>
          </Button> 
          :
          <Box width={50} height={50}>
            <PlusAndMinus quantity={quantity}  setQuantity={setQuantity} id={id}/>
          </Box>
        }
      </Box>  
    </Grid>
  );  
}