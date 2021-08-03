import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { hash,compare } from 'bcrypt';

interface IRequest{
   name: string;
   email: string;
   passwordUser: string;
   admin?: boolean;
}

enum ErrorsRegister{
    registerAlreadyExist = "Este email já foi cadastrado!",
    emailInvalid = "Digite um email valido!",
    passwordInvalid = "Digite uma senha!"
}

class CreateUserService {
  private userPassword: string;
  private newUser;

  private criptoPassword = async (password: string)=>{
    let newPasswordCript =  await hash(password, 12).then((res)=>{
         this.userPassword = res; 
     });
     return newPasswordCript;
  }

  private descriptoPassword = async(password: string)=>{
      let descripto = await compare(password,this.userPassword)
      console.log(descripto);
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

    this.criptoPassword(passwordUser).finally(()=>{
        let password = this.userPassword;
        this.newUser = userRepositories.create({name,email,password,admin});
    });

    await userRepositories.save(this.newUser); 
    return this.newUser;    
   }
}
export { CreateUserService}