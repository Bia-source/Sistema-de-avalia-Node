import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../../repositories/UserRepositories';
import { hash } from 'bcrypt';
import * as nodemailer from "nodemailer";

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
     this.sendMail(email);
     return this.newUser;
  }

    private sendMail= async (email: string)=> {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "fernandesferreirinha9@gmail.com",
                pass: "bia12248665",
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        const mailSend = await transporter.sendMail({
            text: "Usuario criado com sucesso!🚀",
            subject: "Cadastro no NLW",
            from: 'Ferreirinha',
            to: ['bia_ferreirads@yahoo.com']
        });
        console.log(mailSend);
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