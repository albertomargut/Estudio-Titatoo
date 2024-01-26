import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { seedClientsWithUser } from "./ClientSeeder";
import { count } from "console";


// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de matriculas y su almacenamiento en la base de datos.
 */
export const appointmentSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Obtener repositorios y fábricas necesarios
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointmentFactory = new AppointmentFactory(appointmentRepository);

      // Número de estudiantes y cursos a generar
      const clientsCount = 100;

      // Crear estudiantes con usuario y rol 'student'
      const clients = await seedClientsWithUser(clientsCount);

      // Generar matrículas
      const appointments = appointmentFactory.createMany(clientsCount);

      // Asignar estudiante y curso a las matrículas
      appointments.map((appointment, index) => {
         appointment.client = clients[index];
      });

      // Guardar matrículas en la base de datos
      await appointmentRepository.save(appointments);

      // Imprimir mensaje de éxito
      console.log("Seeding appointments successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};
