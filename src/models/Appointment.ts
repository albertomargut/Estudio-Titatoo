import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Artist } from "./Artist"

// -----------------------------------------------------------------------------

@Entity("appointments")
export class Appointment {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    artist_id!: number;

    @Column()
    client_id!: number;
  
    @Column({ type: 'date'})
    date!: Date;

    @Column({type: "time"})
    time!: Date;

    // @Column()
    // shift!: string
  
    // @Column({ default: 'scheduled' })
    // status!: "scheduled" | "canceled";
  
    @Column()
    created_at!: Date;
  
    @Column()
    updated_at!: Date;

    // @Column()
    // tattoo_style?: "Old school" | "Japanese" | "Traditional" |  "Tribal" | "Blackwork";

    @ManyToOne(() => Artist, (artist) => artist.appointment)
     @JoinColumn ({name: "artist_id", referencedColumnName: "id"})
     artist!: Artist;

    @ManyToOne(() => Client, (client) => client.appointment)
    @JoinColumn({name: "client_id", referencedColumnName: "id"})
    client!: Client;

     
     


 }