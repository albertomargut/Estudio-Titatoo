import { faker } from "@faker-js/faker";
import { Artist } from "../../models/Artist";
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class ArtistFactory extends BaseFactory<Artist> {
   protected generateSpecifics(artist: Artist): Artist {
      artist.first_name = faker.person.firstName();
      artist.last_name = faker.person.lastName();
      artist.phone_number = faker.phone.number();
      artist.tattoo_style = faker.helpers.arrayElement(["Old school", "Japanese", "Traditional", "Tribal", "Blackwork"]);
      artist.work_experience = faker.number.int({ min: 3, max: 30 });
      
   
      return artist;
   }
}
