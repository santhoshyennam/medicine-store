import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import OrderItem from '../../molecules/OrderItem';
import { useNavigate } from 'react-router-dom';
import LandingLoader from '../../molecules/Loader';
import axios from 'axios';
import { BACKEND_URL, Order } from '../../../utils';


const Orders = (props: any) => {
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user_details') || '{}');
        if (!user || Object.keys(user).length === 0) {
          navigate({ pathname: '/login' });
        } else {
          setLoading(true);
          const response = await axios.get<Order[]>(`${BACKEND_URL}/orders-for-customer?customer_id=${user.customer.id}`);
          setOrders(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div>
      {loading ? <LandingLoader /> : getComponent()}
    </div>
  );

  function getComponent() {
      if(orders.length === 0) 
        return <EmptyOrdersComponent />
      else
        return renderOrders()
  }

  function renderOrders() {
    const orderItems = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      orderItems.push(<OrderItem key={order.id} order={order} />);
    }

    return orderItems;
  }

  function EmptyOrdersComponent() {
    return (
      <Box>
        <Typography variant="subtitle1" sx={{ color: '#000000', fontWeight: '14px', fontFamily: 'inherit', fontSize: '28px', marginLeft: '10px', marginTop: 3 }}>
          You haven't ordered anything! Please Order Now.
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 1, width: '30%' }} onClick={() => { navigate({ pathname: '/' }) }}>
          Browse Medicines
        </Button>
      </Box>
    );
  }
};

export default Orders;
