import { faker } from "@faker-js/faker";
import { Client } from "../../models/Client";
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class ClientFactory extends BaseFactory<Client> {
   protected generateSpecifics(client: Client): Client {
      client.first_name = faker.person.firstName();
      client.last_name = faker.person.lastName();
      client.phone_number = faker.phone.number();
      client.gender = faker.person.sexType();
      client.nationality = faker.location.country();

      return client;
   }
}
