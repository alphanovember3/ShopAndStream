import mongoose from "mongoose";

const RewardSchema = mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  reward : {
    type : Number,
    default : 0,
  },
  earnedAt : {
    type : Date,
    default : Date.now(),
  }
});

const Reward = mongoose.model('Reward' , RewardSchema );

export default Reward;