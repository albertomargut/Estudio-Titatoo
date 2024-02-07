export interface CreateClientRequestBody {
    username: string;
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    gender?: string;
    nationality?: string;
 }

 export interface CreateArtistRequestBody {
  username: string;
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  tattoo_style?: string;
}

export interface CreateAppointmentsRequestBody {
   user_id: number;
   client_id: number;
   appointment_date: Date;

}
 
 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 
 export interface ClientTokenData {
   user_id: string;
  
 }
 export interface ArtistTokenData {
   artist_id: string;
  
 }

 export interface TokenData {
  userId: string;
  userRoles: string[];
}