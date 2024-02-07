import { Role } from "../models/Role";

// -----------------------------------------------------------------------------


export const UserRoles = {
   ADMIN: { roleid: 1, role_name: "admin" } as Role,
   CLIENT: { roleid: 2, role_name: "client" } as Role,
   ARTIST: { roleid: 3, role_name: "artist" } as Role,
};
