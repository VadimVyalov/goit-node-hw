const { catchAsync } = require("../utils");
const {
  //listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts");

const listContacts = require("./listContacts");

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
  listContacts: catchAsync(listContacts),
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  sendVerify,
  verifyEmail,
};
