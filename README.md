# Todo List Application (backend)

## Application consists of
- [Backend NodeJS application (this repository)](https://github.com/EugeneOsadchyi/todo-list-backend)
- [Frontend React application](https://github.com/EugeneOsadchyi/todo-list-ui)

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
    == 20230412091240-create-users-table: migrating =======
    == 20230412091240-create-users-table: migrated (0.032s)

    == 20230412091247-create-todos-table: migrating =======
    == 20230412091247-create-todos-table: migrated (0.030s)
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

To run tests run the next command
```sh
npm test
```


## TODOs
- [ ] *Fix tests to make them run on the test database*
- [ ] Environment variables in tests
- [ ] Add support of GraphQL
- [ ] Make it running at https://todo.moneys-club.pp.ua
