import { NextFunction, Request, Response } from "express";

export function ensureAdmin(request: Request, response: Response, next: NextFunction){
  const admin = false;
  if(admin){
      return next();
  }
  return response.status(401).json({message: "Usuario não tem autorização"});
}