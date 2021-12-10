const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeFactory');
const TradesModel = require('../models/trades');

async function getTradeForID(id){
  const sequelizeConnection = await sequelize.getConnection();

  const tradesModel = TradesModel(sequelizeConnection, DataTypes);
  return tradesModel.findOne({ where: { id }, raw: true });
}

async function getTrades(ticker){
  const sequelizeConnection = await sequelize.getConnection();

  const tradesModel = TradesModel(sequelizeConnection, DataTypes);
  const where = ticker ? { ticker } : {};
  return tradesModel.findAll({ where, raw: true });
}

async function checkTradeValidity(ticker, qtyToSell, idToFilter, errorMsg, comparator = (availableQty, toSellQty) => availableQty - toSellQty){
  const tradesForTicker = await getTrades(ticker);

  const qtyAvailable = tradesForTicker.reduce((acc, curTrade) => {
    if(curTrade.id === idToFilter){
      return acc;
    }
    return curTrade.tradeType === 'SELL' ? acc - curTrade.qty : acc + curTrade.qty;
  }, 0);

  if(comparator(qtyAvailable, qtyToSell) >= 0){
    return;
  }
  throw new Error(errorMsg || 'Unable to process sell trade due to not enough holdings');
}

async function addTrade({ticker, tradeType, qty, price }){
  if(tradeType === 'SELL'){
    await checkTradeValidity(ticker, qty);
  }
  const sequelizeConnection = await sequelize.getConnection();

  const tradesModel = TradesModel(sequelizeConnection, DataTypes);
  return tradesModel.create({ ticker, tradeType, qty, price });
}

async function updateTrade({ id, ticker, tradeType, qty, price }){
  if(tradeType === 'SELL'){
    await checkTradeValidity(ticker, qty, id);
  }
  const sequelizeConnection = await sequelize.getConnection();

  const tradesModel = TradesModel(sequelizeConnection, DataTypes);
  return tradesModel.update({ ticker, tradeType, qty, price }, { where: { id }});
}

async function deleteTrade(id){
  const tradeDetail = await getTradeForID(id);
  if(!tradeDetail) {
    throw new Error('Unable to find a trade with provided id');
  }
  const { ticker, qty } = tradeDetail;
  if(tradeDetail.tradeType === 'BUY'){
    await checkTradeValidity(
      ticker,
      qty,
      parseInt(id),
      'Unable to delete trade as deleting it would result in negative holdings',
      (availableQty) => availableQty,
    );
  }
  const sequelizeConnection = await sequelize.getConnection();

  const tradesModel = TradesModel(sequelizeConnection, DataTypes);
  return tradesModel.destroy({ where: { id } });
}

module.exports = { getTrades, addTrade, updateTrade, deleteTrade };
