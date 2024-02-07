import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class UserFactory extends BaseFactory<User> {
  protected generateSpecifics(user: User): User {
    user.username = faker.internet.userName();
    user.password_hash = bcrypt.hashSync("12345678", 10);
    user.email = faker.internet.email({
      allowSpecialCharacters: true,
    });
    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();
    user.phone_number = faker.phone.number();
    
    return user;
  }
}
