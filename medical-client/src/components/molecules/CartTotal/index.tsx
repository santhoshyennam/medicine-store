import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Modal, Paper, TextField } from '@mui/material';
import { useCartTotal } from './hook';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function CartTotal(props:any) {
  const { cartExpenses } = props
  const { deliveryAddress,updateDeliveryAddress } = useCartTotal()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [address,setAddress] = React.useState("")

  React.useEffect(()=>{ 
    setAddress(deliveryAddress)
    if(deliveryAddress !== "" )
      props.setAllowPayment(true)
  
  },[deliveryAddress, props])
  const saveDeliveryAddress = ()=>{
    if(address !== "") {
      props.setAllowPayment(true)
      updateDeliveryAddress(address)
      setOpen(false)
    }
  }

  return (
    <Paper elevation={3} sx={{ padding: 2,width:'100%'}}>
      <Box sx={{ display: 'flex'}}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: 2 }}>
          Cart Total: <b>{cartExpenses.totalPrice}</b>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex'}}>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          {deliveryAddress}
        </Typography>
      </Box>
      <hr/>
      {deliveryAddress ? <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={() => {handleOpen()}}>
              Edit Delivery Address
      </Button> 
      :
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleOpen}>Add Delivery Address</Button>
    }
     <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
          <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Delivery Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
              </Grid>
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleClose}>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={saveDeliveryAddress}>Save</Button>
              </Grid>
              </Grid>
          </Box>
        </Modal>
    </Paper>
  );
}
