import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    if(localStorage.getItem("cart")){
      try {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      } catch (error) {
        console.error(error);
        localStorage.clear()
      }
    }
  }, [])
  

  const saveCart = (myCart) =>{
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart = () =>{
    setCart({});
    saveCart({});
    console.log("cart has been cleared");
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode];
    }

    setCart(newCart)
    saveCart(newCart);
  }

  return (
    <>
      <Navbar key={subTotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart = {clearCart} subTotal={subTotal} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart = {clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
