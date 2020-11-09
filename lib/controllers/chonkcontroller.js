const { Router } = require('express');
const Chonk = require('../models/chonk');

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/', (req, res, next) => {
    Chonk
      .insert(req.body)
      .then(chonk => res.send(chonk))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Chonk
      .findAll()
      .then(chonks => res.send(chonks))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Chonk
      .delete(req.params.id)
      .then(chonk => res.send(chonk))
      .catch(next);
  });