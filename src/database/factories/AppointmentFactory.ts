import { faker } from "@faker-js/faker";
import { Appointment } from "../../models/Appointment";
import { BaseFactory } from "./BaseFactory";

// -----------------------------------------------------------------------------

export class AppointmentFactory extends BaseFactory<Appointment> {
   protected generateSpecifics(appointment: Appointment): Appointment {
      appointment.appointment_date = faker.date.recent();
      appointment.status = faker.helpers.arrayElement(["scheduled", "canceled"]);
      appointment.tattoo_style = faker.helpers.arrayElement(["Old school", "Japanese", "Traditional", "Tribal", "Blackwork"]);

      return appointment;
   }
}
