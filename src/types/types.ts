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

export interface CreateAppointmentsRequestBody {
   user_id: number;
   artist_id: number;
   client_id: number;
   date: Date;
   time: string,

}
 
 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 

 export interface TokenData {
  userId: string;
  userRoles: string[];
}