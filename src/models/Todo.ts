const todos: Todo[] = [
];

let idx = 0;

export default class Todo {
  id: number;
  title: string;
  completed: boolean = false;

  constructor(id: number, title: string, completed: boolean = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  public static async find(id: number): Promise<Todo | null> {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      return new Todo(todo.id, todo.title);
    }

    return null;
  };

  public static async all(): Promise<Todo[]> {
    return todos.map((todo) => new Todo(todo.id, todo.title));
  }

  public static async create(title: string): Promise<Todo> {
    const todo = new Todo(++idx, title);
    todos.push(todo);
    return todo;
  }

  public static async update(id: number, changes: object): Promise<Todo | null> {
    let todo = todos.find((todo) => todo.id === id);

    if (todo) {
      todo = {...todo, ...changes};
      return new Todo(todo.id, todo.title, todo.completed);
    }

    return null;
  }

  public static async delete(id: number): Promise<boolean> {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      todos.splice(todos.indexOf(todo), 1);
      return true;
    }

    return false;
  }
}
