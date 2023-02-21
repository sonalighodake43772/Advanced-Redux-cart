import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Cart-slice';

const CartButton = (props) => {
  const dispatch=useDispatch();
  const cartVisibleHandler=()=>
  {
    dispatch(cartActions.togglehandler());
  }

  return (
    <button className={classes.button} onClick={cartVisibleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
