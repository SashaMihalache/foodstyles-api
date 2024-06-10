# Foodstyles API

This project contains the backend code for the Foodstyles API demo project.

### Technologies used

- Express.js
- Prisma
- Typescript
- Jest for tests
- Nodemon

### Architecture

Simple Restful API N-layer. Flow of processing the API request goes like this:

- router/controller layer (error handling)
- service layer (business logic)
- data/repository layer (prisma interaction)

# Getting Started

I'll guide you through the steps of setting up the project locally.

### Setup

1. Clone this repository on your machine
2. Install dependencies with `yarn install`
3. Add a `.env` file and add the required env variables (check `environment.d.ts` file)

**Postgresql Database Setup**

Note: I've used docker to setup the PostgreSQL database. Here's the official [guide](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/).

Make sure to add the env var for your `DATABASE_URL` connection string. I've used docker to and i've mapped the inside 5432 port to my laptop's 54320 port. Should look something like this:

`DATABASE_URL=postgres://postgres:testtest@localhost:54320/foodstyles_dev`

### Prisma Setup

Being the first time, we can set it up by:

1. Running `yarn db:setup` to setup the actual database and apply the migrations
2. Running `yarn db:seed` to seed from the static folder the entities we need for the demo project
3. (Optional) we can reset the db to clean it up with `yarn db:reset`

### Running the project

In order to actually run the Express.js server, we have to:

- `yarn dev` to run in dev mode with nodemon and hotreload

### Debugging

If you're using VSCode, I've also added a launch configuration that attaches to the nodemon instance and you're able to debug and hotreload at the same time the code.

### Building the project

1. Run `yarn build` in order to compile the code.
2. Run `yarn start` to run the project in release mode.

### Running test

I've tested the service layer with the examples from the documentation + some edgecases for sanity checks

1. Run `yarn test` in order to see the results
