const { Joi, celebrate } = require('celebrate');
const REGEXP_URL = require('../utils/constants');

const checkValidityId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const checkValidityCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEXP_URL),
  }),
});

const checkValidityUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEXP_URL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkValidityLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  checkValidityId,
  checkValidityCard,
  checkValidityUser,
  checkValidityLogin,
};
