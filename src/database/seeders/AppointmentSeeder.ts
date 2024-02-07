import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { seedClientsWithUser } from "./ClientSeeder";



// -----------------------------------------------------------------------------


export const appointmentSeeder = async () => {
   try {
      
      await AppDataSource.initialize();

      
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointmentFactory = new AppointmentFactory(appointmentRepository);

      
      const clientsCount = 100;

   
      const clients = await seedClientsWithUser(clientsCount);

   
      const appointments = appointmentFactory.createMany(clientsCount);

      
      appointments.map((appointment, index) => {
         appointment.client = clients[index];
      });

      
      await appointmentRepository.save(appointments);

    
      console.log("Seeding appointments successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
   
      await AppDataSource.destroy();
   }
};
