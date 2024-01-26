import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User"

// -----------------------------------------------------------------------------

@Entity("roles")
export class Role {
@PrimaryGeneratedColumn()
id!: number

@Column()
name!: string

// N:N con User
@ManyToMany(() => User, (user) => user.roles)
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
users?: User[];
}
 


