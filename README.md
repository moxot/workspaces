## Description

REST API Server. Didn't flesh it out due to time constraints, focusing on the implementation of the required functionality. This includes (but is not limited to):
- No proper config handling
- No tests
- Basic auth handling
- Structural concessions
- No custom logger
- Not optimal error handling

## Requirements
- Node.js 20.x

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
The app can also be run locally using Docker Compose, assuming a proper .env file setup:
```bash
docker-compose up
```

## Seed test data
```bash
npm run seed
```