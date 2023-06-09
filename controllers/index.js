const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts");

const {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  sendVerify,
  verifyEmail,
} = require("./auth");

module.exports = {
  listContacts,
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
