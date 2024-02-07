import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Artist } from "./Artist"

// -----------------------------------------------------------------------------

@Entity("appointments")
export class Appointment {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    client_id!: number;
  
    @Column()
    artist_id!: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    appointment_date!: Date;
  
    @Column({ default: 'scheduled' })
    status!: "scheduled" | "canceled";

    @Column()
    tattoo_style?: "Old school" | "Japanese" | "Traditional" |  "Tribal" | "Blackwork";

    
    @ManyToOne(() => Client, (client) => client.appointment)
    @JoinColumn({name: "client_id", referencedColumnName: "id"})
    client!: Client;

     
     @ManyToOne(() => Artist, (artist) => artist.appointment)
     @JoinColumn ({name: "artist_id", referencedColumnName: "id"})
     artist!: Artist;


 }