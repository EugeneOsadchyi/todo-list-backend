import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from './index';

const SALT_ROUNDS = 10;

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;

  matchesPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

export default User;
