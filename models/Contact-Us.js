import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  message: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Contact =
  mongoose.models.contactInformation || mongoose.model("contactInformation", contactSchema);

export default Contact;
