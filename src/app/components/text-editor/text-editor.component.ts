import { Component, signal, computed, input, output, effect, OnDestroy, OnInit } from '@angular/core';
import { NgxEditorComponent, NgxEditorMenuComponent, Editor } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [NgxEditorComponent, NgxEditorMenuComponent, FormsModule, CommonModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent implements OnInit, OnDestroy {
  // Inputs usando signals
  content = input<string>('');
  placeholder = input<string>('Escribe aquí...');
  disabled = input<boolean>(false);
  showMenu = input<boolean>(true);
  minHeight = input<string>('200px');
  maxHeight = input<string>('500px');

  // Outputs
  contentChange = output<string>();
  focus = output<void>();
  blur = output<void>();

  // Signals internos
  private _editor = signal<Editor | null>(null);
  private _isInitialized = signal<boolean>(false);
  private _currentContent = signal<string>('');

  // Computed signals
  editor = computed(() => this._editor());
  isInitialized = computed(() => this._isInitialized());
  currentContent = computed(() => this._currentContent());

  // Configuración del editor
  private editorConfig = {
    history: true,
    keyboardShortcuts: true,
    inputRules: true,
    attributes: {
      class: 'ngx-editor-text-content'
    }
  };

  constructor() {
    // Effect para sincronizar el contenido
    effect(() => {
      const content = this.content();
      if (content !== this._currentContent() && this._isInitialized()) {
        this._currentContent.set(content);
      }
    });
  }

  ngOnInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  private initializeEditor(): void {
    try {
      const editor = new Editor(this.editorConfig);
      this._editor.set(editor);
      this._isInitialized.set(true);
      this._currentContent.set(this.content());
    } catch (error) {
      console.error('Error al inicializar el editor:', error);
    }
  }

  private destroyEditor(): void {
    const editor = this._editor();
    if (editor) {
      editor.destroy();
      this._editor.set(null);
      this._isInitialized.set(false);
    }
  }

  // Métodos públicos para control del editor
  insertText(text: string): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.insertText(text).exec();
    }
  }

  setBold(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleBold().exec();
    }
  }

  setItalic(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleItalics().exec();
    }
  }

  setUnderline(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleUnderline().exec();
    }
  }

  insertBulletList(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleBulletList().exec();
    }
  }

  insertOrderedList(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleOrderedList().exec();
    }
  }

  insertBlockquote(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de blockquote se maneja a través del menú
      console.log('Blockquote functionality available through menu');
    }
  }

  insertCodeBlock(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleCode().exec();
    }
  }

  insertHeading(level: 1 | 2 | 3 | 4 | 5 | 6): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de heading se maneja a través del menú
      console.log('Heading functionality available through menu');
    }
  }

  setTextColor(color: string): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de color se maneja a través del menú
      console.log('Text color functionality available through menu');
    }
  }

  setHighlight(color: string): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de highlight se maneja a través del menú
      console.log('Highlight functionality available through menu');
    }
  }

  undo(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de undo se maneja a través del menú
      console.log('Undo functionality available through menu');
    }
  }

  redo(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de redo se maneja a través del menú
      console.log('Redo functionality available through menu');
    }
  }

  clear(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      // Funcionalidad de clear se maneja a través del menú
      console.log('Clear functionality available through menu');
    }
  }

  focusEditor(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.focus().exec();
    }
  }

  // Método para obtener el contenido como HTML
  getHTML(): string {
    return this._currentContent();
  }

  // Método para establecer contenido
  setContent(content: string): void {
    this._currentContent.set(content);
    // El contenido se actualiza automáticamente a través de ngModel
  }

  // Método para manejar cambios de contenido
  onContentChange(content: string): void {
    this._currentContent.set(content);
    this.contentChange.emit(content);
  }

  // Método para manejar eventos de foco
  onFocus(): void {
    this.focus.emit();
  }

  // Método para manejar eventos de blur
  onBlur(): void {
    this.blur.emit();
  }

  // Método para manejar cambios en el selector de heading
  onHeadingChange(value: string): void {
    const level = parseInt(value, 10);
    if (level >= 1 && level <= 6) {
      this.insertHeading(level as 1 | 2 | 3 | 4 | 5 | 6);
    }
  }
}
