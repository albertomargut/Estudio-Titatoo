import { Column, Entity, OneToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role" 
import { Client } from "./Client"
import { Artist } from "./Artist"

// -----------------------------------------------------------------------------

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique : true})
    username!: string;

    @Column()
    password_hash!: string;

    @Column({unique : true})
    email!: string;

  // N:N con Role
   @ManyToMany(() => Role, (role) => role.users)
   @JoinTable({
      name: "users_roles",
      joinColumn: {
         name: "user_id",
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "role_id",
         referencedColumnName: "id",
      },
   })
   roles!: Role[];
   
     // 1:1 con Clients 
   @OneToOne(() => Client, (client) => client.user)
   client?: Client;

    // 1:1 con Artists 
    @OneToOne(() => Artist, (artist) => artist.user)
    artist?: Artist;
 }
  

 




