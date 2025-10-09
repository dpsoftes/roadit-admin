import { Injectable } from "@angular/core";
import { UserFullDto } from "@dtos/user.dto";
import { signalStore, withState } from "@ngrx/signals";


export class UsersStateData {
    users: UserFullDto[] = [];
}

@Injectable()
export class UsersState  extends signalStore({
    protectedState: true,
}, withState(new UsersStateData())) {

}