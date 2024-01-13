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
    // console.log(existingItem);

    if(existingItem){
      // If the product exists, update the quantity
      existingItem.quantity += quantity;
    }else{
      // if product is not present
      // add new product to cart
      userCart.items.push({
        productId, quantity , name, price , image
      });
    }
    await userCart.save();
    
    return res.status(200).json("Array added")
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
    return res.status(200).json("NEW CART CREATED")
  }
});



/**
 * @description Update Cart items (number of items)
 * @route PUT /api/cart/update/:cartItemid
 * @access private
*/
const removeCartItem = expressAsyncHandler(async(req,res) => {

  const productId = parseInt(req.params.id, 10);
  
  const userCart = await Cart.findOne({ user : req.user._id});
  console.log(userCart)

  if(userCart){
    
    // Check if the product already exists in the cart
    const existingItem = userCart.items.find((items) => items.productId === productId);

    // console.log(existingItem);

    if(existingItem.quantity > 1){
      // If the product exists, update the quantity
      existingItem.quantity -= 1;

      // Save the changes to the cart
      await userCart.save();

      return res.status(200).json("GOAT")
    }
    // if quantity is 1 so we cannot have item in cart with quantity "0"
    else if(existingItem.quantity === 1){
      return res.status(200).json("Quantity cannot be change")
    }
    else{
      // if product is not present
      return res.status(404).json("No item")
    }
  }else{
    
    return res.status(200).json("NO CART")
  }
  
})


/**
 * @description Delete Cart item
 * @route DELETE /api/cart
 * @access private
*/
const deleteCartItem = expressAsyncHandler(async(req,res) => {

  const itemIdToRemove = req.params.id;
  const userCart = await Cart.findOne({ user : req.user._id});

  if(userCart){
    // Find the index of the item with the specified _id
    const itemIndex = userCart.items.findIndex((item) => item._id === itemIdToRemove);
    console.log(itemIndex)

    if(itemIndex){
      // If the item with the specified _id is found, remove it from the array
      userCart.items.splice(itemIndex, 1);

      // Save the changes to the cart
      await userCart.save();

      return res.status(200).json("Item removed");
    }else{
      // If item with the specified _id is not found
      return res.status(404).json("Item not found");
    }

  }else {
    return res.status(404).json("No cart");
  }
})

export {
  addCart,
  getCart,
  removeCartItem,
  deleteCartItem
}