//const contacts = require("../models");
const Contact = require("../models/contactSchema");
//const { catchAsync } = require("../utils");

module.exports = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (+page - 1) * +limit;
  const query = { owner };

  if (favorite) query.favorite = favorite === "true";

  result = await Contact.find(query)
    .skip(skip)
    .limit(limit)
    .populate("owner", "-_id, email");

  // const { id } = req.user;
  // const params = { id, ...req.query };
  // const result = await contacts.listContacts(params);

  res.status(200).json(result);
};
