import {  Box, Grid, Typography } from '@mui/material';
import { useProducts } from './hook';
import Product from '../../molecules/Product';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import LandingLoader from '../../molecules/Loader';

export default function Products(props:any) {
  const { products, loading} = useProducts();
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const data = products;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };
  const buttonStyle = {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
      loading ? <LandingLoader/> :
      <Grid container spacing={4}  display={"inline"}>
      { (id && id==="offers") && 
          <Box justifyItems={"start"}>
            <Typography variant="subtitle1" sx={{ color: '#000000',fontWeight:'14px',fontFamily:'inherit', fontSize: '24px',marginLeft:'10px', marginTop: 1 }}>
            Products with more than 40% off
            </Typography>
            <hr/><br/>
          </Box>
          }
      <Grid container spacing={4} marginTop={3}>
          {currentData.map((product:any) => (
                  <Product product={product} />
          ))}
      </Grid> 
      <Box display="flex" justifyContent="center" marginTop={3}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Box key={pageNumber} sx={buttonStyle} onClick={() => goToPage(pageNumber)}>
            {pageNumber}
          </Box>
        ))}
      </Box>
      </Grid>
  );
}