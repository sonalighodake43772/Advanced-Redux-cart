import { createSlice } from "@reduxjs/toolkit";

const cartItemState = { items: [], totalQuantity: 0,changed :false };

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: cartItemState,
  reducers: {
    getdata(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemHandler(currState, actions) {
      const addItem = actions.payload;
      const existingItem = currState.items.find(
        (item) => item.id === addItem.id
      );
      currState.totalQuantity++;
      currState.changed=true;
      if (!existingItem) {
        currState.items.push({
          id: addItem.id,
          title: addItem.title,
          price: addItem.price,
          quantity: 1,
          totalPrice: addItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + addItem.price;
      }
    },
    removeItemHandler(currState, actions) {
      const id = actions.payload;
      const existingItem = currState.items.find((item) => item.id === id);
      currState.totalQuantity--;
      currState.changed=true;
      if (existingItem.quantity === 1) {
        currState.items = currState.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartItemAction = cartItemsSlice.actions;
export default cartItemsSlice.reducer;