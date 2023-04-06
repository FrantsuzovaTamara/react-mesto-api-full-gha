const router = require('express').Router();
const { checkValidityId, checkValidityCard } = require('../middlewares/validation');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', checkValidityCard, createCard);
router.delete('/:_id', checkValidityId, deleteCard);
router.put('/:_id/likes', checkValidityId, likeCard);
router.delete('/:_id/likes', checkValidityId, dislikeCard);

module.exports = router;
