import { User } from "../../entities/User";

 export async function MapResponseUser(user:User, admin:boolean){
   if(admin === true){
      return user;
   }
   const userMap = await {
        id: user.id,
        name: user.name,
        email: user.email
    }
    return userMap;
 }