const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/auth");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.all("*", (_, res) => {
  res.status(404).json({
    message: "Oops! Resource not found..",
  });
});

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
