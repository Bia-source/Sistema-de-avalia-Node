import express, { NextFunction, Response, Request } from "express";
import "express-async-errors"
import "reflect-metadata";
import "./database";
import { router } from './Routes/index';

const app = express();

app.use(express.json());
app.use(router);

// Depois das rotas tratamento de erros
app.use((err: Error, request:Request, response: Response, next: NextFunction)=>{
  if(err instanceof Error){
     return response.status(400).json({message: err.message});
  }
  return response.status(500).json({status: "error", message: "Internal Server Error"});
});

app.listen(3000, ()=>{
   console.log("server run 🚀");
});