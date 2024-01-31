const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  year: Joi.number().required(),
  console: Joi.string().required(),
  genre_id: Joi.number(),
  genre_label: Joi.string(),
});

const validateGame = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateGame;
