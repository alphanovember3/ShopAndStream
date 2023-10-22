import User from "../models/userModel.js";
import Cart from '../models/Cart.js';
import expressAsyncHandler from "express-async-handler";

/**
 * @description get Cart Items of user
 * @route GET /api/cart
 * @access private
 */
const getCart = expressAsyncHandler(async(req,res) => {
  const cartItem = await Cart.find({ user : req.user._id });
  res.status(200).json(cartItem);
})

/**
 * @description Put Items to Cart
 * @route POST /api/cart/add
 * @access private
 */
const addCart = expressAsyncHandler(async(req,res) => {
  
  const { productId, quantity , name, price , image } = req.body;
  
  const userCart = await Cart.findOne({ user : req.user._id});

  if(userCart){
    
    // Check if the product already exists in the cart
    const existingItem = userCart.items.find((item) => item.productId === productId);

    if(existingItem){
      // If the product exists, update the quantity
      existingItem.quantity += quantity;
    }else{
      userCart.items.push({
        productId, quantity , name, price , image
      });
    }
    await userCart.save();
    
    res.status(200).json("Array added")
  }else{
    //If the user doesn't have a cart yet, create a new cart
    await Cart.create({ 
      user : req.user._id, 
      items: [
        { 
          productId, 
          quantity,
          name, 
          price, 
          image 
        }
      ] 
    });
  }
  

  res.status(200).json('added');

})

/**
 * @description Update Cart items (number of items)
 * @route PUT /api/cart/update/:cartItemid
 * @access private
 */

/**
 * @description Delete Cart item
 * @route DELETE /api/cart
 * @access private
 */

export {
  addCart,
  getCart,
}