# Logic

> The brain of the vending machine

## Description

It's a [Python](https://www.python.org/) application.

To run it, you will need:

- python 3.7
- install [flask](https://github.com/mitsuhiko/flask) and [requests](https://github.com/kennethreitz/requests) with pip

Start it with `python logic.py` and it will listen for requests on port `4567`

## Environment variables

Expecting two environment variables:

- FILLER_URL (url of filler microservice, default value: `http://localhost:4568`)
- CHARGER_URL (url of charger microservice, default value: `http://localhost:6082`)

## Routes

### POST /init

Initially vending machine is empty. This request will initialize it.

Body response:

```txt
```

### GET /product_list

Returns product list of the vending machine.

Body response:

```json
{
  "products": [
    {
      "slot": 1,
      "count": 10,
      "price": 80,
      "name": "snickers"
    },
    {
      "slot": 2,
      "count": 10,
      "price": 100,
      "name": "cola"
    }
  ]
}
```

### GET /balance

Returns current balance.

Body response:

```json
{
  "credit": 0
}
```

### POST /balance_refill

Submitted balance is added to the current balance.

Body request:

```json
{
  "credit": 50
}
```

Body response:

```json
{
  "credit": 75
}
```

### GET /balance_return

Discards current balance.

Body repsonse:

```json
{
  "credit": 0
}
```

### POST /purchase

Purchase item and correct balance.

Body request:
(type - cash)

```json
{
  "slot": 2,
  "payment": "cash",
  "payment_details": {}
}
```

(type - credit card)

```json
{
  "slot": 2,
  "payment": "card",
  "payment_details": {
    "ccnum": "1234567891234567",
    "pin": "1000"
  }
}
```

Body response:

```json
{
  "result": "success/fail/low balance/etc.",
  "credit": 45
}
```
