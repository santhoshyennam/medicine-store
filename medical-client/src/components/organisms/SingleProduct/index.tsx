import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PlusAndMinus from '../../molecules/PlusAndMinus';
import ProductContent from '../../molecules/ProductContent';
import { useSingleProduct } from './hook';
import { useParams } from 'react-router-dom';
import { useCart } from '../Cart/hook';
import LandingLoader from '../../molecules/Loader';

export default function SingleProduct(props:any) {
  const { id } = useParams();
  const {product,loading} = useSingleProduct(id || "1");
  const [quantity, setQuantity] = React.useState<number>(0);
  const { cart, addToCart,updateCart } = useCart();

  // This useEffect hook is called whenever the `cart` state changes
  React.useEffect(()=>{
    if(cart?.hasOwnProperty(id || "1")){
      setQuantity(JSON.parse(cart[id || "1"].toString()).quantity)
    }
  },[cart,id]);

  // const getManufactureDetails = (): JSX.Element[] => {
  //   const details = product?.manufactureDetails?.manufactureCodeDetails;
  //   const list: JSX.Element[] = [];
  
  //   if (details) {
  //     Object.keys(details).forEach(key => {
  //       list.push(<li key={key} style={{textAlign:"left"}}>{details[key]}</li>);
  //     });
  //   }
  
  //   return list;
  // };

  return (
    loading ? <LandingLoader/> :
    <Grid item xs={12} sm={6} md={3} lg={2} key={id} width="95%" marginTop={4}>
    <Paper elevation={2} sx={{ padding: 8, height: '100%'}}>
      <Box sx={{display:'flex', height: '100%'}}>
        <img src={product?.images[0]?.url || ""} alt={product.name} style={{ maxWidth: '500px',maxHeight:'350px',marginRight:'20px' }} />
        <Box marginLeft={10} sx={{ marginTop:'20px'}}>
          <ProductContent name={product.name} price={product.price} discount={product.discount} description={product.description} dose={product.dose.dose_stg} isDetailed={true} />
          {!quantity ? 
            <Button variant="contained" color="primary" sx={{ marginTop: 1,width:'100%' }} onClick={() => { addToCart({id:product.id,name:product.name,price:product.price,quantity: 1,discount:product.discount,image_url: product?.images[0]?.url})}}>
                      Add to Cart
            </Button> :
            <PlusAndMinus quantity={quantity}  setQuantity={setQuantity} id={id} updateCart={updateCart} />
          }
          <h4 style={{textAlign:'left',marginBottom:'-10px'}}> Manufacture Details</h4>
          { Object.keys(product?.manufactureDetails?.manufactureCodeDetails).length !== 0 && <ul>
            {/* {  getManufactureDetails() } */}
            <li style={{textAlign:"left"}}>{product?.manufactureDetails?.manufactureCodeDetails["manufacture_1"]}</li>
          </ul>}
          <h5 style={{textAlign:'left',marginBottom:'-10px'}}>Prescription is { product.prescription_status === "No" ?  "not required!" :"required!"  } </h5>
          <h4 style={{textAlign:'left'}}> Dose Details</h4>
          <Typography variant="body1" sx={{ color: '#8897A2', fontSize: '14px',textAlign:'left',marginTop:'-15px'}}>
            - {product.dose.dose_stg}
          </Typography>
          </Box>
        </Box>
    </Paper>
  </Grid>
  );
}