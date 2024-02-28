import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Artist } from "../models/Artist";
import { Client } from "../models/Client";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";

// -----------------------------------------------------------------------------

export class UserController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
        const userRepository = AppDataSource.getRepository(User);
        const allUsers = await userRepository.find();
        res.status(200).json(allUsers);
      } catch (error) {
        res.status(500).json({
          message: "Error while getting users",
        });
      }
    }
    
   async getAllPerPage(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allUsers, count] = await userRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               username: true,
               email: true,
               id: true,
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allUsers,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting user",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const newUser = await userRepository.save(data);
         res.status(201).json(newUser);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating user", error
         });
      }
   }

   async createArtist (req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const userRepository = AppDataSource.getRepository(Artist);
         const newArtist = await userRepository.save(data);
         res.status(201).json(newArtist);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating artist", error
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         await userRepository.update({ id: id }, data);

         res.status(202).json({
            message: "User updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating user",
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         await userRepository.delete(id);

         res.status(200).json({
            message: "User deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting user",
         });
      }
   }

   async getAllArtist(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const artistRepository = AppDataSource.getRepository(Artist);
         const allArtists = await artistRepository.find({
          // where: {
          //   email: email,
          // },
          relations: {
            user: true,
            },
          },
        );
        console.log("julian", allArtists);
         res.status(200).json(allArtists);
      } catch (error) {
         res.status(500).json({
         message: "Error while getting artists",
      });
      }
   }

  //  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
  //   try {
  //     const userRepository = AppDataSource.getRepository(User);
  //     const allUsers = await userRepository.find();
  //     res.status(200).json(allUsers);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error while getting users",
  //     });
  //   }
  // }

   async getArtistUser(req: Request, res: Response): Promise<void | Response<any>> {
      try {
  
        const id = +req.params.id;
  
        const artistRepository = AppDataSource.getRepository(Artist);
        
        const artist = await artistRepository.findOneBy({
          id: id,
        });
  
        if (!artist) {
          return res.status(404).json({
            message: "User not found",
          });
        }
  
        const artistUser = Number(artist.user_id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
          id: artistUser
  
        });
         // operador spread "..." desempaqueta las claves del objeto
        const response = {
          ...artist,
          ...user,
        }
        //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
        response.id = artist.id
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: "Error while getting user",
        });
      }
    }

   async getClientUser(req: Request, res: Response): Promise<void | Response<any>> {
      try {
  
        const id = +req.params.id;
  
        const clientRepository = AppDataSource.getRepository(Client);
        
        const client = await clientRepository.findOneBy({
          id: id,
        });
  
        if (!client) {
          return res.status(404).json({
            message: "User not found",
          });
        }
  
        const clientUser = Number(client.user_id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({
          id: clientUser
  
        });
         // operador spread "..." desempaqueta las claves del objeto
        const response = {
          ...client,
          ...user,
        }
        //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
        response.id = client.id
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: "Error while getting user",
        });
      }
    }
  
    async getClientByUser(req: Request, res: Response): Promise<void | Response<any>> {
      try {
  
        const id = +req.params.id;
  
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({
          id: id,
        });
  
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
  
        const userClient = Number(user.id);
        const clientRepository = AppDataSource.getRepository(Client);
        const client = await clientRepository.findOneBy({
          user_id: userClient
  
        });
  
        const clientId = Number(client?.id)
        
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.find({
          where: {client_id: clientId},
          relations: {
            artist:true
          },
          select: {
            id:true,
            // date:true,
            // shift:true,
            artist: {
            //   first_name:true,
              tattoo_style:true,
            //   phone_number:true,
            }
          }
  
        })
  
         // operador spread "..." desempaqueta las claves del objeto
        const response = {
          ...client,
          ...user,
          appointment
        }
        //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
        response.id = client!.id
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: "Error while getting user",
        });
      }
    }
  
    async getArtistByUser(req: Request, res: Response): Promise<void | Response<any>> {
      try {
  
        const id = +req.params.id;
  
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOneBy({
          id: id,
        });
  
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
  
        const userArtist = Number(user.id);
        const artistRepository = AppDataSource.getRepository(Artist);
        const artist = await artistRepository.findOneBy({
          user_id: userArtist
  
        });
  
        const artistId = Number(artist?.id)
        
        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointment = await appointmentRepository.find({
          where: {artist_id: artistId},
          relations: {
            client:true
          },
          select: {
            id:true,
            // date:true,
            // shift:true,
            // client: {
            // //   first_name:true,
            //   phone_number:true,
            // }
          }
  
        })
  
         // operador spread "..." desempaqueta las claves del objeto
        const response = {
          ...artist,
         //  ...design,
          ...user,
          appointment
        }
        //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
        response.id = artist!.id
  
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: "Error while getting user",
        });
      }
    }
  
   
  
  }

