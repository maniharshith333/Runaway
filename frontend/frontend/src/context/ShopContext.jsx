import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "INR";
  const delivery_fees = 90;

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Unable to load products.");
      }
    };
    getProducts();
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    setIsCartOpen(true);
    toast.success("Added to cart");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const removeFromCart = (itemId, size) => {
    const updatedCart = structuredClone(cartItems);
    if (updatedCart[itemId]?.[size]) {
      updatedCart[itemId][size] -= 1;
      if (updatedCart[itemId][size] <= 0) delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) delete updatedCart[itemId];
      setCartItems(updatedCart);

      if (token) {
        const newQuantity = updatedCart[itemId]?.[size] || 0;
        updateQuantity(itemId, size, newQuantity);
      }
    }
  };

  const deleteFromCart = async (itemId, size) => {
    const updatedCart = structuredClone(cartItems);
    if (updatedCart[itemId]?.[size]) {
      delete updatedCart[itemId][size];
      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
      setCartItems(updatedCart);

      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/update",
            { itemId, size, quantity: 0 },
            { headers: { token } }
          );
        } catch (error) {
          console.error("Failed to remove item from cart:", error);
          toast.error("Failed to remove item from server.");
        }
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  // ✅ New: Calculate total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        total += product.price * quantity;
      }
    }
    return total;
  };

  const placeOrder = (cartList) => {
    const orderId = Date.now().toString();
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString(),
      status: "Processing",
      items: cartList,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCartItems({});
    toast.success("Order placed successfully!");
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []);

  const value = {
    products,
    backendUrl,
    currency,
    delivery_fees,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    deleteFromCart,
    getCartCount,
    getCartAmount, // ✅ Added here
    isCartOpen,
    setIsCartOpen,
    navigate,
    orders,
    placeOrder,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;

