module.export = (req, res) => {
  res.status(200).json(req.data);
};
