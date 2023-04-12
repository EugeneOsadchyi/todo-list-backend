import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import User from './user';

class Todo extends Model {
  id!: number;
  title!: string;
  completed!: boolean;
  userId!: number;

  public toJSON(): object {
    const { id, title, completed } = this;
    return { id, title, completed };
  }

  static toJSON(todos: Todo[]): object[] {
    return todos.map((todo) => todo.toJSON());
  }
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
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

Todo.belongsTo(User);
User.hasMany(Todo);

export default Todo;
