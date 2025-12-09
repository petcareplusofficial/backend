# Documentation

## Introduction

This is a documentation for the pet-care-backend project.

## Installation

- `Install Docker`
- `Install Node Js`
- `npm install` (to install dependencies)
- Run docker on your computer
- Use `npm run services` to start the docker containers

## Setup Secret Environment Variables

- create an `.env` file in the root directory of this project
  - i should have this format
    - `PORT=3000`
    - `CREDENTIALS=name:password` (this will be used to authenticate users with mongoDB) -> CONTACT Erald to get credentials to access mongoDB Database.
    - `API_PREFIX=/api/v1/petcare` (this will be used to have a prefixx for all the routes automatically. And also to update
    when we will update the api version)
    - `CLIENT=localhost:5000` : this will be the url that our react app will be running
    - `REDIS_URL="redis://localhost:6379"` this wil be for the redis client
- Use `npm run dev` to start the server

## Architecture

## Authentication and Authorization
To have a strong and secure api we are going to establish a secure connection between the client and the server.

How it will be done.
- `CORS` we are going to use `cors` package to prevent cross origin requests from untrusted sources and only allows our frontend to make requests to the server. We specify the allowed origin inside the `.env` file with the key `client`.
- `JWT` we are going to use jwt to create and verify our user logins and registrations. It will generate tokens from the userID, Username, Password, and Role. It will be used for authentication and authorization. We can verify a user's role just by decoding the token.
- `Redis` will be used to store user tokens and other data that will be cached in the future. Redis is a blazingly fast cache to store data its faster than databases. The perfect choice for saving user tokens. When a user will login we will store the user token and other data in redis. When a user will make an api request we will check if token is valid and also is not expired. All of it will be done by the middleware with the redis client.
- `env` will be used to store variables that will be used in the application. It is stored in env file because its a secure way to store sensitive information.
- `bcrypt` will be used to hash and verify passwords.

## Full Application Architecture

![Architecture](architecture.png)

## Development
Everything in the api section is done inside the `src` folder.

- `internal/db`-> In here the database connection is setup and the user model | table and queries are setup. (soon other will be added)
- `internal/redis`-> In here redis setup and connection is done. Redis key methods for setting and getting the data in the cache will be done here.
- `public`-> In here the HTML | CSS | JS files will be stored and served to client if needed.
- `routes`-> In here the routes of each api call will be defined by the tableName+Routes.js format. And each route will have the data for its unique purpose and table and the routes will be exported inside the main router in the app.json.
- `services`-> Business logic will be added here in the future for math problems, for graphs, for data handling, security, etc.
- `utils`-> In here we will have functions that will be reused inside the app for helping reasons like hashing password, embeding tokens, validating, etc.
- `app.js`-> Is the main file it will be used to expose the api and start the server with all the routes and services.
