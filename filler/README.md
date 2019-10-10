# Filler

> Service for filling vending machine

## Description

It's a [Ruby](https://www.ruby-lang.org) application.

Install all dependencies running `bundle install` command.

## Environment variables

It expecting two environment variables:

- PORT - port of running application (default: 4568)
- LOGIC_PORT - port of Logic service (default: 4567)

To start an application type:

```sh
ruby app.rb
```

## Routes

### POST /initial_fill

> Return all products that can be in vending machine.

Request:

```json
{
  "slots": "12",
  "capacity": "10"
}
```

Response:

```json
{
  "products": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "slot": "number",
      "count": "number"
    }
  ]
}
```

### POST /empty

> Return filled product.

Request:

```json
{
  "product_id": "10",
  "slot": "1",
  "capacity": "10"
}

```

Response:

```json
{
  "product": {
    "id": "number",
    "name": "string",
    "price": "number",
    "slot": "number",
    "count": "number"
  }
}
```
