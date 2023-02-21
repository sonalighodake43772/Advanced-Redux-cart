import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './Cart-slice';
import cartItemReducer from "./Cartitem-slice"



const store = configureStore({
  reducer: {  cartVisible: cartReducer,
    cart:cartItemReducer
   },
});

export default store;