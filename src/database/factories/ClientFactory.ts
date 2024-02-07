import { faker } from "@faker-js/faker";
import { Client } from "../../models/Client";
import { BaseFactory } from "./BaseFactory";
import bcrypt from "bcrypt";

// -----------------------------------------------------------------------------

export class ClientFactory extends BaseFactory<Client> {
   protected generateSpecifics(client: Client): Client {
      // client.first_name = faker.person.firstName();
      // client.last_name = faker.person.lastName();
   //    client.password = bcrypt.hashSync("12345678", 10);
   //    client.email = faker.internet.email({
   //    allowSpecialCharacters: true,
   //  });
      // client.phone_number = faker.phone.number();
      client.gender = faker.person.sexType();
      client.nationality = faker.location.country();

      return client;
   }
}
