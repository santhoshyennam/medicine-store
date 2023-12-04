import { Button, Typography, Box } from "@mui/material";
import React from 'react';


export default function PlusAndMinus(props:any){
    const { quantity,id, setQuantity,updateCart } = props
    const onClickPlus = () => {
        if(quantity<10) {
            setQuantity(quantity+1)
            updateCart(id,quantity+1)
        }
        else 
            alert("cannot add more than 10 medicines")
    }
    const onClickMinus = () => {
        updateCart(id,quantity-1)
        setQuantity(quantity-1)
    }
    return (
            <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'20px' }}>
            <Button variant="contained" color="secondary" onClick={() => {onClickMinus()}}>
                -
            </Button>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: 1, marginRight: 1 }}>
                {quantity}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => {onClickPlus()}}>
                +
            </Button>
        </Box>
    )
}