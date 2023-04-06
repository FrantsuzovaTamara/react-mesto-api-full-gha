const router = require('express').Router();
const { checkValidityUser, checkValidityLogin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', checkValidityUser, createUser);

router.post('/signin', checkValidityLogin, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(
    new NotFoundError(
      'Страница не найдена! Проверьте правильно ли введена ссылка',
    ),
  );
});

module.exports = router;
