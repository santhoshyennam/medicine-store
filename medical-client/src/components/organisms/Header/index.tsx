import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useHeader } from './hook';
import SearchItem from '../../molecules/SearchItem';
import { deepOrange } from '@mui/material/colors';
import LandingLoader from '../../molecules/Loader';

const pages = [{ name: "Home", value:'products'},{ name: "Categories", value:'categories'},{ name: "Cart", value:'cart'}]; //, { name: "Offers", value: "products/offers" }
const settings = [{ name: "Profile", value:'profile'}, { name: "Orders", value:'orders'},{ name: "Logout", value:'logut'}];


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElMedicines, setAnchorElMedicines] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMedicineMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMedicines(event.currentTarget);
  };


  const handleCloseNavMenu = (value:string) => {
    navigate({ pathname: "./"+value+"/" })
    setAnchorElNav(null);
  };

  const handleCloseMedicineMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMedicines(null);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { isLoggedIn, logout, search, setSearch, medicines,loading,name } = useHeader()
  const navigate = useNavigate()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="app.jpeg" alt="" width={40} height={40} style={{marginRight:'10px', borderRadius:'20px',cursor:'pointer'}} onClick={()=>{navigate({ pathname: "/" })}} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={()=>{handleCloseNavMenu(page.value)}}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' } }} marginRight={10}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={()=>{ navigate({ pathname: "./"+page.value+"/" })}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        
        <Box marginRight={5}>
            <Search style={{ zIndex: 1}}>
                <SearchIconWrapper>
                <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                // onClick={()=> { navigate({ pathname: '/search-medicine' })}}
                onChange={(e:any)=>{ 
                  setSearch(e.target.value)
                  if(search.length >= 3) 
                    handleOpenMedicineMenu(e)
                }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElMedicines}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted
                PaperProps={{
                  style: {
                    maxHeight: '500px',
                    maxWidth: '500px',
                    width:'500px'
                  }}}
                open={Boolean(anchorElMedicines)}
                onClose={handleCloseMedicineMenu}
              >
                { loading ? <LandingLoader/>: medicines.map((medicine:any,index) => (
                  <Box>
                    <SearchItem product={medicine} setAnchorElMedicines={setAnchorElMedicines} />
                    <hr/>
                    </Box>
                ))}
            </Menu>
        </Box>

          <Box sx={{ flexGrow: 0 }}>
          { isLoggedIn &&  <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{name}</Avatar>
              </IconButton>
              </Tooltip>}
              { !isLoggedIn && <Tooltip title="Open settings">
                <Button variant="contained" onClick={()=>{ navigate({ pathname: './login/' })}}>Login</Button>
            </Tooltip>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                style: {
                  maxHeight: '200px',
                  maxWidth: '200px',
                  width:'200px'
                }}}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                <MenuItem key={setting.name} onClick={ () => {
                  if(index === 2)  
                    logout() 
                  else 
                    navigate({ pathname: "./"+setting.value+"/" })
                  handleCloseUserMenu()
                  }}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;