import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { User } from "./User"
import { Appointment } from "./Appointment"

// -----------------------------------------------------------------------------

@Entity("clients")
export class Client {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    phone_number!: string
 
    @Column()
    gender?: string;
 
    @Column()
    nationality?: string;

    // 1:1 con User 
    @OneToOne(() => User, (user) => user.client)
    @JoinColumn({name: "user_id"})
    user!: User;


     // 1:N con Appointment 
     @OneToMany(() => Appointment, (appointment) => appointment.client)
     appointment?: Appointment;


 }
  
