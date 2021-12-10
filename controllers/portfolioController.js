const { getTradeOverview, calculateCumulativeReturns } = require('../service/tradeService');
const { getTrades } = require('../repository/tradeRepository');

/**
 * Returns overview of trades
 * @param {object} _ req object
 * @param {object} res response object
 */
async function getOverview(_, res) {
  try {
    const trades = await getTrades();
    res.json(getTradeOverview(trades));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Returns cumulative returns of trades
 * @param {object} _ req object
 * @param {object} res response object
 */
async function getReturns(_, res) {
  try {
    const trades = await getTrades();
    res.json(calculateCumulativeReturns(trades));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getOverview, getReturns };
