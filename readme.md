# This project contains a set of rest apis for tracking portfolio

## Trade Related Apis

# Get Trade List

GET {url}/trade/list

Returns a list of trades by ticker as key and array of all trades performed for that ticker

# Create a trade

POST {url}/trade
Example:
```json
Body: {
        "ticker": "AAPL",
        "tradeType": "BUY",
        "qty": 100,
        "price": 92.5
      }
```
Returns a message informing whether trade was added or if any error occurred

# Update a trade

PATCH {url}/trade
Example:
```json
Body: {
        "id": 1,
        "ticker": "AAPL",
        "tradeType": "BUY",
        "qty": 100,
        "price": 92.5
      }
```
Returns a message informing whether trade was updated or if any error occurred

# Delete a trade

DELETE {url}/trade/:id

Returns a message informing whether trade was deleted or if any error occurred

## Portfolio Related apis

# Get Portfolio Overview

GET {url}/portfolio/overview

Return portfolio overview with total buy qty and average buy price

# Get cumulative returns
GET {url}/portfolio/returns

Return cumulative returns based on portfolio overview with total buy qty and average buy price and current price assumed to be 100.
