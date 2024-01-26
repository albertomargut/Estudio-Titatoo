import { Role } from "../models/Role";

// -----------------------------------------------------------------------------

//Definimos los Roles para nuestros usuarios como objetos para para importarlos en la asignacion de roles a nuestros usuarios.
export const UserRoles = {
   ADMIN: { id: 1, name: "admin" } as Role,
   CLIENT: { id: 2, name: "client" } as Role,
   ARTIST: { id: 3, name: "artist" } as Role,
};
