const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number(),
  artist: Joi.string().required(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  musicStyle_id: Joi.number(),
  musicStyle_label: Joi.string(),
  user_id: Joi.number(),
}).unknown(false);

const validateDisc = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateDisc;
