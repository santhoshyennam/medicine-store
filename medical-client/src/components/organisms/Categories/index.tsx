import {  Box, Grid, Paper, Typography } from '@mui/material';
import { useCategories } from './hook';
import { useNavigate } from 'react-router-dom';
import LandingLoader from '../../molecules/Loader';

export default function Categories(props:any) {
  const { categories, loading} = useCategories();
  const navigate = useNavigate()
  return (
      loading ? <LandingLoader/> :
      <Grid container spacing={4}>
          {categories.map((category:any) => (
             <Grid item key={category.id} marginTop={1} height={120} padding={2} style={{cursor:'pointer',marginTop:'40px'}}>
               <Paper elevation={3} sx={{ padding: 4, height: '100%',width:'300px' }}>
                <Box sx={{display:'flex',alignItems:'center'}} onClick={()=>{navigate({ pathname: './'+category.id })}}>
                    <img src={category.image_url} alt="" style={{ width: '80px',height:'80px',cursor:'pointer' }} />
                    <Typography variant="subtitle1" sx={{ color: '#8897A2',fontWeight:'8px', fontSize: '14px',marginLeft:'10px', marginTop: 1 }}>
                        {category.name}
                    </Typography>
                </Box>  
               </Paper>
           </Grid>
          ))}
      </Grid> 
  );
}