# Charger

> Credit card charge emulator

## Description

It's a [PHP](http://php.net/) application.

Install all dependencies running `composer install` command.

To start application, enter `public` directory and type:

```bash
php -S 0.0.0.0:6082
```

## Routes

### POST /payment

> Charges provided credit card.

Request body:

```json
{
  "ccnum": "123*123",
  "pin": "123",
  "name": "Ivan Ivanov",
  "description": "Cola",
  "price": "2.20"
}
```

Response:

```json
{
  "success": "bool",
  "message": "string"
}
```

And create some cards in `storage`.
