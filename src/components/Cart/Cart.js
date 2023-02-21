import { useSelector } from 'react-redux/es/exports';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const showcart=useSelector((state)=>state.cart.toggle);
  return (
    <div>
   {showcart && 
   <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        />
      </ul>
    </Card>}
    </div>
   
  );
};

export default Cart;
