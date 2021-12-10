const Joi = require('joi');

const addTradeSchema = Joi.object({
  ticker: Joi.string().required(),
  tradeType: Joi.string().valid('BUY', 'SELL').required(),
  qty: Joi.number().integer().min(1).required(),
  price: Joi.number().greater(0).required(),
});

const updateTradeSchema = Joi.object({
  id: Joi.number().integer().required(),
  ticker: Joi.string().required(),
  tradeType: Joi.string().valid('BUY', 'SELL').required(),
  qty: Joi.number().integer().min(1),
  price: Joi.number().greater(0)
});

const deleteTradeSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
});

module.exports = { addTradeSchema, updateTradeSchema, deleteTradeSchema };
