import Cart from '../models/Cart.js';
import expressAsyncHandler from "express-async-handler";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OXLhdSE2hrDrRzawttAqlSSAHoOqdPtMkMAy9jGBREP6D1Vdq3PyE7IKXjRjk5pKiUPuCfw62fG54E56ZgUXcir00xhDLLgbA');

/**
 * @description make paymrnt using stripe
 * @route POST /api/checkout
 * @access private
 */

// const checkOut = expressAsyncHandler(async(req,res) => {

//   const { amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Convert to cents
//       currency: 'usd',
//     });

//     res.status(200).json({ client_secret: paymentIntent.client_secret });
//   }catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// })

const checkOut = expressAsyncHandler(async(req,res) => {
  const { products , email, userName  } = req.body;

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
    

    // console.log(lineItems);

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

    // console.log(session.id)
    res.status(200).json( { id : session.id } )
    // return { id: session.id };


  } catch (error) {
    res.send(error)
  }
  

})


export {
  checkOut
}