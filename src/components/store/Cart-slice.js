import { createSlice } from '@reduxjs/toolkit';


const initialCartState = {
  
    toggle:false,
    Notification:null

  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    togglehandler(state)
    {
       state.toggle=!state.toggle; 
    },
   
    showNotification(prevState, action) {
      prevState.Notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;