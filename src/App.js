import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { cartActions } from "./components/store/Cart-slice";
import Notification from "./components/UI/Notification";
import { cartItemAction } from "./components/store/Cartitem-slice";

let isIntital = true;
function App() {

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.cartVisible.Notification);

  const dispatch = useDispatch();

  useEffect(() => {

    const getCartData = async () => {
      const get = await fetch(
        "https://cart-e85fa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );

      if (!get.ok) {
        throw new Error("Get data request failed");
      }

      const data = await get.json();
      dispatch(
        cartItemAction.getdata({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    };

    getCartData().catch((error) => {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "fetching cart data failed!",
        })
      );
    });
  }, [dispatch]);


  useEffect(() => {
  
    const sentData = async () => {
  
      if (cart.changed) {
        dispatch(
          cartActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
          })
        );
      }
      const response = await fetch(
        "https://cart-e85fa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("sending data failed");
      }

      if (cart.changed) {
        dispatch(
          cartActions.showNotification({
            status: "success",
            title: "Success...",
            message: "Sent cart data succesfully!",
          })
        );
      }
    };

    if (isIntital) {
      isIntital = false;
      return;
    }
    sentData().catch((error) => {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </Fragment>
  );
}
export default App;