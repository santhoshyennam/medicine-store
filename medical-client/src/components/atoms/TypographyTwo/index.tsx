import { Box, Typography } from "@mui/material";
import React from 'react';


export default function TypographyTwo(props:any) {
    const {firstText, secondText, marginTop, fontSize,textVariant,color} = props
    return (
        <Box sx={{ display: 'flex', justifyContent:'space-between',marginTop:{marginTop}}}>
            <Typography variant="body1" sx={{ color: "#8897A2", fontSize: {fontSize}}}>
            {firstText}
            </Typography>
            <Typography variant="body1" sx={{ color: {color}, fontSize: {fontSize},fontWeight:"bold"}}>
            {secondText}
        </Typography>
        </Box>
    )
}