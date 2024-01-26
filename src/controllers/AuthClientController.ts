import { Request, Response } from "express";
import {CreateClientRequestBody, LoginUserRequestBody, TokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Client } from "../models/Client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";


// -----------------------------------------------------------------------------

export class AuthController {
   async registerClient(
      req: Request<{}, {}, CreateClientRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, last_name, phone_number } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const clientRepository = AppDataSource.getRepository(Client);
      

      try {
         // Crear nuevo usuario
         const newUserClient: User = { 
            username,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.CLIENT],
         };
         await userRepository.save(newUserClient);

         // Crear un cliente
         const newClient: Client = {
            user: newUserClient,
            first_name,
            last_name,
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
         // Validar existencia de email y contraseña
         if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Email or password is required",
            });
         }

         // Encontrar un usuario por email
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

         // Verificar usuario inexistente
         if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Verificar contraseña si el usuario existe
         const isPasswordValid = bcrypt.compareSync(
            password,
            user.password_hash
         );

         // Verificar contraseña valida
         if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Generar token

         const roles = user.roles.map((role) => role.name);

         const tokenPayload: TokenData = {
            userId: user.id?.toString() as string,
            userRoles: roles,
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
