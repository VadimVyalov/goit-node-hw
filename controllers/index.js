const { catchAsync } = require("../utils");
// const {
//   listContacts,
//   getById,
//   removeContact,
//   addContact,
//   updateContact,
//   updateStatusContact,
// } = require("./contacts");
const contactsController = require("./contacts");
const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  sendVerify,
  verifyEmail,
} = require("./user");

module.exports = {
  // listContacts,
  // getById,
  // removeContact,
  // addContact,
  // updateContact,
  // updateStatusContact,
  contactsController,
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  sendVerify,
  verifyEmail,
};
