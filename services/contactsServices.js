const Contact = require("../models/contactSchema");
const { appError } = require("../utils");
class ContactsService {
  /**
   * Get list contacts from db
   */

  list = async (params) => {
    const { id: owner, page = 1, limit = 10, favorite } = params;
    const skip = (page - 1) * limit;
    const query = { owner };

    if (favorite) query.favorite = favorite === "true";

    const result = await Contact.find(query)
      .skip(skip)
      .limit(limit)
      .populate("owner", "-_id, email");

    if (!result) throw appError(404, "Not found");

    return result;
  };

  /**
   * Get unique contact by id from db
   * @param {string} id - search contact id
   *
   */

  getById = async (id) => {
    const result = await Contact.findById(id);

    if (!result) throw appError(404, "Not found");

    return result;
  };

  /**
   * remove unique  contact by id from db
   * @param {string} id - search contact id
   *
   */

  remove = async (id) => {
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

  add = async (body) => {
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

  update = async (id, body) => {
    try {
      return await Contact.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      console.log(error);
    }
  };
}
const contactService = new ContactsService();

module.exports = contactService;
