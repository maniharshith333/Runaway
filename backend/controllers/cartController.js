import userModel from "../models/user-model.js";

const addToCart = async (req, res) => {
  try {
    const { userId , itemId ,size } = req.body

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }
      else{
        cartData[itemId][size] =1;
      }
    }else{
      cartData[itemId] = {}
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({success : true , message : "added to cart"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId , itemId ,size ,quantity} = req.body;

     const userData = await userModel.findById(userId);
    let cartData= await userData.cartData;

   cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({success : true , message : "cart updated"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
try {
  const {userId} = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({success : true ,cartData });

} catch (error) {
  console.error(error);
    res.status(500).json({ success: false, message: error.message });
}
}
const deleteFromCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData;

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      // Clean up item if no sizes left
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      return res.json({ success: true, message: "Item removed from cart" });
    } else {
      return res.status(400).json({ success: false, message: "Item/size not found in cart" });
    }
  } catch (error) {
    console.error("Error in deleteFromCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addToCart, updateCart, getUserCart ,deleteFromCart };

