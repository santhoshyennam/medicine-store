import { Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OrderItem(props:any) {
    const {id,amount,status,delivery_address, date_created,payment_details} = props.order
    const navigate = useNavigate()
    return (
      <Box sx={{display:'flex', height: '100%',width:'100%'}}>
        <Paper sx={{ width: '100%', margin: 'auto', padding: '1rem', marginTop: '30px',cursor:'pointer' }} onClick={()=>{navigate({ pathname: '/order/'+id })      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <h3>Order id: {id}</h3>
            <p>Ordered At: {date_created}</p>
            <p>Status: {status === "OrderStatus.PENDING" ? "PENDING" : status === "OrderStatus.SHIPPED" ? "SHIPPED" : "DELIVERED"}</p>
            <p>Total Amount Paid: {amount}</p>
            {props.order.payment_details.payment_id && <p>Payment Id: {props.order.payment_details.payment_id}</p>}
          </Grid>
          <Grid item xs={12} md={6}>
            <h3>Payment type:</h3>
            <p>{payment_details.payment_method_id === 1 ? "CASH" : "ONLINE"}</p>
            <h3>Delivery Address:</h3>
            <p>{delivery_address}</p>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    );
}


export default OrderItem;
