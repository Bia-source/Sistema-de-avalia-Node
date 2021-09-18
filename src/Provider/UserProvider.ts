import { compare } from 'bcrypt';
import { JwtPayload, verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { verifyToken } from '../configJWT/jwt';
import { User } from '../entities/User';
import { UserRepositories } from '../repositories/UserRepositories';

interface IParamsUser{
    password?: string;
    paramPassword?: string;
}

interface UserProviderState{
    token?: string;
    user?: User;
}
class UserProvider {
    private state: UserProviderState;

    constructor() {
        this.state = {
            token: null,
            user: null
        }
    }

    public descriptoPassword = async(password: string, paramsPassword:string)=>{
        let descripto = await compare(password,paramsPassword);
        return descripto;
    }

    public validationPassword = async({password, paramPassword}: IParamsUser)=>{
      this.loginCleanState();  
      let passwordIsValid = await this.descriptoPassword(password, paramPassword);
      return passwordIsValid;
    }

    public getUserAuthenticateToken = async (authToken:string) => {
        const [,token] = authToken.split(" ");
        try {                             
            const { sub } = verify(token, "89489fdfb30ed98117df52bb589a46ad") as JwtPayload;
            const userRepository = getCustomRepository(UserRepositories);
            const user = await userRepository.findOne({ where: { id: sub } });
            return (user)? true : false;
        } catch (error) {
           throw new Error("Erro na Autenticação do token"); 
        }
    }

    public testGetUserAuth = async () => {
        const res = await verifyToken(this.state.token);
        //const userRepository = getCustomRepository(UserRepositories);
        console.log(res);
        return res ? true : false;
    }

    public setState(user: User, token: string) {
        this.state = {
            user: user,
            token: token
        }
    }

    private loginCleanState() {
        this.state = {
            user: null,
            token: null
        };
    }

}

export { UserProvider }