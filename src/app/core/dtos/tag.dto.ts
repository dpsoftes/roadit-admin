import { TagType } from "@enums/common.enum";
import { BaseEntity } from "./base.dto";

export interface TagNameLanguage {
    [key: string]: string;
}

export class TagDto extends BaseEntity {
    name: TagNameLanguage;
    type: TagType; // Display value from get_type_display()

    constructor(data: any = {}) {
        super(data);
        this.name = data.name || '';
        this.type = data.type || '';
    }

    static fromJson(json: any): TagDto {
        return new TagDto(json);
    }

     override toJson(): any {
        return {
            ...super.toJson(),
            name: this.name,
            type: this.type
        };
    }

    copyWith(updates: Partial<TagDto>): TagDto {
        return new TagDto({
            ...this.toJson(),
            ...updates
        });
    }
}


