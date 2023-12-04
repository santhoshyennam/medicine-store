import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import PlusAndMinus from '../PlusAndMinus';
import { useNavigate } from 'react-router-dom';
import { HtmlTooltip } from '../ProductContent';

export default function CartItem(props:any) {
  const {id,image_url,name,price,quantity,discount} = JSON.parse(props.medicine)
  const [ medicinQuantity, setQuantity] = React.useState(quantity)
  const navigate = useNavigate()
  if(medicinQuantity>0) {
    return (
        <Grid item xs={12} sm={6} md={3} lg={8} key={id} height={80} maxWidth={800} style={{height:'150px',border:'2px solid #e6ebf4'}}>
        <Box sx={{display:'flex',justifyItems:'center', height: '100%',paddingTop: '32px',paddingRight:'32px',paddingBottom:'34px',paddingLeft:'32px'}}>
            <img src={image_url} alt={name} style={{ width: '80px',height:'80px',marginRight:'20px' }} />
                <Box style={{ width: '45%',height:'70%',marginRight:'20px',cursor:'pointer' }} onClick={()=>{ navigate({ pathname: '/product/'+id })}}>
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
            <PlusAndMinus quantity={medicinQuantity}  setQuantity={setQuantity} id={id} updateCart={props.updateCart} />
            </Box>
    </Grid>
    );
    } else {
        return (
            <></>
        )
    }
}