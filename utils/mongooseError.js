const mongooseError = (error, _, next) => {
  //console.log("mongooseError", error.name);
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.message =
    name === "MongoServerError" && code === 11000
      ? "Email in use"
      : error.message;
  //error.messages=

  next();
};
module.exports = mongooseError;
