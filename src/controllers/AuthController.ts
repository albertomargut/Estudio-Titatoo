import { Request, Response } from "express";
import { CreateClientRequestBody, LoginUserRequestBody, TokenData } from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { Role } from "../models/Role";
import jwt from "jsonwebtoken";

// -----------------------------------------------------------------------------

export class AuthController {

    async registerClient(
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email } = req.body;


        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        let rolesData = await roleRepository.find();

        try {
           
            const newUser = userRepository.create({
                username,
                email,
                password_hash: bcrypt.hashSync(password, 10),
                roles: rolesData,
            });
            await userRepository.save(newUser);

            res.status(201).json(newUser);
          } catch (error: any) {
            console.error("Error while creating user:", error);
            res.status(500).json({
              message: "Error while creating user",
              error: error.message,
            });
          }

    }

    async registerArtist(
      req: Request<{}, {}, CreateClientRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email } = req.body;


      const userRepository = AppDataSource.getRepository(User);
      const roleRepository = AppDataSource.getRepository(Role);
      let rolesData = await roleRepository.find();

      try {
         
          const newUser = userRepository.create({
              username,
              email,
              password_hash: bcrypt.hashSync(password, 10),
              roles: rolesData,
          });
          await userRepository.save(newUser);

          res.status(201).json(newUser);
        } catch (error: any) {
          console.error("Error while creating user:", error);
          res.status(500).json({
            message: "Error while creating user",
            error: error.message,
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