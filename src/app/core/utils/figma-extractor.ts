/**
 * Utilidad para extraer tokens de diseño desde Figma API
 */

export interface FigmaToken {
  name: string;
  value: string;
  type: 'color' | 'spacing' | 'typography' | 'shadow' | 'border';
}

export interface FigmaExtractorConfig {
  fileKey: string;
  accessToken: string;
  nodeId?: string;
}

export class FigmaExtractor {
  private baseUrl = 'https://api.figma.com/v1';
  
  constructor(private config: FigmaExtractorConfig) {}

  /**
   * Extrae colores del archivo de Figma
   */
  async extractColors(): Promise<FigmaToken[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/files/${this.config.fileKey}`,
        {
          headers: {
            'X-Figma-Token': this.config.accessToken,
          },
        }
      );

      const data = await response.json();
      return this.parseColors(data);
    } catch (error) {
      console.error('Error extrayendo colores de Figma:', error);
      return [];
    }
  }

  /**
   * Extrae espaciados y dimensiones
   */
  async extractSpacing(): Promise<FigmaToken[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/files/${this.config.fileKey}`,
        {
          headers: {
            'X-Figma-Token': this.config.accessToken,
          },
        }
      );

      const data = await response.json();
      return this.parseSpacing(data);
    } catch (error) {
      console.error('Error extrayendo espaciados de Figma:', error);
      return [];
    }
  }

  /**
   * Extrae tipografías
   */
  async extractTypography(): Promise<FigmaToken[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/files/${this.config.fileKey}`,
        {
          headers: {
            'X-Figma-Token': this.config.accessToken,
          },
        }
      );

      const data = await response.json();
      return this.parseTypography(data);
    } catch (error) {
      console.error('Error extrayendo tipografías de Figma:', error);
      return [];
    }
  }

  /**
   * Genera archivo de tokens CSS
   */
  generateCSSTokens(tokens: FigmaToken[]): string {
    const cssVariables = tokens.map(token => {
      const varName = `--${token.name.toLowerCase().replace(/\s+/g, '-')}`;
      return `  ${varName}: ${token.value};`;
    }).join('\n');

    return `:root {\n${cssVariables}\n}`;
  }

  /**
   * Genera archivo de tokens SCSS
   */
  generateSCSSTokens(tokens: FigmaToken[]): string {
    return tokens.map(token => {
      const varName = `$${token.name.toLowerCase().replace(/\s+/g, '-')}`;
      return `${varName}: ${token.value};`;
    }).join('\n');
  }

  /**
   * Genera archivo de tokens para Angular (TypeScript)
   */
  generateAngularTokens(tokens: FigmaToken[]): string {
    const tokensByType = tokens.reduce((acc, token) => {
      if (!acc[token.type]) acc[token.type] = [];
      acc[token.type].push(token);
      return acc;
    }, {} as Record<string, FigmaToken[]>);

    let content = `export const DesignTokens = {\n`;
    
    Object.entries(tokensByType).forEach(([type, typeTokens]) => {
      content += `  ${type}: {\n`;
      typeTokens.forEach(token => {
        const propName = token.name.toLowerCase().replace(/\s+/g, '');
        content += `    ${propName}: '${token.value}',\n`;
      });
      content += `  },\n`;
    });
    
    content += `};\n`;
    
    return content;
  }

  private parseColors(data: any): FigmaToken[] {
    const colors: FigmaToken[] = [];
    
    const traverse = (node: any) => {
      if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach((fill: any) => {
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b, a } = fill.color;
            const hex = this.rgbaToHex(r, g, b, a);
            colors.push({
              name: node.name || 'Unnamed Color',
              value: hex,
              type: 'color'
            });
          }
        });
      }
      
      if (node.children) {
        node.children.forEach((child: any) => traverse(child));
      }
    };

    if (data.document) {
      traverse(data.document);
    }

    return colors;
  }

  private parseSpacing(data: any): FigmaToken[] {
    const spacing: FigmaToken[] = [];
    
    const traverse = (node: any) => {
      if (node.constraints && node.absoluteBoundingBox) {
        const { width, height } = node.absoluteBoundingBox;
        
        if (node.name && node.name.toLowerCase().includes('spacing')) {
          spacing.push({
            name: `${node.name} Width`,
            value: `${width}px`,
            type: 'spacing'
          });
        }
      }
      
      if (node.children) {
        node.children.forEach((child: any) => traverse(child));
      }
    };

    if (data.document) {
      traverse(data.document);
    }

    return spacing;
  }

  private parseTypography(data: any): FigmaToken[] {
    const typography: FigmaToken[] = [];
    
    const traverse = (node: any) => {
      if (node.type === 'TEXT' && node.style) {
        const style = node.style;
        
        typography.push({
          name: `${node.name} Font Size`,
          value: `${style.fontSize}px`,
          type: 'typography'
        });
        
        if (style.fontFamily) {
          typography.push({
            name: `${node.name} Font Family`,
            value: style.fontFamily,
            type: 'typography'
          });
        }
        
        if (style.fontWeight) {
          typography.push({
            name: `${node.name} Font Weight`,
            value: style.fontWeight.toString(),
            type: 'typography'
          });
        }
      }
      
      if (node.children) {
        node.children.forEach((child: any) => traverse(child));
      }
    };

    if (data.document) {
      traverse(data.document);
    }

    return typography;
  }

  private rgbaToHex(r: number, g: number, b: number, a: number = 1): string {
    const toHex = (value: number) => {
      const hex = Math.round(value * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    
    if (a < 1) {
      return `${hex}${toHex(a)}`;
    }
    
    return hex;
  }
}