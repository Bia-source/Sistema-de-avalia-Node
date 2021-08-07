import { compare } from 'bcrypt';
import { CreateUserService } from '../services/CreateUserService';

interface IParamsUser{
    password?: string;
    paramPassword?: string;
}

class UserProvider{
    
    public descriptoPassword = async(password: string, paramsPassword:string)=>{
        let descripto = await compare(password,paramsPassword);
        return descripto;
    }

    public validationPassword =async({password, paramPassword}: IParamsUser)=>{
      const userService = new CreateUserService();
      let passwordIsValid = await this.descriptoPassword(password, paramPassword);
      return passwordIsValid;
    }
}

export { UserProvider }