import { faker } from "@faker-js/faker";
import { Client } from "../../models/Client";
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class ClientFactory extends BaseFactory<Client> {
   protected generateSpecifics(client: Client): Client {
      client.gender = faker.person.sexType();
      client.nationality = faker.location.country();

      return client;
   }
}
