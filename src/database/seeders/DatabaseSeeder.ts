import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { clientSeeder }  from "./ClientSeeder";
import { artistSeeder }  from "./ArtistSeeder";
import { appointmentSeeder } from "./AppointmentSeeder";

(async() => {
    await roleSeeder();
    await userSeeder();
    await clientSeeder();
    await artistSeeder();
    await appointmentSeeder();

})();