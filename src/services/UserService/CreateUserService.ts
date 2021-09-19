import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../../repositories/UserRepositories';
import { hash } from 'bcrypt';
import * as nodemailer from "nodemailer";
import { CONFIG } from '../../configEmail/configEmail';
import { classToPlain } from 'class-transformer';

interface IRequest{
   name: string;
   email: string;
   passwordUser: string;
   admin?: boolean;
}

interface IRequestToken{
    email: string;
    password: string;
}

enum ErrorsRegister{
    registerAlreadyExist = "Este email já foi cadastrado!",
    emailInvalid = "Digite um email valido!",
    passwordInvalid = "Digite uma senha!",
    errorRegister = "Não foi possivel fazer o seu cadastro"
}

class CreateUserService {
  private userPassword: string;
  private newUser;

  private criptoPassword = async ({name, email, passwordUser, admin = false}: IRequest)=>{
     const userRepositories = getCustomRepository(UserRepositories);
     await hash(passwordUser, 12).then((res)=>{
         this.userPassword = res; 
     });
     this.newUser = await userRepositories.create({name,email,password:this.userPassword,admin});
     await userRepositories.save(this.newUser); 
     this.sendMail(email, name);
     return classToPlain(this.newUser);
  }

  private sendMail= async (email: string, username: string)=> {
     const transporter = nodemailer.createTransport({
        host: CONFIG.HOST,
        port: CONFIG.PORT,
        secure: false,
        auth: {
            user: CONFIG.USER_MAIL,
            pass: CONFIG.PASSWORD_MAIL,
        },
        tls: {
           rejectUnauthorized: false
        }
        });
        
     const send = await transporter.sendMail({
        text: `${username} bem vindo(a) a bordo, usuário criado com sucesso!🚀`,
        subject: "Cadastro no sistema de avaliação",
        from: `Administração SA <${CONFIG.USER_MAIL}>`,
        to: [`${email}`]
        });

      return send;
  } 
  

  async execute({name, email, passwordUser, admin}: IRequest){
    const userRepositories = getCustomRepository(UserRepositories);
    const userAlreadyExist = await userRepositories.findOne({
        email
    }); 
    
    if(!email){
        throw new Error(ErrorsRegister.emailInvalid);
    }

    if(!passwordUser){
        throw new Error(ErrorsRegister.passwordInvalid);
    }

    if(userAlreadyExist){
        throw new Error(ErrorsRegister.registerAlreadyExist);
    }

    return this.criptoPassword({name, email, passwordUser, admin});;
   }

}
export { CreateUserService }