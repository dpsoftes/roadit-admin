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

  content = input<string>('');
  placeholder = input<string>('Escribe aquí...');
  disabled = input<boolean>(false);
  showMenu = input<boolean>(true);
  minHeight = input<string>('200px');
  maxHeight = input<string>('500px');

  contentChange = output<string>();
  focus = output<void>();
  blur = output<void>();

  private _editor = signal<Editor | null>(null);
  private _isInitialized = signal<boolean>(false);
  private _currentContent = signal<string>('');

  editor = computed(() => this._editor());
  isInitialized = computed(() => this._isInitialized());
  currentContent = computed(() => this._currentContent());

  private editorConfig = {
    history: true,
    keyboardShortcuts: true,
    inputRules: true,
    attributes: {
      class: 'ngx-editor-text-content'
    }
  };

  constructor() {
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


  insertCodeBlock(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.toggleCode().exec();
    }
  }







  focusEditor(): void {
    const editor = this._editor();
    if (editor && this._isInitialized()) {
      editor.commands.focus().exec();
    }
  }

  getHTML(): string {
    return this._currentContent();
  }

  setContent(content: string): void {
    this._currentContent.set(content);
  }

  onContentChange(content: string): void {
    this._currentContent.set(content);
    this.contentChange.emit(content);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.blur.emit();
  }

}
