const Joi = require("joi");

const schema = Joi.object({
  id: Joi.number(),
  originalMovieTitle: Joi.string().required(),
  image: Joi.string().required(),
  year: Joi.number().required(),
  teaser: Joi.string().required(),
  movieStyle_id: Joi.number(),
  movieStyle_label: Joi.string(),
  user_id: Joi.number(),
}).unknown(false);

const validateLaserdisc = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = validateLaserdisc;
