import { AppDataSource } from "../data-source";
import { ClientFactory } from "../factories/ClientFactory";
import { Client } from "../../models/Client";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------


export const clientSeeder = async () => {
   try {
      
      await AppDataSource.initialize();

      const count = 20;

  
      await seedClientsWithUser(count);

      console.log("Seeding clients successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {

      await AppDataSource.destroy();
   }
};

export const seedClientsWithUser = async (count : number) => {
  
   const clientRepository = AppDataSource.getRepository(Client);
   const clientFactory = new ClientFactory(clientRepository);

   
   const users = await seedUsersWithRoles({
      roles: [UserRoles.CLIENT],
      count: count,
   });

  
   const clients = clientFactory.createMany(count);

   
   clients.forEach((client, index) => {
      client.user = users[index];
   });

   
   await clientRepository.save(clients);

   return clients;
};
