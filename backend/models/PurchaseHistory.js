import mongoose from "mongoose";

const purchaseHistorySchema = mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  items : [
    {
      productId : {
        type : Number,
        required : true
      },
      quantity : {
        type : Number,
        required : true
      },
      name : {
        type : String,
        required : true,
      },
      price : {
        type : Number,
        required : true
      },
      image : {
        type : String
      }
    }
  ]
})

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);
export default PurchaseHistory;