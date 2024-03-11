import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { seedClientsWithUser } from "./ClientSeeder";
import { seedArtistsWithUser } from "./ArtistSeeder";



// -----------------------------------------------------------------------------


export const appointmentSeeder = async () => {
   try {
      
      await AppDataSource.initialize();

      
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointmentFactory = new AppointmentFactory(appointmentRepository);

      
      const appointmentsCount = 0; //he puesto 0 para iniciar sin citas

   
      const clients = await seedClientsWithUser(appointmentsCount);
  
        
      const artists = await seedArtistsWithUser(appointmentsCount);
      

   
      const appointments = appointmentFactory.createMany(appointmentsCount);

      appointments.map((appointment, index) => {
         appointment.client = clients[index];
         appointment.artist = artists[index];

         
      });



      await appointmentRepository.save(appointments);

      

   
      // const artists = await seedArtistsWithUser(appointmentsCount);

   
      // const artistAppointments = appointmentFactory.createMany(appointmentsCount);

      
      // artistAppointments.map((artistAppointment, index) => {
      //    artistAppointment.artist = artists[index];
         
      // });


      
      // await appointmentRepository.save(artistAppointments);

    
      console.log("Seeding appointments successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
   
      await AppDataSource.destroy();
   }
};
