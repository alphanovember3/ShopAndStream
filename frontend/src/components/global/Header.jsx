import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from "../../slices/auth/userApiSlice";
import { deleteCart  } from '../../slices/cart/cartSlice';
import { logout } from "../../slices/auth/authSlice";
import { useNavigate , useLocation } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const drawerWidth = 240;

function Header(props) {
  const { windowPanel } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logoutApiCall ] = useLogoutMutation();

  const logoutHandler = async() => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(deleteCart());
      navigate('/login')
    }catch(err){
      console.log(err);
    }
  }

  const visitProfile = async() => {
    navigate('/profile')
  }

  const location = useLocation();
  // Check if the current route is the one that redirects to OTT movies
  const isOttMoviesRoute = location.pathname === '/ott' ;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {isOttMoviesRoute ? 'Netli' : 'Ecoiner' } 
      </Typography>
      <Divider />
      <List>
        <ListItem  disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary='Login' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = windowPanel !== undefined ? () => windowPanel().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color={ isOttMoviesRoute ?  'transparent' : 'background' } elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            to='/'
            sx={{ flexGrow: 1, display: { sm: 'block' } , textDecoration : 'none' , fontWeight : 'bold'}}
            color={ isOttMoviesRoute ? 'red' : 'black'}
          >
            {isOttMoviesRoute ? 'Netli' : 'Ecoiner' }
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {
              userInfo ? (
                <>
                  { isOttMoviesRoute ? (
                    null
                  ) : (
                    <Button 
                      variant='contained' 
                      color='secondary' 
                      size='large'
                      onClick={() => {
                        // navigate( '/ott' , { replace : true })
                        window.open('/ott' , '_blank');
                        console.log("he");
                      }}
                      startIcon={<LiveTvIcon />}
                    >
                      Stream Movie
                    </Button>
                  )}
                  <Button sx={ isOttMoviesRoute ? {color : 'white'} : { color : 'black'}} onClick={visitProfile}>{userInfo.name}</Button>
                  <Button variant='contained' onClick={logoutHandler} color='error'>Logout</Button>

                  {
                    isOttMoviesRoute ? 
                    (
                      null
                    ) : (
                      <Badge
                        badgeContent={cart.length}
                        color='secondary'
                        invisible = { cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge" : {
                                right : 5,
                                top : 5,
                                padding : "0 , 4px",
                                height : "14px",
                                minWidth : "13px"
                            }
                        }}
                      > 
                        <IconButton variant='contained' sx={{ mx : 0.5}} onClick={() => { navigate('/cart')}}>
                          <ShoppingCartIcon  sx={{ color : 'black'}}/>
                        </IconButton>
                      </Badge>
                    )
                  }
                  
                </>
                
              ) : (
                <Button   sx={{ mx : 0.5 , color : 'black'}} startIcon={<PersonIcon />} component={Link} to='/login'>
                  Login
                </Button>
              )
            }
              
            {/* <IconButton color='secondary' >
              <CallIcon />
            </IconButton> */}
            
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}


export default Header;
