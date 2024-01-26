import "reflect-metadata";
import { DataSource } from "typeorm";
// import { CreateRoles1705350197322 } from "./migrations/01-CreateRoles";
// import { CreateUsers1705350206779 } from "./migrations/02-CreateUsers";
// import { CreateUsersRoles1705350214568 } from "./migrations/03-CreateUsersRoles";
// import { CreateClients1705350232840 } from "./migrations/04-CreateClients";
// import { CreateArtists1705350249551 } from "./migrations/05-CreateArtists";
// import { CreateAppointments1705350282513 } from "./migrations/06-CreateAppointments";
// import { CreateDesigns1705350297471 } from "./migrations/07-CreateDesigns";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "estudio_tatuajes",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   synchronize: false,
   logging: false,
});

// console.log(`${__dirname}/migrations`);
