import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
      },
      foodtype: {
        type: String,
        required: [true, "Please add type of food"],
      },
      address: {
        type: String,
        required: [true, "Please add an address"],
      },
      province: {
        type: String,
        required: [true, "Please add a province"],
      },
      postalcode: {
        type: String,
        required: [true, "Please add a postalcode"],
        maxlength: [5, "Postalcode cannot be more than 5 digits"],
      },
      tel: {
        type: String,
      },
      picture: {
        type: String,
        required: [true, "Please add URL to restaurant picture"],
      },
    }
  );

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant",RestaurantSchema)

export default Restaurant;