import { Column, Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, ChildEntity} from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

// -----------------------------------------------------------------------------

@Entity("artists")
export class Artist {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  tattoo_style?: "Old school" | "Japanese" | "Traditional" |  "Tribal" | "Blackwork";

  @Column()
  work_experience?: number;

  
  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;

  
  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  appointment!: Appointment[];


}
