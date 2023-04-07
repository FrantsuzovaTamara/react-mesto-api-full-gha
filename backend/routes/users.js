const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const REGEXP_URL = require('../utils/constants');
const {
  getUser,
  getUsers,
  getUserById,
  changeProfileInfo,
  changeAvatar,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  changeProfileInfo,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(REGEXP_URL).required(),
    }),
  }),
  changeAvatar,
);
router.get('/', getUsers);
router.get(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

module.exports = router;
