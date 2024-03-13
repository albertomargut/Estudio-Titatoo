import { faker } from "@faker-js/faker";
import { Client } from "../../models/Client";
import { BaseFactory } from "./BaseFactory";


// -----------------------------------------------------------------------------

export class ClientFactory extends BaseFactory<Client> {
   protected generateSpecifics(client: Client): Client {


      return client;
   }
}
