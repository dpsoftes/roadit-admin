import { LoginResponseDto, UserFullDto } from "shared";

export class GlobalStateData {
    user: LoginResponseDto = new LoginResponseDto();
    language: string = "es";
    userFull: UserFullDto = new UserFullDto();
    menuCollapsed: boolean = false;
}