import * as React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import TypographyTwo from '../../atoms/TypographyTwo';
import { useBillSummary } from './hook';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import LandingLoader from '../Loader';

export default function BillSummary(props:any) {
  const { cartExpenses,allowPayment } = props
  const { cashOnDelivery, payOnline} = useBillSummary()
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    isPending ? <LandingLoader/> :
    <Paper elevation={3} sx={{ padding: 2,width:'100%',marginTop:'10px' }}>
        <Box sx={{ display: 'flex'}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
            Bill Summary
            </Typography>
        </Box>

        <TypographyTwo firstText="Total MRP" secondText={cartExpenses.totalPrice} marginTop="15px" fontSize="14px"  color="#8897A2" />
        <TypographyTwo firstText="Discount" secondText={cartExpenses.totalDiscount} marginTop="3px" fontSize="14px" color="#8897A2" />
        <TypographyTwo firstText="Cart Value" secondText={cartExpenses.totalPrice - cartExpenses.totalDiscount} marginTop="35px" fontSize="14px" color="#8897A2"/>
        <TypographyTwo firstText="Delivery Charges" secondText={cartExpenses.deliveryCharges} marginTop="3px" fontSize="14px" color="primary"/>
        <TypographyTwo firstText="Amount to be paid" secondText={cartExpenses.totalPrice - cartExpenses.totalDiscount + cartExpenses.deliveryCharges} marginTop="25px" fontSize="22px" color="primary"/>
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2,marginBottom:2 }} onClick={() => { cashOnDelivery() }}>
              Cash on Delivery
      </Button>
      {/* <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={() => { navigate({ pathname: '/paynow' })}}>
              Pay online
      </Button> */}
      { allowPayment && <PayPalButtons style={{ layout: "horizontal" }}
          createOrder={(data:any, actions:any) => {
              return actions.order.create({
                  purchase_units: [
                      {
                          amount: {
                              value: cartExpenses.totalPrice - cartExpenses.totalDiscount + cartExpenses.deliveryCharges,
                          },
                      },
                  ],
              });
        }}
        onApprove={(data:any, actions:any) => {
            return actions.order.capture().then((details:any) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
                payOnline(data.orderID)
            }).catch((error:any) => {
              console.error("Error in Payment!", error);
            });
        }}
      />}
    </Paper>
  );
}