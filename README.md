# Todo List Application (backend)

## Application consists of
- Backend NodeJS application (this repository)
- Frontend React application

## Pre-requirements
- Postgres
- NodeJS (19.7 is currently used). [Check how to install](https://asdf-vm.com/)

## Installation instructions
1. Create `.env` from the sample and fill the blanks
    ```sh
    cp .env.sample .env
2. Unless you have Postgres database running - start it using docker-compose
    ```sh
    docker-compose up -d
    ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Run database migrations
    ```sh
    npm run db:migrate
    ```

    Output:
    ```sh
    > todo-list-backend@1.0.0 db:migrate
    > NODE_ENV=development sequelize db:migrate


    Sequelize CLI [Node: 19.7.0, CLI: 6.6.0, ORM: 6.31.0]

    Loaded configuration file "config/config.js".
    Using environment "development".
    No migrations were executed, database schema was already up to date.
    ```
5. Run the application
    ```sh
    npm start
    ```

    Output:
    ```sh
      > todo-list-backend@1.0.0 start
      > ts-node --require dotenv/config src/index.ts

      Server started on port 4000 🚀
      Executing (default): SELECT 1+1 AS result
      Connection has been established successfully.
      ```


## Tests

*Tests are currently in progress...*

To run tests run the next command
```sh
npm test
```
