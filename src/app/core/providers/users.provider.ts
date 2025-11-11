import { UserFullDto } from "@dtos/user.dto";
import { BaseProvider } from "./base.provider";
import { EndPoints, HttpMethod} from '@services/EndPoints';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UsersProvider extends BaseProvider {
  
    async getProfile() {
        try{
            var user =  await  this.apiUrl.call<UserFullDto>(HttpMethod.GET, {
                url: EndPoints.getUser,
                queryParams: { userId: this.storeService.global.user().user.id }
            });
            console.log('Fetched user profile:', user);
        }catch(error){
            console.error('Error fetching user profile:', error);
            throw error;
        }
        
    }

}
