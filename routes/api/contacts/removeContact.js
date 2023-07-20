module.export = async (req, res) => {
  const { id } = req.data;
  const result = await contacts.removeContact(id);
  res.status(200).json(result);
};
