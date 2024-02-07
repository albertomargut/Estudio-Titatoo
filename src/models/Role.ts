import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User"

// -----------------------------------------------------------------------------

@Entity("roles")
export class Role  {
@PrimaryGeneratedColumn()
id!: number;

@Column({ length: 50, nullable: false })
name!: string;

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
