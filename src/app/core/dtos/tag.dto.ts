import { TagType } from "@enums/common.enum";
import { BaseEntity } from "./base.dto";

//INTERFACE PARA EL OBJETO DE NOMBRES TRADUCIDOS
export interface TagName {
  es: string;
  en: string;
}

export class TagDto extends BaseEntity {
  type: TagType; // CLIENT, DRIVER, TRANSPORT
  color: string; // CODIGO HEXADECIMAL SIN #
  name: TagName; // OBJETO CON TRADUCCIONES

  constructor(data: any = {}) {
    super(data);
    this.type = data.type || '';
    this.color = data.color || '';

    //MANEJAR name COMO STRING O COMO OBJETO
    if (typeof data.name === 'string') {
      //SI ES STRING, USARLO PARA AMBOS IDIOMAS
      this.name = { es: data.name, en: data.name };
    } else if (typeof data.name === 'object' && data.name !== null) {
      //SI ES OBJETO, USARLO DIRECTAMENTE
      this.name = {
        es: data.name.es || '',
        en: data.name.en || ''
      };
    } else {
      //VALOR POR DEFECTO
      this.name = { es: '', en: '' };
    }
  }

  static fromJson(json: any): TagDto {
    return new TagDto(json);
  }

  override toJson(): any {
    return {
      ...super.toJson(),
      type: this.type,
      color: this.color,
      name: this.name
    };
  }

  copyWith(updates: Partial<TagDto>): TagDto {
    return new TagDto({
      ...this.toJson(),
      ...updates
    });
  }

  //METODO HELPER PARA OBTENER EL NOMBRE EN EL IDIOMA ESPECIFICADO
  getName(language: 'es' | 'en' = 'es'): string {
    return this.name[language] || this.name.es || '';
  }

  //METODO HELPER PARA OBTENER EL COLOR CON #
  getColorWithHash(): string {
    return this.color.startsWith('#') ? this.color : `#${this.color}`;
  }
}
