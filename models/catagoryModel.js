import mongoose from "mongoose";

const catagoryModel = mongoose.Schema({
  title: {
    type: String,
  },

  photo: {
    type: String, 
  },

 
}, {
  timestamps: true
});

const CatagoryModel = mongoose.model("Catagory", catagoryModel);

export default CatagoryModel;
