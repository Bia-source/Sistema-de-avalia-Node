import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"
import { UserProvider } from '../../Provider/UserProvider';
import { sign } from 'jsonwebtoken';
import { classToPlain } from "class-transformer";

interface ILoginRequestUser{
    email: string;
    password: string;
}

enum MessageError{
    EMAIL_INVALID = "Email/Password invalido"
}

class LoginUserService{
   async execute({email, password}: ILoginRequestUser){
    const userRepositories = getCustomRepository(UserRepositories);
    const userProvider = new UserProvider(); 
    const user = await userRepositories.findOne({
        where: {
            email,
        }
    });

    if(!user){
           throw new Error (MessageError.EMAIL_INVALID);
       }

    let passwordIsCorrect = await userProvider.validationPassword({password, paramPassword: user.password});
    
    if(!passwordIsCorrect){
        throw new Error (MessageError.EMAIL_INVALID);
    }

    const token = sign({
        email: user.email
    },"89489fdfb30ed98117df52bb589a46ad",{
    subject: user.id,
    expiresIn: "1d"
    });
    userProvider.setState(user, token);
    return {token: token, user: classToPlain(user)};
   }
}

export { LoginUserService }