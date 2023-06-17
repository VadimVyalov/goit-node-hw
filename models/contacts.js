const Contact = require("./contactSchema");

/**
 * Get list contacts from db
 */

const listContacts = async (params) => {
  try {
    const { id: owner, page = 1, limit = 10, favorite } = params;
    return await Contact.find({ owner }).populate("owner", "-_id, email");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get unique contact by id from db
 * @param {string} id - search contact id
 *
 */

const getById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    console.log(error);
  }
};

/**
 * remove unique  contact by id from db
 * @param {string} id - search contact id
 *
 */

const removeContact = async (id) => {
  try {
    await Contact.findByIdAndDelete(id);
    return { message: "contact deleted" };
  } catch (error) {
    console.log(error);
  }
};

/**
 * add new contact to db
 * @param {object} body {name, email, phone} new contact
 *
 */

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.log(error);
  }
};

/**
 * update exist contact in db
 * @param {object} body {name, email, phone} new contact
 *
 */

const updateContact = async (id, body) => {
  try {
    return await Contact.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
