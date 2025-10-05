import { LoginResponseDto, UserFullDto } from "shared";

export class GlobalStateData {
    user: LoginResponseDto = new LoginResponseDto();
    language: string = "es";
    userFull: UserFullDto = new UserFullDto();
    menuCollapsed: boolean = false;

    constructor(data?: Partial<GlobalStateData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    copyWith(updates: Partial<GlobalStateData>): GlobalStateData {
        return new GlobalStateData({
            user: updates.user ?? this.user,
            language: updates.language ?? this.language,
            userFull: updates.userFull ?? this.userFull,
            menuCollapsed: updates.menuCollapsed ?? this.menuCollapsed
        });
    }

    get isAuthenticated(): boolean {
        return !!this.user?.token;
    }
}