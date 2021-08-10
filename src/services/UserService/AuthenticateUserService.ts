import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { UserProvider } from '../../Provider/UserProvider';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequestUser{
    email: string;
    password: string;
}

enum MessageError{
    EMAIL_INVALID = "Email/Password invalido"
}

class AuthenticateUserService{
   async execute({email, password}: IAuthenticateRequestUser){
    const userRepositories = getCustomRepository(UserRepositories);
    const userAlreadyExist = await userRepositories.findOne({email});
    const userProvider = new UserProvider(); 
    if(!userAlreadyExist){
           throw new Error (MessageError.EMAIL_INVALID);
       }

    let passwordIsCorrect = await userProvider.validationPassword({password, paramPassword: userAlreadyExist.password});
    
    if(!passwordIsCorrect){
        throw new Error (MessageError.EMAIL_INVALID);
    }

    const token = sign({
        email: userAlreadyExist.email
    },"89489fdfb30ed98117df52bb589a46ad",{
    subject: userAlreadyExist.id,
    expiresIn: "1d"
    });

    return token;
   }
}

export { AuthenticateUserService }