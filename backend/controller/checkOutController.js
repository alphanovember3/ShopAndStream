import Cart from '../models/Cart.js';
import PurchaseHistory from '../models/PurchaseHistory.js';
import Reward from '../models/Reward.js';

import expressAsyncHandler from "express-async-handler";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OXLhdSE2hrDrRzawttAqlSSAHoOqdPtMkMAy9jGBREP6D1Vdq3PyE7IKXjRjk5pKiUPuCfw62fG54E56ZgUXcir00xhDLLgbA');

/**
 * @description make paymrnt using stripe
 * @route POST /api/checkout
 * @access private
*/
const checkOut = expressAsyncHandler(async(req,res) => {

  const { products , email, userName, userId, totalPrice  } = req.body;

  const userExists = await Reward.findOne({ user : userId});
  console.log(userExists);
  console.log(totalPrice);

  try {
    //retriving items from cart:
    const lineItems = await Promise.all(
      products.map(async(product) => {
        return {
          price_data : {
            currency : "usd",
            product_data : {
              name : product.name,
            },
            unit_amount : product.price * 100,
          },
          quantity : product.quantity
        }
      })
    );

    // creating stripe sesssion 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // "billing_address_collection": "XXXXX",
      line_items : lineItems,
      customer_email : email,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/failure',
    });
    
    if(session.id){
      if(userExists){
        if(totalPrice > 500 && products.category === 'electronic'){
          userExists.reward += 40;
          await userExists.save();
        }else if(totalPrice > 600 && products.category === 'clothing'){
          userExists.reward += 60;
          await userExists.save();
        }
        else {
          userExists.reward += 20;
          await userExists.save();
        }
      }
    }
    // console.log(session.id)
    res.status(200).json( { id : session.id } )
    // return { id: session.id };


  } catch (error) {
    res.send(error)
  }
});


export {
  checkOut
}