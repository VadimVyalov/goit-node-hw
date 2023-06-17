const contacts = require("../models");
const { catchAsync } = require("../utils");

const listContacts = catchAsync(async (req, res) => {
  const { id } = req.user;
  const params = { id, ...req.query };
  const result = await contacts.listContacts(params);
  res.status(200).json(result);
});

const getById = (req, res) => {
  res.status(200).json(req.data);
};

const removeContact = catchAsync(async (req, res) => {
  const { id } = req.data;
  const result = await contacts.removeContact(id);
  res.status(200).json(result);
});

const addContact = catchAsync(async (req, res) => {
  const { id: owner } = req.user;
  const result = await contacts.addContact({ ...req.body, owner });
  res.status(201).json(result);
});

const updateContact = catchAsync(async (req, res) => {
  const { id } = req.data;
  const result = await contacts.updateContact(id, req.body);
  res.status(200).json(result);
});

const updateStatusContact = catchAsync(async (req, res) => {
  const { id } = req.data;
  const result = await contacts.updateContact(id, req.body);
  console.log(req.body);
  res.status(200).json(result);
});

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
