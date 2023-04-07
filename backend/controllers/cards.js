const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, owner: req.user, link })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Проверьте введённые данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(card.owner) !== req.user._id) {
        throw new ForbiddenError(
          'Вы не можете удалить карточку другого пользователя',
        );
      }
      return card
        .deleteOne()
        .then(res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введён некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

const updateLike = (req, res, next, method) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new ValidationError(
            'При обновлении карточки были переданы некорректные данные',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  updateLike(req, res, next, '$addToSet');
};
module.exports.dislikeCard = (req, res, next) => {
  updateLike(req, res, next, '$pull');
};
