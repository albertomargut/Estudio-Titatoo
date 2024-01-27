import { AppDataSource } from "../data-source";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Artist } from "../../models/Artist";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------


export const artistSeeder = async () => {
   try {
     
      await AppDataSource.initialize();

      
      const count = 10;

      
      await seedArtistsWithUser(count);

    
      console.log("Seeding artists successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
  
      await AppDataSource.destroy();
   }
};

export const seedArtistsWithUser = async (count: number) => {
   
   const artistRepository = AppDataSource.getRepository(Artist);
   const artistFactory = new ArtistFactory(artistRepository);

   
   const users = await seedUsersWithRoles({
      roles: [UserRoles.ARTIST],
      count: count,
   });

   
   const artists = artistFactory.createMany(count);

  
   artists.forEach((artist, index) => {
      artist.user = users[index];
   });

  
   await artistRepository.save(artists);

   return artists;
};
