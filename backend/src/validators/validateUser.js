const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().required().email(),
  hashpassword: Joi.string().required(),
  confirmPassword: Joi.any().strip(),
});

const validateUser = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateUser;
