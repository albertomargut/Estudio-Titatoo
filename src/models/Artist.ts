import { Column, Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, ChildEntity} from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

// -----------------------------------------------------------------------------

@Entity("artists")
export class Artist {
  @PrimaryGeneratedColumn()
  id?: number;

  // @Column()
  // first_name!: string;

  // @Column()
  // last_name!: string;

  // @Column()
  // email!: string;

  // @Column()
  // password!: string;

  // @Column()
  // phone_number!: string;

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
