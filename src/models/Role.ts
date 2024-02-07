import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User"

// -----------------------------------------------------------------------------

@Entity("roles")
export class Role  {
@PrimaryGeneratedColumn()
roleid!: number;

@Column({ length: 50, nullable: false })
role_name!: string;

@ManyToMany(() => User, (user) => user.roles)
@JoinTable({
   name: "users_roles",
   joinColumn: {
      name: "role_id",
      referencedColumnName: "roleid",
   },
   inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
   },
})
users?: User[];
// @OneToMany(() => User, (user) => user.roles)
// users!: User[];

 

}
