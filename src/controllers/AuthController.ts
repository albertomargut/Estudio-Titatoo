import { Request, Response } from "express";
import { CreateClientRequestBody, CreateArtistRequestBody, LoginUserRequestBody, TokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Role } from "../models/Role";
import { Client } from "../models/Client";
import { Artist } from "../models/Artist";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthController {
    
    async register(
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email, first_name, phone_number } = req.body;


        const userRepository = AppDataSource.getRepository(User);
        const clientRepository = AppDataSource.getRepository(Client);


        try {
            const newUser = userRepository.create({
                username,
                email,
                password_hash: bcrypt.hashSync(password, 10),
                roles: [UserRoles.CLIENT],
            });
            await userRepository.save(newUser);
            
            const newClient = clientRepository.create({
              user: newUser,
            });
            await clientRepository.save(newClient);

            res.status(201).json(newClient);
          } catch (error: any) {
            console.error("Error while creating user:", error);
            res.status(500).json({
              message: "Error while creating user",
              error: error.message,
            });
          }

    }

  //   async registerArtist(
  //     req: Request<{}, {}, CreateArtistRequestBody>,
  //     res: Response
  //  ): Promise<void | Response<any>> {
  //     const { username, password, email, first_name, phone_number } = req.body;

  //     const userRepository = AppDataSource.getRepository(User);
  //     const artistRepository = AppDataSource.getRepository(Artist);


  //     // try {
         
  //     //     const newUser = userRepository.create({
  //     //         username,
  //     //         email,
  //     //         password_hash: bcrypt.hashSync(password, 10),
  //     //         roles: [UserRoles.ARTIST],
  //     //     });
  //     //     await userRepository.save(newUser);

  //     //      //Crear nuevo artista y asociarlo con el usuario recien creado
  //     //      const newArtist = artistRepository.create({
  //     //       user: newUser,
  //     //       // first_name,
  //     //       // phone_number,
  //     //     });
  //     //     await artistRepository.save(newArtist);

  //     //     res.status(201).json(newArtist);
  //     //   } catch (error: any) {
  //     //     console.error("Error while creating user:", error);
  //     //     res.status(500).json({
  //     //       message: "Error while creating user",
  //     //       error: error.message,
  //     //     });
  //     //   }
  

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

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRoles: ["admin", "artist", "client"],
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

  // async update(req: Request, res: Response): Promise<void | Response<any>> {
  //   try {
  //     const id = +req.params.id;
  //     const data = req.body;

  //     const userRepository = AppDataSource.getRepository(User);
  //     await userRepository.update({ id: id }, data);

  //     res.status(202).json({
  //       message: "User updated successfully",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error while updating user",
  //     });
  //   }
  // }

  // async getAllArtist(req: Request, res: Response): Promise<void | Response<any>> {
  //   try {
  //     const artistRepository = AppDataSource.getRepository(Artist);
  //     const allArtists = await artistRepository.find();
  //     res.status(200).json(allArtists);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error while getting users",
  //     });
  //   }
  // }

  // async getArtistUser(req: Request, res: Response): Promise<void | Response<any>> {
  //   try {

  //     const id = +req.params.id;

  //     const artistRepository = AppDataSource.getRepository(Artist);
      
  //     const artist = await artistRepository.findOneBy({
  //       id: id,

  //     });

  //     if (!artist) {
  //       return res.status(404).json({
  //         message: "User not found",
  //       });
  //     }

  //     const artistUser = Number(artist.user);
  //     const userRepository = AppDataSource.getRepository(User);
  //     const user = await userRepository.findOneBy({
  //       id: artistUser

  //     });
  //      // operador spread "..." desempaqueta las claves del objeto
  //     const response = {
  //       ...artist,
  //       ...user,
  //     }
  //     //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
  //     response.id = artist.id

  //     res.status(200).json(response);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error while getting user",
  //     });
  //   }
  // }

 

}