import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from './user';

class Todo extends Model {
  id!: number;
  title!: string;
  completed!: boolean;
  userId!: number;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

Todo.belongsTo(User);
User.hasMany(Todo);

export default Todo;
