import { Box, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
import React from 'react';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

export default function ProductContent(props:any) {
    const {name,price,description,discount,isDetailed} = props
    return (
        <Box>
             <Box sx={{ display: 'flex'}}>
             <HtmlTooltip
                    title={
                    <React.Fragment>
                        <Typography color="inherit">{name}</Typography>
                        <Typography color="inherit">you will get ${discount} off on this Product</Typography>
                    </React.Fragment>
                    }>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                        {!isDetailed && name.substring(0,20)+"..."}
                        { isDetailed && name}
                    </Typography>
                </HtmlTooltip>
            </Box>
            { description && <Box sx={{ display: 'flex',marginTop:'20px'}}>
                <Typography variant="body1" sx={{ color: '#8897A2', fontSize: '14px',textAlign:'left'}}>
                { description}
                </Typography>
            </Box>}          
            <Box sx={{ display: 'flex'}}>
                <Typography variant="subtitle1" sx={{ color: '#8897A2', fontSize: '14px', marginTop: 1 }}>
                MRP <span style={{textDecoration:'line-through'}}>${price}</span>
                </Typography>
            </Box>
            <Box sx={{ display: 'flex'}}>
                <Typography variant="subtitle1" sx={{ color: '#30363c', fontWeight: 'bold',marginRight:1 }}>
                ${price-discount}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#F47779', fontWeight: 'bold'}}>
                ({Math.ceil((discount/price) * 100)}%)
            </Typography>
            </Box>
        </Box>
    )
}