/**
 * Returns a list of all trades with ticker as key
 * @param {array} trades list of all trades in arrays format
 */
function getTradeList(trades){
  return trades.reduce((result, currentTrade) =>
  ({
    ...result,
    [currentTrade.ticker]: (result[currentTrade.ticker] || []).concat(currentTrade)
  }), {});
}

/**
 * Returns a average buy price based on current trade summary and current trade
 * @param {object} tradeSummary summary of all trades till a point
 * @param {object} currentTrade details of current trade
 * @param {number} qtyAfterTrade total trade qty after considering current trade
 */
function getAvgPrice({ totalQty, avgPrice }, { qty, tradeType, price }, qtyAfterTrade){
  if(tradeType === 'BUY'){
    if(totalQty > 0){
      return ((totalQty * avgPrice) + (price * qty)) / qtyAfterTrade;
    } else {
      return price;
    }
  } else {
    return qtyAfterTrade > 0 ? avgPrice : 0;
  }
}

/**
 * Returns trade summary based on list of trades (totalQty, avgBuyPrice, ticker)
 * @param {array} trades list of all trades in arrays format
 */
function getTradeOverview(trades){
  const typeMapping = { BUY: 1, SELL: -1 };
  const tradeList = getTradeList(trades);
  // Returns overview with totalQty, avgPrice and ticker
  return Object.keys(tradeList).reduce((result, curTicker) => {
    // Calculates summary for a specific ticker
    const summary = tradeList[curTicker].reduce((tradeSummary, { qty, tradeType, price }) => {
      const totalQty = tradeSummary.totalQty + (typeMapping[tradeType] * qty);
      const avgPrice = getAvgPrice(tradeSummary, { qty, tradeType, price }, totalQty);
      return { ...tradeSummary, totalQty, avgPrice };
    }, { totalQty: 0, avgPrice: 0, ticker: curTicker });
    if(summary.totalQty){
      return result.concat(summary);
    }
    return result;
  }, []);
}

/**
 * Returns cumulative returns on based on trade overview
 * @param {array} trades list of all trades in arrays format
 */
function calculateCumulativeReturns(trades){
  // Assuming current price for every ticker is 100
  const currentPrice = 100;
  const tradeOverview = getTradeOverview(trades);
  return tradeOverview.reduce((profit, { totalQty, avgPrice }) => profit + ((currentPrice * totalQty) - (avgPrice * totalQty)), 0);
}

module.exports = { getTradeList, getTradeOverview, calculateCumulativeReturns };
