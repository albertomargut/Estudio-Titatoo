import { Request, Response } from "express";
import {CreateClientRequestBody, LoginUserRequestBody, ClientTokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Client } from "../models/Client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Artist } from "../models/Artist";

// -----------------------------------------------------------------------------

export class AuthClientController {
   async registerClient(
      req: Request<{}, {}, CreateClientRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, last_name, phone_number } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const clientRepository = AppDataSource.getRepository(Client);
      

      try {
         
         const newUserClient: User = {
            username,
            first_name,
            last_name,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.CLIENT],
            client: new Client,
            artist: new Artist
         };
         await userRepository.save(newUserClient);

         
         const newClient: Client = {
            user: newUserClient,
            first_name,
            last_name,
            email,
            password: bcrypt.hashSync(password,10),
            phone_number
         };
         await clientRepository.save(newClient);

         res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating user",
         });
      }
   }

   async login(
      req: Request<{}, {}, LoginUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         
         if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Email or password is required",
            });
         }

         
         const user = await userRepository.findOne({
            where: {
               email: email,
            },
            relations: {
               roles: true,
            },
            select: {
               roles: {
                  name: true,
               },
            },
         });

        
         if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         
         const isPasswordValid = bcrypt.compareSync(
            password,
            user.password_hash
         );

       
         if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         

         const roles = user.roles.map((role) => role.name);

         const tokenPayload: ClientTokenData = {
            user_id: user.id?.toString() as string,
         };

         const token = jwt.sign(tokenPayload, "123", {
            expiresIn: "3h",
         });

         res.status(StatusCodes.OK).json({
            message: "Login successfully",
            token,
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while login",
            error,
         });
      }
   }
}
