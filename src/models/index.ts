import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'todo_app',
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: Error) => console.error('Unable to connect to the database:', err));

export default sequelize;
