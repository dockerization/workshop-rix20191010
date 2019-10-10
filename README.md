# DOCKERIZATION

## Architecture

![Architecture](/architecture_diagram.png)

Application consists of four services:

- Interface - frontend in another words. It render view and proxy requests to logic.
- Logic - is a heart of application. All business logic is here.
- Charger - emulates card charging.
- Filler - fills vending machine with products.
