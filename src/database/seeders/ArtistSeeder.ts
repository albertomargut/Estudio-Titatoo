import { AppDataSource } from "../data-source";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Artist } from "../../models/Artist";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de estudiantes y su almacenamiento en la base de datos.
 */
export const artistSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 10;

      // Llamar a la función para crear estudiantes con usuarios asociados
      await seedArtistsWithUser(count);

      // Imprimir mensaje de éxito
      console.log("Seeding artists successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedArtistsWithUser = async (count: number) => {
   // Obtener repositorios y fábricas necesarios
   const artistRepository = AppDataSource.getRepository(Artist);
   const artistFactory = new ArtistFactory(artistRepository);

   // Generar usuarios asociados a roles de aristas
   const users = await seedUsersWithRoles({
      roles: [UserRoles.ARTIST],
      count: count,
   });

   // Generar artistas
   const artists = artistFactory.createMany(count);

   // Asignar artistas a cada cliente
   artists.forEach((artist, index) => {
      artist.user = users[index];
   });

   // Guardar artistas en la base de datos
   await artistRepository.save(artists);

   return artists;
};
