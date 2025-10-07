/**
 * Extractor de componentes específicos de Figma
 */

export interface FigmaComponentData {
  name: string;
  type: string;
  html: string;
  css: string;
  properties: Record<string, any>;
}

export class FigmaComponentExtractor {
  private readonly accessToken = 'figd_U8Wbio8D3kiq_wN6sZGENPgkihC9Ur2ZYMIhLZ5N';
  private readonly baseUrl = 'https://api.figma.com/v1';

  /**
   * Busca un componente por nombre en un archivo de Figma
   */
  async findComponentByName(fileKey: string, componentName: string): Promise<FigmaComponentData | null> {
    try {
      console.log(`🔍 Buscando componente "${componentName}" en archivo ${fileKey}`);

      // Obtener datos del archivo
      const fileData = await this.getFileData(fileKey);

      // Buscar el componente
      const component = this.searchComponentInNode(fileData.document, componentName);

      if (!component) {
        console.log(`❌ Componente "${componentName}" no encontrado`);
        return null;
      }

      console.log(`✅ Componente encontrado: ${component.name}`);

      // Generar HTML y CSS
      const html = this.generateHTML(component);
      const css = this.generateCSS(component);

      return {
        name: component.name,
        type: component.type,
        html,
        css,
        properties: this.extractProperties(component)
      };

    } catch (error) {
      console.error('Error extrayendo componente:', error);
      return null;
    }
  }

  /**
   * Lista todos los componentes disponibles en un archivo
   */
  async listComponents(fileKey: string): Promise<string[]> {
    try {
      const fileData = await this.getFileData(fileKey);
      const components: string[] = [];

      this.collectComponentNames(fileData.document, components);

      return components;
    } catch (error) {
      console.error('Error listando componentes:', error);
      return [];
    }
  }

  private async getFileData(fileKey: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  }

  private searchComponentInNode(node: any, componentName: string): any {
    // Buscar por nombre exacto
    if (node.name && node.name.toLowerCase() === componentName.toLowerCase()) {
      return node;
    }

    // Buscar por nombre parcial
    if (node.name && node.name.toLowerCase().includes(componentName.toLowerCase())) {
      return node;
    }

    // Buscar en hijos
    if (node.children) {
      for (const child of node.children) {
        const found = this.searchComponentInNode(child, componentName);
        if (found) return found;
      }
    }

    return null;
  }

  private collectComponentNames(node: any, components: string[]): void {
    if (node.name) {
      components.push(node.name);
    }

    if (node.children) {
      node.children.forEach((child: any) => {
        this.collectComponentNames(child, components);
      });
    }
  }

  private generateHTML(component: any): string {
    const tagName = this.getHTMLTag(component.type);
    const attributes = this.getHTMLAttributes(component);
    const content = this.getHTMLContent(component);

    if (component.children && component.children.length > 0) {
      const childrenHTML = component.children
        .map((child: any) => this.generateHTML(child))
        .join('\n  ');

      return `<${tagName}${attributes}>\n  ${childrenHTML}\n</${tagName}>`;
    }

    return content ? `<${tagName}${attributes}>${content}</${tagName}>` : `<${tagName}${attributes} />`;
  }

  private generateCSS(component: any): string {
    const selector = this.getCSSSelector(component);
    const styles = this.getCSSStyles(component);

    let css = `${selector} {\n`;

    Object.entries(styles).forEach(([property, value]) => {
      css += `  ${property}: ${value};\n`;
    });

    css += `}\n`;

    // Generar CSS para hijos
    if (component.children) {
      component.children.forEach((child: any) => {
        css += '\n' + this.generateCSS(child);
      });
    }

    return css;
  }

  private getHTMLTag(type: string): string {
    const tagMap: Record<string, string> = {
      'TEXT': 'span',
      'RECTANGLE': 'div',
      'FRAME': 'div',
      'GROUP': 'div',
      'COMPONENT': 'div',
      'INSTANCE': 'div',
      'VECTOR': 'svg',
      'ELLIPSE': 'div',
      'LINE': 'hr',
    };

    return tagMap[type] || 'div';
  }

  private getHTMLAttributes(component: any): string {
    const attrs: string[] = [];

    // Clase CSS
    const className = this.generateClassName(component.name);
    attrs.push(`class="${className}"`);

    // Atributos específicos por tipo
    if (component.type === 'TEXT' && component.characters) {
      // El contenido de texto se manejará en getHTMLContent
    }

    return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  }

  private getHTMLContent(component: any): string {
    if (component.type === 'TEXT' && component.characters) {
      return component.characters;
    }
    return '';
  }

  private getCSSSelector(component: any): string {
    const className = this.generateClassName(component.name);
    return `.${className}`;
  }

  private getCSSStyles(component: any): Record<string, string> {
    const styles: Record<string, string> = {};

    // Dimensiones
    if (component.absoluteBoundingBox) {
      const { width, height } = component.absoluteBoundingBox;
      styles['width'] = `${width}px`;
      styles['height'] = `${height}px`;
    }

    // Colores de fondo
    if (component.fills && component.fills.length > 0) {
      const fill = component.fills[0];
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b, a } = fill.color;
        styles['background-color'] = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a || 1})`;
      }
    }

    // Bordes
    if (component.strokes && component.strokes.length > 0) {
      const stroke = component.strokes[0];
      if (stroke.type === 'SOLID' && stroke.color) {
        const { r, g, b, a } = stroke.color;
        const strokeWeight = component.strokeWeight || 1;
        styles['border'] = `${strokeWeight}px solid rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a || 1})`;
      }
    }

    // Border radius
    if (component.cornerRadius) {
      styles['border-radius'] = `${component.cornerRadius}px`;
    }

    // Tipografía
    if (component.type === 'TEXT' && component.style) {
      const style = component.style;
      if (style.fontFamily) styles['font-family'] = style.fontFamily;
      if (style.fontSize) styles['font-size'] = `${style.fontSize}px`;
      if (style.fontWeight) styles['font-weight'] = style.fontWeight.toString();
      if (style.letterSpacing) styles['letter-spacing'] = `${style.letterSpacing}px`;
      if (style.lineHeightPx) styles['line-height'] = `${style.lineHeightPx}px`;

      if (style.fills && style.fills[0] && style.fills[0].color) {
        const { r, g, b, a } = style.fills[0].color;
        styles['color'] = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a || 1})`;
      }
    }

    // Layout
    styles['position'] = 'relative';
    styles['display'] = 'block';

    return styles;
  }

  private generateClassName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private extractProperties(component: any): Record<string, any> {
    return {
      id: component.id,
      type: component.type,
      name: component.name,
      visible: component.visible,
      absoluteBoundingBox: component.absoluteBoundingBox,
      constraints: component.constraints,
      effects: component.effects,
      fills: component.fills,
      strokes: component.strokes,
      strokeWeight: component.strokeWeight,
      cornerRadius: component.cornerRadius,
    };
  }
}