import { Request, Response } from 'express';
import { LoginUserService } from '../../services/UserService/LoginUserService';

class LoginUserController{
   async handle(request: Request, response: Response){
     const { email, password } = request.body;
     const loginUserService = new LoginUserService();
     const { token, user } = await loginUserService.execute({
         email,
         password
     });

     return response.json({token: token, user: user});
   }
}
export { LoginUserController }