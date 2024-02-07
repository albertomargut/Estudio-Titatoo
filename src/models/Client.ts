import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany, ChildEntity } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"

// -----------------------------------------------------------------------------

@Entity("clients")
export class Client {

    @PrimaryGeneratedColumn()
    id!: number

    // @Column()
    // first_name!: string

    // @Column()
    // last_name!: string

    // @Column()
    // phone_number!: string
 
    @Column()
    gender?: string;
 
    @Column()
    nationality?: string;

   
    @OneToOne(() => User, (user) => user.client)
    @JoinColumn({name: "user_id"})
    user!: User;


     @OneToMany(() => Appointment, (appointment) => appointment.client)
     appointment!: Appointment[];


 }
  
