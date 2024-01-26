import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload, decode } from "jsonwebtoken";


// -----------------------------------------------------------------------------

export const auth = (req: Request, res: Response, next: NextFunction) => {
   req.headers;

   const token = req.headers.authorization?.split(" ")[1];

   if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
         message: "Unauthorized",
      });
   }

   try {
      // Decodificar el token
      const decoded = jwt.verify(token, "123") as JwtPayload;

      console.log(decoded);


      next();
   } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
         message: "Unauthorized",
      });
   }
};