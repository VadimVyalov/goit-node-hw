const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
}).messages({
  "string.min":
    "Field 'name' length must be less than or equal to {{#limit}} characters long",
  "string.email":
    "Field 'email' has invalid email format. The format should be xxx@xxx.xxx",
  "string.pattern.base":
    "Field 'phone' has invalid phone number format. The format should be (XXX) XXX-XXXX.",
});

module.exports = { contactSchema };
