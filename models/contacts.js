const fs = require("fs").promises;
const path = require("path");
const short = require("short-uuid");

const contactPath = path.join(__dirname, "./contacts.json");

/**
 * Get list contacts from file
 */

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get unique contact by id
 * @param {string} id - search contact id
 *
 */

const getById = async (id) => {
  try {
    const data = await fs.readFile(contactPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === id);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

/**
 * remove unique  contact by id
 * @param {string} contactId - search contact id
 *
 */

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const filterContacts = JSON.parse(data).filter(
      (item) => item.id !== contactId
    );
    await fs.writeFile(contactPath, JSON.stringify(filterContacts));
    return { message: "contact deleted" };
  } catch (error) {
    console.log(error);
  }
};

/**
 * append new contact to file "../contacts.json"
 * @param {object} body {name, email, phone} new contact
 *
 */

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: short.generate(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

/**
 * update exist contact in file "../contacts.json"
 * @param {object} body {name, email, phone} new contact
 *
 */

const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const indexContact = contacts.findIndex((item) => item.id === id);
    if (indexContact < 0) return;
    const updatedContact = { ...contacts[indexContact], ...body };

    contacts.splice(indexContact, 1, updatedContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return updatedContact;
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
