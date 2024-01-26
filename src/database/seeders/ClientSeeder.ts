import { AppDataSource } from "../data-source";
import { ClientFactory } from "../factories/ClientFactory";
import { Client } from "../../models/Client";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de estudiantes y su almacenamiento en la base de datos.
 */
export const clientSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 20;

      // Llamar a la función para crear clientes con usuarios asociados
      await seedClientsWithUser(count);

      // Imprimir mensaje de éxito
      console.log("Seeding clients successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedClientsWithUser = async (count : number) => {
   // Obtener repositorios y fábricas necesarios
   const clientRepository = AppDataSource.getRepository(Client);
   const clientFactory = new ClientFactory(clientRepository);

   // Generar usuarios asociados a roles de estudiantes
   const users = await seedUsersWithRoles({
      roles: [UserRoles.CLIENT],
      count: count,
   });

   // Generar estudiantes
   const clients = clientFactory.createMany(count);

   // Asignar usuario a cada estudiante
   clients.forEach((client, index) => {
      client.user = users[index];
   });

   // Guardar estudiantes en la base de datos
   await clientRepository.save(clients);

   return clients;
};
