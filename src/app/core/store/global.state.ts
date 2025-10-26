import { LoginResponseDto, UserFullDto } from '@dtos';
import { Tag } from '@dtos/tags.dto';

export class GlobalStateData {
    user: LoginResponseDto = new LoginResponseDto();
    language: string = "es";
    userFull: UserFullDto = new UserFullDto();
    tags: Tag[] = [];
    menuCollapsed: boolean = false;
}