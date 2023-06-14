const { Schema, model } = require("mongoose");
const { mongooseError } = require("../utils");

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contact.post("save", mongooseError);
const Contact = model("contact", contact);

module.exports = Contact;
