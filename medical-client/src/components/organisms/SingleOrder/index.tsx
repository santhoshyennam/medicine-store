import * as React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useOrder } from './hook';
import { useNavigate, useParams } from 'react-router-dom';
import OrderItem from '../../molecules/OrderItem';
import { HtmlTooltip } from '../../molecules/ProductContent';
import LandingLoader from '../../molecules/Loader';

export default function SingleOrder(props:any) {
  const { id } = useParams();
  const { loading, order } = useOrder(id || "1");
  const navigate = useNavigate()
  return (
        loading ? <LandingLoader/> :
      <Box sx={{ height: '100%',width:'100%'}}>
          <OrderItem order={order} />
          <Box marginTop={1}>
            <Typography variant="subtitle1" sx={{ marginTop:'40px', color: '#000000',fontWeight:'14px',fontFamily:'inherit', fontSize: '24px',marginLeft:'10px',alignContent:'start' }}>
             Ordered Products
            </Typography>
            <br/>
          <Grid container spacing={4} marginTop={1}>
          {
            order.order_items.map((medicine:any) => (
              <Grid item xs={12} sm={6} md={3} lg={2.3} key={id} height={300}>
                <Box>
                <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                  <img src={medicine?.medicine?.images[0]?.url} alt={medicine?.medicine?.name} style={{ width: '100px',height:'110px',cursor:'pointer' }} onClick={()=>{navigate({ pathname: '/product/'+medicine.medicine_id })}} />
                  <Box>
                    <Box sx={{ display: 'flex'}}>
                      <HtmlTooltip
                              title={
                              <React.Fragment>
                                  <Typography color="inherit">{medicine?.medicine?.name}</Typography>
                              </React.Fragment>
                              }>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                                  {medicine?.medicine?.name.length < 15 ? medicine?.medicine?.name : medicine?.medicine?.name.substring(0,15)+"..."}
                              </Typography>
                      </HtmlTooltip>
                      </Box>
                      <Box sx={{ marginTop: 1,alignContent:'start',justifyContent:'flex-start' }}>
                          <Typography variant="subtitle1" sx={{ color: '#8897A2', fontSize: '14px'}}>
                          MRP ${medicine.amount}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ color: '#8897A2',marginLeft:1 }}>
                            {medicine.quantity} item's purchased
                          </Typography>
                      </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          ))}
          </Grid>
      </Box>
    </Box>
  );
}