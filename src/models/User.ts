import { Column, Entity, OneToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Role } from "./Role" 
import { Client } from "./Client"
import { Artist } from "./Artist"

// -----------------------------------------------------------------------------

@Entity("users")
// @TableInheritance({column: {type: "varchar", name: "type"}})
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique : true})
    username!: string;

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    
    @Column()
    phone_number!: string

    @Column()
    password_hash!: string;

    @Column({unique : true})
    email!: string;

   //  @ManyToOne(() => Role, (role) => role.users)
   //  @JoinColumn ({name: "role_id"})
   //  roles!: Role[];
   @ManyToMany(() => Role, (role) => role.users)
   @JoinTable({
      name: "users_roles",
      joinColumn: {
         name: "user_id",
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "role_id",
         referencedColumnName: "roleid",
      },
   })
   roles!: Role[];
   
   
   @OneToOne(() => Client, (client) => client.user)
   client?: Client;

  
    @OneToOne(() => Artist, (artist) => artist.user)
    artist?: Artist;
 }
  

 




