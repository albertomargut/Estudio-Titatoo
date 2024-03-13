import { Request, Response } from "express";
import { CreateClientRequestBody, LoginUserRequestBody, TokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Client } from "../models/Client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export class AuthController {
    
    async register(
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
      console.log(req.body);
        const { username, password, email, first_name, last_name, phone_number } = req.body;
      


        const userRepository = AppDataSource.getRepository(User);
        const clientRepository = AppDataSource.getRepository(Client);


        try {
            const newUser = userRepository.create({
                username,
                email,
                first_name,
                last_name,
                phone_number,
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
          client: true,
          artist: true
        },
        select: {
          id:true,
          password_hash:true,
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
        user
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
        error,
      });
    }
  }


}