import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CartItem from '../../molecules/CartItem';
import CartTotal from '../../molecules/CartTotal';
import BillSummary from '../../molecules/BillSummary';
import { useCart } from './hook';
import { useNavigate } from 'react-router-dom';

export default function Cart(props:any) {
  const { cart,clearCart,cartExpenses, updateCart,addToCart } = useCart()
  const [allowPayment,setAllowPayment] = React.useState(false)
  const navigate = useNavigate()

  return (
    <Box sx={{display:'flex', height: '100%',width:'100%'}}>
        <Box sx={{width:'70%',marginRight:'20px',marginTop:'55px',height:'200px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end',marginRight:'70px',marginBottom:'20px' }}>
          { Object.keys(cart).length !== 0 && <Button variant="contained" onClick={()=>{ clearCart() }}>Clear cart</Button>}
          </Box>
        { Object.keys(cart).length !== 0 ? 
        <Box>
          {Object.keys(cart).map((key:any) => (
            <CartItem key={key} medicine={cart[key]} updateCart={updateCart} addToCart={addToCart} />
          ))}
        </Box>
         : 
        <Box alignContent={'center'}>
          <Typography variant="subtitle1" sx={{ color: '#000000',fontWeight:'14px',fontFamily:'inherit', fontSize: '28px',marginLeft:'10px', marginTop: 1 }}>
          No Medicines are available in Cart! Please Add items
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 1,width:'30%' }} onClick={() => { navigate({ pathname: '/' })}}>
                      Browse Medicines
            </Button>
        </Box>
        }
        </Box>
        { Object.keys(cart).length !== 0 &&
        <Box sx={{width:'30%'}}  marginTop={7} marginRight={10}>
        <CartTotal cartExpenses={cartExpenses} setAllowPayment={setAllowPayment}  />
        <BillSummary cartExpenses={cartExpenses} allowPayment={allowPayment} />
        </Box>
        }
    </Box>
  );
}