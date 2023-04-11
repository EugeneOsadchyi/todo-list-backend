const users: User[] = [];

export default class User {
  id?: number;
  name: string;
  email: string;
  passwordHash: string;
  [property: string]: any; // [property: string] is a type index signature

  constructor(name: string, email: string, passwordHash: string) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  public static async find(query: { [property: string]: string }): Promise<User | null> {
    const user = users.find((user) => (
      Object
        .keys(query)
        .every(
          key => user.hasOwnProperty(key) && (user[key] === query[key])
        )
    ));

    if (user) {
      return new User(user.name, user.email, user.passwordHash);
    }

    return null;
  }

  public async save(): Promise<void> {
    users.push(this);
  }
}
