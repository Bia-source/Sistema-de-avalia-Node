import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";

interface IPayload{
   sub: string;
}


export function ensureAuthenticate(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;
    const [,token] = authToken.split(" ");
    if(!authToken){
        return response.status(401).end();
    }
    try {
        const { sub } = verify(token,"89489fdfb30ed98117df52bb589a46ad")as IPayload;
        request.user_id = sub;
        return next();
    } catch (error) {
        return response.status(401).end();
    }

}