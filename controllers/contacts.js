const contacts = require("../models");
const { catchAsync } = require("../utils");

const listContacts = catchAsync(async (_, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
});

const getById = (req, res) => {
  const { id, name, email, phone } = req.data;
  res.status(200).json({ id, name, email, phone });
};

const removeContact = catchAsync(async (req, res) => {
  const { id } = req.data;
  const result = await contacts.removeContact(id);
  res.status(200).json(result);
});

const addContact = catchAsync(async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
});

const updateContact = catchAsync(async (req, res) => {
  const { id } = req.data;
  const result = await contacts.updateContact(id, req.body);
  res.status(200).json(result);
});

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
