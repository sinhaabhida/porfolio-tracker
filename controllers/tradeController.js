const { addTradeSchema, updateTradeSchema, deleteTradeSchema } = require('../validation/tradeValidations');
const { getTrades, addTrade, updateTrade, deleteTrade } = require('../repository/tradeRepository');
const { getTradeList } = require('../service/tradeService');

/**
 * Returns list of all trades with ticker as key
 * @param {object} _ req object
 * @param {object} res response object
 */
async function getAllTrades(_, res) {
  try {
    const trades = await getTrades();
    res.json(getTradeList(trades));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Helps in Adding a trade
 * @param {object} _ req object
 * @param {object} res response object
 */
async function insertTrade(req, res) {
  try {
    const { error } = addTradeSchema.validate(req.body);
    if(error){
      res.status(400).json({ message: error.message });
      return;
    }
    const tradeDetails = req.body;
    await addTrade(tradeDetails);
    res.json({ message: 'Trade Successfully Added' });
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
}


/**
 * Helps in Updating a trade
 * @param {object} _ req object
 * @param {object} res response object
 */
async function modifyTrade(req, res) {
  try {
    const { error } = updateTradeSchema.validate(req.body);
    if(error){
      res.status(400).json({ message: error.message });
      return;
    }
    const tradeDetails = req.body;
    await updateTrade(tradeDetails);
    res.json({ message: 'Trade Successfully Updated' });
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
}


/**
 * Helps in Removing a trade
 * @param {object} _ req object
 * @param {object} res response object
 */
async function removeTrade(req, res) {
  try {
    const { error } = deleteTradeSchema.validate(req.params);
    if(error){
      res.status(400).json({ message: error.message });
      return;
    }
    const tradeId = req.params.id;
    await deleteTrade(tradeId);
    res.json({ message: 'Trade Successfully Deleted' });
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
}

module.exports = { getAllTrades, insertTrade, modifyTrade, removeTrade };
