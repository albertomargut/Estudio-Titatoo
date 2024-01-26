import { Request, Response } from "express";
import {CreateArtistRequestBody, LoginUserRequestBody, ArtistTokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Artist } from "../models/Artist";

// -----------------------------------------------------------------------------

export class AuthArtistController {
   async registerArtist(
      req: Request<{}, {}, CreateArtistRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, last_name, phone_number } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const artistRepository = AppDataSource.getRepository(Artist);

      try {
         // Crear nuevo usuario
         const newUserArtist: User = {
            username,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.ARTIST],
         };
         await userRepository.save(newUserArtist);

         // Crear un artist
         const newArtist: Artist = {
            user: newUserArtist,
            first_name,
            last_name,
            email,
            password: bcrypt.hashSync(password,10),
            phone_number
         };
         await artistRepository.save(newArtist);

         res.status(StatusCodes.CREATED).json({
            message: "Artist created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating artist",
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

         const tokenPayload: ArtistTokenData = {
            artist_id: user.id?.toString() as string,
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
